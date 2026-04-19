import re, math, tldextract
from urllib.parse import urlparse
from collections import Counter

def shannon_entropy(s):
    if not s: return 0
    counts = Counter(s)
    total = len(s)
    return -sum((c/total)*math.log2(c/total) for c in counts.values())

def extract_features(url):
    url = str(url).strip()
    try:
        parsed = urlparse(url if url.startswith('http') else 'http://' + url)
        ext    = tldextract.extract(url)
        domain = ext.domain
        tld    = ext.suffix
        full   = parsed.netloc
        path   = parsed.path
    except:
        return None

    suspicious_tlds = {'tk','ml','ga','cf','gq','xyz','top','club','work','click','loan','online'}

    return {
        'url_length':         len(url),
        'dot_count':          url.count('.'),
        'hyphen_count':       url.count('-'),
        'underscore_count':   url.count('_'),
        'at_symbol':          int('@' in url),
        'double_slash':       int('//' in url[7:]),
        'is_ip':              int(bool(re.match(r'\d+\.\d+\.\d+\.\d+', full))),
        'subdomain_count':    len(ext.subdomain.split('.')) if ext.subdomain else 0,
        'digit_ratio':        sum(c.isdigit() for c in domain) / max(len(domain),1),
        'special_char_count': len(re.findall(r'[^a-zA-Z0-9\-\.]', full)),
        'path_length':        len(path),
        'query_length':       len(parsed.query),
        'entropy_domain':     shannon_entropy(domain),
        'entropy_full':       shannon_entropy(full),
        'tld_suspicious':     int(tld in suspicious_tlds),
        'domain_length':      len(domain),
        'https':              int(parsed.scheme == 'https'),
        'num_subdomains':     full.count('.'),
    }