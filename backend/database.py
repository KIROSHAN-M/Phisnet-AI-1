import sqlite3, os

DB_PATH = os.path.join(os.path.dirname(__file__), 'scans.db')

def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute('''
        CREATE TABLE IF NOT EXISTS scans (
            id        INTEGER PRIMARY KEY AUTOINCREMENT,
            url       TEXT,
            label     TEXT,
            score     REAL,
            brand     TEXT,
            scanned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def save_scan(url, label, score, brand):
    conn = sqlite3.connect(DB_PATH)
    # Remove any existing history entry for the precise URL to save space
    conn.execute('DELETE FROM scans WHERE url = ?', (url,))
    # Re-insert it as a fresh log entry pointing to the latest timestamp
    conn.execute(
        'INSERT INTO scans (url, label, score, brand) VALUES (?,?,?,?)',
        (url, label, score, brand)
    )
    conn.commit()
    conn.close()

def get_history(limit=20):
    conn = sqlite3.connect(DB_PATH)
    rows = conn.execute(
        'SELECT url, label, score, brand, scanned_at FROM scans ORDER BY scanned_at DESC LIMIT ?',
        (limit,)
    ).fetchall()
    conn.close()
    return [{"url":r[0],"label":r[1],"score":r[2],"brand":r[3],"scanned_at":r[4]} for r in rows]