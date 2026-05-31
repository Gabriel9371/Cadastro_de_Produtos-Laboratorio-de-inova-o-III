import { useEffect, useState } from "react";
import { api } from "./api";
import { limparAuth } from "./auth";
import "./styles/Home.css";

const ROLE_CONFIG = {
  ADMIN:    { text: "admin",    color: "#c8b4fa" },
  VENDEDOR: { text: "vendedor", color: "#5cffa8" },
  CLIENTE:  { text: "cliente",  color: "#4a4f63" },
};

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

  const roleLabel = ROLE_CONFIG[usuario?.role]
    ?? { text: usuario?.role?.toLowerCase() ?? "—", color: "#4a4f63" };

  return (
    <div className="home-page">
      <div className="home-centro">
        <div className="home-logo">SL</div>
        <h1 className="home-titulo">DGabriel :(</h1>
        <p className="home-desc">
          Sistema de gerenciamento de produtos desenvolvido como projeto
          de laboratório de inovação.
        </p>

        <div className="home-user-card">
          <div className="home-user-avatar">
            {(usuario?.username?.[0] ?? "?").toUpperCase()}
          </div>
          <div>
            <p className="home-user-name">{usuario?.username ?? "—"}</p>
            <p className="home-user-role" style={{ color: roleLabel.color }}>
              {roleLabel.text}
            </p>
          </div>
        </div>

        <div className="home-stats-row">
          <div className="home-stat">
            <p className="home-stat-val">
              {erro ? "—" : total === null ? "..." : total}
            </p>
            <p className="home-stat-label">produtos cadastrados</p>
          </div>
          <div className="home-stat-divider" />
          <div className="home-stat">
            <p className={`home-stat-val ${erro ? "offline" : "online"}`}>
              {erro ? "offline" : "online"}
            </p>
            <p className="home-stat-label">status do servidor</p>
          </div>
        </div>

        <button onClick={onIrParaProdutos} className="home-btn-primary">
          ir para produtos →
        </button>

        <button onClick={handleLogout} className="home-btn-logout">
          sair
        </button>
      </div>
    </div>
  );
}