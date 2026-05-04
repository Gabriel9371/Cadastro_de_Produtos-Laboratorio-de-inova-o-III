import { useEffect, useState } from "react";
import { api } from "./api";
import { limparAuth } from "./auth";

export default function Home({ onIrParaProdutos, usuario, onLogout }) {
  const [total, setTotal] = useState(null);
  const [erro, setErro]   = useState(false);

  useEffect(() => {
    api.listarTodos()
      .then(data => setTotal(data.length))
      .catch(() => setErro(true));
  }, []);

  function handleLogout() {
    limparAuth();
    onLogout();
  }

  const roleLabel = {
    ADMIN:    { text: "admin",    color: c.accent },
    VENDEDOR: { text: "vendedor", color: c.success },
    CLIENTE:  { text: "cliente",  color: c.muted },
  }[usuario?.role] ?? { text: usuario?.role?.toLowerCase() ?? "—", color: c.muted };

  return (
    <div style={s.page}>
      <div style={s.centro}>
        <div style={s.logoMark}>SL</div>
        <h1 style={s.titulo}>DGabriel :(</h1>
        <p style={s.desc}>
          Sistema de gerenciamento de produtos desenvolvido como projeto
          de laboratório de inovação.
        </p>

        <div style={s.userCard}>
          <div style={s.userAvatar}>
            {(usuario?.username?.[0] ?? "?").toUpperCase()}
          </div>
          <div>
            <p style={s.userName}>{usuario?.username ?? "—"}</p>
            <p style={{ ...s.userRole, color: roleLabel.color }}>{roleLabel.text}</p>
          </div>
        </div>

        <div style={s.statsRow}>
          <div style={s.stat}>
            <p style={s.statVal}>
              {erro ? "—" : total === null ? "..." : total}
            </p>
            <p style={s.statLabel}>produtos cadastrados</p>
          </div>
          <div style={s.statDivider} />
          <div style={s.stat}>
            <p style={{ ...s.statVal, color: erro ? c.danger : c.success }}>
              {erro ? "offline" : "online"}
            </p>
            <p style={s.statLabel}>status do servidor</p>
          </div>
        </div>

        <button onClick={onIrParaProdutos} style={s.btnPrimary}>
          ir para produtos →
        </button>

        <button onClick={handleLogout} style={s.btnLogout}>
          sair
        </button>
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
  success: "#5cffa8",
  danger:  "#ff6b6b",
};

const s = {
  page: {
    minHeight: "100vh",
    display: "flex", alignItems: "center", justifyContent: "center",
    background: c.bg, padding: "2rem",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  centro: {
    display: "flex", flexDirection: "column", alignItems: "center",
    textAlign: "center", maxWidth: "400px", width: "100%",
  },
  logoMark: {
    width: "48px", height: "48px", borderRadius: "12px",
    background: c.accent, color: c.bg,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "14px", fontWeight: 500, letterSpacing: "0.05em",
    fontFamily: "'DM Mono', monospace", marginBottom: "1.25rem",
  },
  titulo: {
    margin: "0 0 0.6rem", fontSize: "2rem", fontWeight: 500,
    color: c.fg, letterSpacing: "-0.03em",
  },
  desc: {
    margin: "0 0 2rem", fontSize: "13px", color: c.muted,
    lineHeight: 1.7, maxWidth: "320px",
  },
  userCard: {
    display: "flex", alignItems: "center", gap: "12px",
    background: c.surface, border: `0.5px solid ${c.border}`,
    borderRadius: "10px", padding: "12px 16px",
    marginBottom: "1.5rem", width: "100%", boxSizing: "border-box",
    textAlign: "left",
  },
  userAvatar: {
    width: "36px", height: "36px", borderRadius: "50%",
    background: "#1e2028", display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: "14px", fontWeight: 500,
    color: c.accent, fontFamily: "'DM Mono', monospace", flexShrink: 0,
  },
  userName: {
    margin: 0, fontSize: "13px", fontWeight: 500, color: c.fg,
    fontFamily: "'DM Mono', monospace",
  },
  userRole: {
    margin: "2px 0 0", fontSize: "10px",
    fontFamily: "'DM Mono', monospace", textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  statsRow: {
    display: "flex", alignItems: "center", gap: "0",
    background: c.surface, border: `0.5px solid ${c.border}`,
    borderRadius: "10px", marginBottom: "1.75rem",
    width: "100%", boxSizing: "border-box", overflow: "hidden",
  },
  stat: {
    flex: 1, padding: "1.25rem 1rem", textAlign: "center",
  },
  statDivider: {
    width: "0.5px", height: "40px", background: c.border,
  },
  statVal: {
    margin: "0 0 4px", fontSize: "1.8rem", fontWeight: 500,
    color: c.fg, fontFamily: "'DM Mono', monospace",
    letterSpacing: "-0.02em",
  },
  statLabel: {
    margin: 0, fontSize: "10px", color: c.muted,
    textTransform: "uppercase", letterSpacing: "0.07em",
    fontFamily: "'DM Mono', monospace",
  },
  btnPrimary: {
    width: "100%", padding: "11px",
    background: c.accent, border: "none",
    borderRadius: "8px", cursor: "pointer",
    fontSize: "13px", fontWeight: 500, color: c.bg,
    fontFamily: "'DM Mono', monospace", letterSpacing: "0.02em",
    marginBottom: "10px",
  },
  btnLogout: {
    width: "100%", padding: "10px",
    background: "transparent", border: `0.5px solid ${c.border}`,
    borderRadius: "8px", cursor: "pointer",
    fontSize: "13px", color: c.muted,
    fontFamily: "'DM Mono', monospace",
  },
};