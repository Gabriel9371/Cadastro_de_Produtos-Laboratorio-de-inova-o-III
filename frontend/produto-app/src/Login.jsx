import { useState } from "react";
import { gerarBasicAuth, salvarAuth } from "./auth";
import "./styles/Login.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro]         = useState("");
  const [loading, setLoading]   = useState(false);

  async function entrar() {
    if (!username || !password) { setErro("Preencha usuário e senha."); return; }
    setErro("");
    setLoading(true);
    const auth = gerarBasicAuth(username, password);
    try {
      const res = await fetch("http://localhost:8080/auth/me", {
        headers: { Authorization: auth }
      });
      if (!res.ok) throw new Error();
      const user = await res.json();
      salvarAuth(auth);
      onLogin(user);
    } catch {
      setErro("Usuário ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

  const handleKey = (e) => { if (e.key === "Enter") entrar(); };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">SL</div>
        <h1 className="login-titulo">DGabriel :(</h1>
        <p className="login-sub">acesso ao sistema</p>

        <div className="login-fields">
          <div className="login-field">
            <label className="login-label">Usuário</label>
            <input
              className="login-input"
              placeholder="seu usuário"
              value={username}
              autoComplete="username"
              onChange={e => setUsername(e.target.value)}
              onKeyDown={handleKey}
            />
          </div>
          <div className="login-field">
            <label className="login-label">Senha</label>
            <input
              className="login-input"
              type="password"
              placeholder="sua senha"
              value={password}
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKey}
            />
          </div>
        </div>

        {erro && (
          <div className="login-erro">
            <span className="login-erro-icon">✕</span> {erro}
          </div>
        )}

        <button
          onClick={entrar}
          disabled={loading}
          className="login-btn"
        >
          {loading ? "verificando..." : "entrar →"}
        </button>

        <p className="login-hint">sistema interno · acesso restrito</p>
      </div>
    </div>
  );
}