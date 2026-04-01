from flask import Flask, jsonify
from flask_cors import CORS
import os
import psycopg2

database_url = os.getenv("DATABASE_URL")

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Flask + Docker + GHCR + Terraform + Render"

@app.route("/health")
def health():
    return {"status": "Tout est ok ou pas"}

@app.route("/info")
#EXERCICE1
def info():
    return {
        "app": "Flask Render",
        "student": "DELANOY",
        "version": "v1"
    }

#EXERCICE2
@app.route("/env")
def env():
    return {"env": os.getenv("ENV")}

#EXERCICE3
@app.route("/utilisateurs")
def get_utilisateurs():
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        cur.execute("SELECT id, nom, email FROM utilisateurs")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify([
            {"id": row[0], "nom": row[1], "email": row[2]}
            for row in rows
        ])
    except Exception as e:
        return jsonify({"erreur": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
