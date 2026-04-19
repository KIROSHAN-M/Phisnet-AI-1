import pickle, os
import numpy as np
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tldextract

from features     import extract_features
from brand_matcher import brand_match
from database     import init_db, save_scan, get_history

# ── Load model ──
BASE_DIR   = os.path.dirname(__file__)
model_path = os.path.join(BASE_DIR, 'xgboost_model.pkl')
with open(model_path, 'rb') as f:
    MODEL = pickle.load(f)

FEATURE_COLS = [
    'url_length','dot_count','hyphen_count','underscore_count',
    'at_symbol','double_slash','is_ip','subdomain_count',
    'digit_ratio','special_char_count','path_length','query_length',
    'entropy_domain','entropy_full','tld_suspicious','domain_length',
    'https','num_subdomains'
]

app = FastAPI(title="PhishNet AI")
app.add_middleware(CORSMiddleware, allow_origins=["*"],
                   allow_methods=["*"], allow_headers=["*"])
init_db()

class URLRequest(BaseModel):
    url: str

@app.post("/analyze")
def analyze(req: URLRequest):
    url = req.url.strip()

    # 1 — Feature extraction
    feats = extract_features(url)
    if feats is None:
        return {"error": "Could not parse URL"}

    df    = pd.DataFrame([feats])[FEATURE_COLS]
    # Class 0 usually means PHISHING, Class 1 means legitimate in many standard datasets
    # We will use class 0 probability for the "phishing/malicious" score
    score = float(MODEL.predict_proba(df)[0][0])

    # 2 — Brand matching
    ext   = tldextract.extract(url)
    full_domain_to_check = f"{ext.subdomain}.{ext.domain}" if ext.subdomain else ext.domain
    bm    = brand_match(full_domain_to_check)

    # 3 — Combined verdict
    if score >= 0.7 or bm["flagged"]:
        label = "PHISHING"
    # A legitimate brand will have distance == 0 and flagged == False
    elif score >= 0.4 or (0 < bm["distance"] <= 3):
        label = "SUSPICIOUS"
    else:
        label = "SAFE"

    # 4 — Explanation
    reasons = []
    if score >= 0.7:
        reasons.append(f"ML model confidence {score*100:.1f}%")
    if bm["flagged"]:
        reasons.append(f"Domain spoofs '{bm['matched_brand']}' (distance {bm['distance']})")
    if feats['tld_suspicious']:
        reasons.append("Suspicious TLD")
    if feats['entropy_domain'] > 3.5:
        reasons.append("High domain entropy (random-looking)")
    if feats['is_ip']:
        reasons.append("IP address used instead of domain")
    if not reasons:
        reasons.append("No strong phishing signals detected")

    result = {
        "url":           url,
        "label":         label,
        "score":         round(score, 4),
        "brand_spoofed": bm["matched_brand"],
        "brand_distance":bm["distance"],
        "explanation":   reasons
    }

    save_scan(url, label, score, bm["matched_brand"])
    return result

@app.get("/history")
def history():
    return get_history()

@app.get("/")
def root():
    return {"status": "PhishNet AI is running"}