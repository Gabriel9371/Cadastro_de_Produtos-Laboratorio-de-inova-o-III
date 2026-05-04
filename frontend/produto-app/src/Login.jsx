import { useState } from "react";
import { gerarBasicAuth, salvarAuth } from "./auth";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro]         = useState("");
  const [loading, setLoading]   = useState(false);
  const [focusUser, setFocusUser] = useState(false);
  const [focusPass, setFocusPass] = useState(false);

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
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.logoMark}>SL</div>
        <h1 style={s.titulo}>DGabriel :(</h1>
        <p style={s.sub}>acesso ao sistema</p>

        <div style={s.fields}>
          <div style={s.field}>
            <label style={s.label}>Usuário</label>
            <input
              style={{ ...s.input, ...(focusUser ? s.inputActive : {}) }}
              placeholder="seu usuário"
              value={username}
              autoComplete="username"
              onChange={e => setUsername(e.target.value)}
              onKeyDown={handleKey}
              onFocus={() => setFocusUser(true)}
              onBlur={() => setFocusUser(false)}
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>Senha</label>
            <input
              style={{ ...s.input, ...(focusPass ? s.inputActive : {}) }}
              type="password"
              placeholder="sua senha"
              value={password}
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKey}
              onFocus={() => setFocusPass(true)}
              onBlur={() => setFocusPass(false)}
            />
          </div>
        </div>

        {erro && (
          <div style={s.erro}>
            <span style={s.erroIcon}>✕</span> {erro}
          </div>
        )}

        <button
          onClick={entrar}
          disabled={loading}
          style={{ ...s.btn, ...(loading ? s.btnDisabled : {}) }}
        >
          {loading ? "verificando..." : "entrar →"}
        </button>

        <p style={s.hint}>sistema interno · acesso restrito</p>
      </div>
    </div>
  );
}

const c = {
  bg:      "#0d0f14",
  surface: "#111318",
  border:  "#1e2028",
  muted:   "#4a4f63",
  dim:     "#9ca3b0",
  fg:      "#f0f0f0",
  accent:  "#c8b4fa",
  danger:  "#ff6b6b",
};

const s = {
  page: {
    minHeight: "100vh",
    display: "flex", alignItems: "center", justifyContent: "center",
    background: c.bg, padding: "2rem",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  card: {
    background: c.surface,
    border: `0.5px solid ${c.border}`,
    borderRadius: "14px",
    padding: "2.5rem 2rem",
    width: "100%", maxWidth: "340px",
    display: "flex", flexDirection: "column", alignItems: "center",
  },
  logoMark: {
    width: "44px", height: "44px", borderRadius: "11px",
    background: c.accent, color: c.bg,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "14px", fontWeight: 500, letterSpacing: "0.05em",
    fontFamily: "'DM Mono', 'Fira Code', monospace",
    marginBottom: "1.1rem",
  },
  titulo: {
    margin: "0 0 4px", fontSize: "1.5rem", fontWeight: 500,
    color: c.fg, letterSpacing: "-0.02em",
  },
  sub: {
    margin: "0 0 1.75rem", fontSize: "11px", color: c.muted,
    fontFamily: "'DM Mono', monospace", letterSpacing: "0.04em",
  },
  fields: {
    width: "100%", display: "flex", flexDirection: "column", gap: "12px",
    marginBottom: "14px",
  },
  field: { display: "flex", flexDirection: "column", gap: "5px", width: "100%" },
  label: {
    fontSize: "10px", color: c.muted, textTransform: "uppercase",
    letterSpacing: "0.08em", fontFamily: "'DM Mono', monospace",
  },
  input: {
    background: c.bg, border: `0.5px solid ${c.border}`,
    borderRadius: "7px", padding: "9px 12px",
    fontSize: "13px", color: c.dim,
    fontFamily: "'DM Mono', monospace",
    outline: "none", width: "100%", boxSizing: "border-box",
    transition: "border-color 0.15s, color 0.15s",
  },
  inputActive: { borderColor: c.accent, color: c.fg },
  erro: {
    width: "100%", background: "#1f0a0a",
    border: `0.5px solid ${c.danger}`,
    borderRadius: "7px", padding: "9px 12px",
    fontSize: "12px", color: c.danger,
    fontFamily: "'DM Mono', monospace",
    marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px",
  },
  erroIcon: { fontWeight: 700, fontSize: "11px" },
  btn: {
    width: "100%", padding: "10px",
    background: c.accent, border: "none",
    borderRadius: "7px", cursor: "pointer",
    fontSize: "13px", fontWeight: 500,
    color: c.bg, fontFamily: "'DM Mono', monospace",
    letterSpacing: "0.02em", marginTop: "2px",
    transition: "opacity 0.15s",
  },
  btnDisabled: { opacity: 0.5, cursor: "not-allowed" },
  hint: {
    margin: "1.5rem 0 0", fontSize: "10px", color: "#2e3244",
    fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em",
  },
};