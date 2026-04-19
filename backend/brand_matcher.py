import json, re, os
import Levenshtein

BASE_DIR = os.path.dirname(__file__)
with open(os.path.join(BASE_DIR, 'brands.json')) as f:
    BRANDS = json.load(f)

def brand_match(domain, threshold=3):
    domain = domain.lower().strip()
    if domain.startswith('www.'):
        domain = domain[4:]
    
    parts   = re.split(r'[-.]', domain)

    homoglyphs = {'0':'o','1':'l','3':'e','4':'a','5':'s','@':'a','rn':'m','vv':'w'}
    def normalize(s):
        for fake, real in homoglyphs.items():
            s = s.replace(fake, real)
        return s

    best_match, best_dist = None, 999

    for part in parts:
        part_norm = normalize(part)
        for brand in BRANDS:
            raw_dist  = Levenshtein.distance(part, brand)
            norm_dist = Levenshtein.distance(part_norm, brand)
            d = min(raw_dist, norm_dist)
            
            if d < best_dist:
                best_dist  = d
                best_match = brand

    # If the ENTIRE extracted domain string is exactly the brand, it's the legitimate brand!
    if best_match and domain == best_match:
        return {"matched_brand": best_match, "distance": 0, "flagged": False}

    if best_dist <= threshold:
        return {
            "matched_brand": best_match,
            "distance":      best_dist,
            # If distance is <= 2 (or even 0 but domain != brand), it's a spoof
            "flagged":       best_dist <= 2
        }
    return {"matched_brand": None, "distance": best_dist, "flagged": False}