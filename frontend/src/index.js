import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

const FLASK_URL = "https://flask-render-iac-cloo0.onrender.com";

function App() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    fetch(`${FLASK_URL}/utilisateurs`)
      .then(res => res.json())
      .then(data => setUtilisateurs(data))
      .catch(() => setErreur("Impossible de contacter le serveur"));
  }, []);

  return (
    <div style={{ fontFamily: "Arial", padding: "40px", textAlign: "center" }}>
      <h1>👥 Liste des utilisateurs</h1>
      {erreur ? (
        <p style={{ color: "red" }}>{erreur}</p>
      ) : (
        <table style={{ margin: "auto", borderCollapse: "collapse", width: "500px" }}>
          <thead>
            <tr style={{ backgroundColor: "#4A90D9", color: "white" }}>
              <th style={{ padding: "12px" }}>ID</th>
              <th style={{ padding: "12px" }}>Nom</th>
              <th style={{ padding: "12px" }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {utilisateurs.map(u => (
              <tr key={u.id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "12px" }}>{u.id}</td>
                <td style={{ padding: "12px" }}>{u.nom}</td>
                <td style={{ padding: "12px" }}>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
