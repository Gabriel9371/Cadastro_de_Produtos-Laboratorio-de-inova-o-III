import { useState, useEffect, useCallback } from "react";
import { api } from "./api";
import { limparAuth } from "./auth";
import ProdutoForm from "./ProdutoForm";
import Home from "./Home";
import Login from "./Login";

export default function App() {
  const [tela, setTela]               = useState("home");
  const [produtos, setProdutos]       = useState([]);
  const [busca, setBusca]             = useState("");
  const [carregando, setCarregando]   = useState(false);
  const [salvando, setSalvando]       = useState(false);
  const [erro, setErro]               = useState(null);
  const [sucesso, setSucesso]         = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoEditar, setProdutoEditar] = useState(null);
  const [deletandoId, setDeletandoId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null); // produto a confirmar deleção
  const [usuario, setUsuario]         = useState(null);

  // ─── Permissões (lógica intacta) ───────────────────────────────────────────
  const podeGerenciar =
    usuario?.role === "ADMIN" || usuario?.role === "VENDEDOR";

  // ─── Helpers ───────────────────────────────────────────────────────────────
  const mostrarSucesso = (msg) => {
    setSucesso(msg);
    setTimeout(() => setSucesso(null), 3000);
  };

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const data = await api.listarTodos();
      setProdutos(data);
    } catch {
      setErro("Não foi possível conectar com o servidor. Verifique se o backend está rodando na porta 8080.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    if (tela === "produtos") carregar();
  }, [tela, carregar]);

  // ─── Modal produto ──────────────────────────────────────────────────────────
  const abrirNovo   = () => { setProdutoEditar(null); setModalAberto(true); };
  const abrirEditar = (p) => { setProdutoEditar(p);   setModalAberto(true); };
  const fecharModal = () => { setModalAberto(false);  setProdutoEditar(null); };

  const salvar = async (dto) => {
    setSalvando(true);
    try {
      if (produtoEditar) {
        await api.atualizar(produtoEditar.id, dto);
        mostrarSucesso("Produto atualizado com sucesso!");
      } else {
        await api.criar(dto);
        mostrarSucesso("Produto cadastrado com sucesso!");
      }
      fecharModal();
      carregar();
    } catch (e) {
      setErro(e.message);
    } finally {
      setSalvando(false);
    }
  };

  // ─── Delete com modal de confirmação ───────────────────────────────────────
  const pedirConfirmDelete = (p) => setConfirmDelete(p);
  const cancelarDelete     = () => setConfirmDelete(null);

  const confirmarDelete = async () => {
    const id = confirmDelete.id;
    setConfirmDelete(null);
    setDeletandoId(id);
    try {
      await api.deletar(id);
      mostrarSucesso("Produto deletado.");
      carregar();
    } catch (e) {
      setErro(e.message);
    } finally {
      setDeletandoId(null);
    }
  };

  // ─── Logout ────────────────────────────────────────────────────────────────
  const handleLogout = () => {
    limparAuth();
    setUsuario(null);
    setProdutos([]);
    setTela("home");
  };

  // ─── Filtro ────────────────────────────────────────────────────────────────
  const produtosFiltrados = produtos.filter(p =>
    p.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    p.categoria?.toLowerCase().includes(busca.toLowerCase()) ||
    p.cod_barras?.toLowerCase().includes(busca.toLowerCase())
  );

  // ─── Roteamento ────────────────────────────────────────────────────────────
  if (!usuario) return <Login onLogin={setUsuario} />;

  if (tela === "home") {
    return (
      <Home
        usuario={usuario}
        onIrParaProdutos={() => setTela("produtos")}
        onLogout={handleLogout}
      />
    );
  }

  // ─── Role badge ────────────────────────────────────────────────────────────
  const roleInfo = {
    ADMIN:    { text: "admin",    color: c.accent  },
    VENDEDOR: { text: "vendedor", color: c.success },
    CLIENTE:  { text: "cliente",  color: c.muted   },
  }[usuario?.role] ?? { text: usuario?.role?.toLowerCase() ?? "—", color: c.muted };

  // ─── Tela produtos ─────────────────────────────────────────────────────────
  return (
    <div style={s.layout}>

      {/* Sidebar */}
      <aside style={s.sidebar}>
        <div style={s.sideTop}>
          <div style={s.logoMark}>SL</div>
          <nav style={s.nav}>
            <button
              onClick={() => setTela("home")}
              style={s.navBtn}
              title="Home"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 6.5L8 2l6 4.5V14a.5.5 0 01-.5.5h-3.75v-4h-3.5v4H2.5A.5.5 0 012 14V6.5z"
                  stroke={c.muted} strokeWidth="1.2" fill="none"/>
              </svg>
            </button>
            <button
              style={{ ...s.navBtn, ...s.navBtnActive }}
              title="Produtos"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.2" stroke={c.accent} strokeWidth="1.2"/>
                <rect x="9" y="1.5" width="5.5" height="5.5" rx="1.2" stroke={c.accent} strokeWidth="1.2"/>
                <rect x="1.5" y="9" width="5.5" height="5.5" rx="1.2" stroke={c.accent} strokeWidth="1.2"/>
                <rect x="9" y="9" width="5.5" height="5.5" rx="1.2" stroke={c.accent} strokeWidth="1.2"/>
              </svg>
            </button>
          </nav>
        </div>
        <div style={s.sideBottom}>
          <div style={s.sideUser} title={`${usuario?.username} · ${roleInfo.text}`}>
            <div style={s.sideAvatar}>
              {(usuario?.username?.[0] ?? "?").toUpperCase()}
            </div>
            <div style={{ ...s.sideRoleDot, background: roleInfo.color }} />
          </div>
          <button onClick={handleLogout} style={s.sideLogout} title="Sair">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M6 2H2.5A.5.5 0 002 2.5v11a.5.5 0 00.5.5H6" stroke={c.muted} strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M10.5 11L14 8l-3.5-3M14 8H6" stroke={c.muted} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={s.main}>

        {/* Header */}
        <div style={s.header}>
          <div>
            <h1 style={s.titulo}>produtos</h1>
            <p style={s.subtitulo}>
              {carregando
                ? "carregando..."
                : `${produtos.length} cadastrado${produtos.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <div style={s.headerRight}>
            <div style={s.searchWrap}>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{flexShrink:0}}>
                <circle cx="6.5" cy="6.5" r="4.5" stroke={c.muted} strokeWidth="1.3"/>
                <path d="M10 10l3.5 3.5" stroke={c.muted} strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="buscar por nome, categoria, cód. barras..."
                value={busca}
                onChange={e => setBusca(e.target.value)}
                style={s.searchInput}
              />
            </div>
            <button onClick={carregar} style={s.btnRefresh} title="Recarregar">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 8A5.5 5.5 0 112.5 5" stroke={c.muted} strokeWidth="1.3" strokeLinecap="round"/>
                <path d="M2.5 2v3h3" stroke={c.muted} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {podeGerenciar && (
              <button onClick={abrirNovo} style={s.btnNovo}>
                + novo produto
              </button>
            )}
          </div>
        </div>

        {/* Alertas */}
        {erro && (
          <div style={s.alertaErro}>
            <span>{erro}</span>
            <button onClick={() => setErro(null)} style={s.btnDismiss}>✕</button>
          </div>
        )}
        {sucesso && <div style={s.alertaSucesso}>{sucesso}</div>}

        {/* Tabela */}
        {carregando ? (
          <div style={s.centro}>carregando...</div>
        ) : produtosFiltrados.length === 0 ? (
          <div style={s.centro}>
            {busca
              ? "nenhum produto encontrado para essa busca."
              : "nenhum produto cadastrado ainda."}
          </div>
        ) : (
          <div style={s.tableWrap}>
            <table style={s.table}>
              <thead>
                <tr>
                  {["#", "produto", "categoria", "preço", "estoque", "un.", "status",
                    ...(podeGerenciar ? ["ações"] : [])
                  ].map(col => (
                    <th key={col} style={s.th}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {produtosFiltrados.map(p => {
                  const estoqueAlerta =
                    p.estoque_inicial != null &&
                    p.estoque_minimo  != null &&
                    p.estoque_inicial <= p.estoque_minimo;

                  return (
                    <tr key={p.id} style={s.tr}>
                      <td style={s.td}>
                        <span style={s.idCell}>#{p.id}</span>
                      </td>
                      <td style={s.td}>
                        <div style={s.produtoCell}>
                          {p.url_img && (
                            <img src={p.url_img} alt={p.nome} style={s.thumb} />
                          )}
                          <div>
                            <div style={s.produtoNome}>{p.nome}</div>
                            {p.marca && <div style={s.produtoMarca}>{p.marca}</div>}
                          </div>
                        </div>
                      </td>
                      <td style={s.td}>
                        <span style={s.monoCell}>{p.categoria ?? "—"}</span>
                      </td>
                      <td style={s.td}>
                        <span style={s.precoCell}>
                          {p.preco != null
                            ? p.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                            : "—"}
                        </span>
                      </td>
                      <td style={s.td}>
                        <span style={{
                          ...s.monoCell,
                          ...(estoqueAlerta ? s.estoqueAlerta : {}),
                        }}>
                          {p.estoque_inicial ?? "—"}
                        </span>
                      </td>
                      <td style={s.td}>
                        <span style={s.monoCell}>{p.Un ?? "—"}</span>
                      </td>
                      <td style={s.td}>
                        <div style={s.badges}>
                          <span style={p.ativo ? s.badgeAtivo : s.badgeInativo}>
                            {p.ativo ? "ativo" : "inativo"}
                          </span>
                          {p.servico && <span style={s.badgeServico}>serviço</span>}
                        </div>
                      </td>

                      {/* Coluna ações: só aparece se podeGerenciar */}
                      {podeGerenciar && (
                        <td style={s.td}>
                          <div style={s.acoes}>
                            <button
                              onClick={() => abrirEditar(p)}
                              style={s.btnEditar}
                            >
                              editar
                            </button>
                            <button
                              onClick={() => pedirConfirmDelete(p)}
                              disabled={deletandoId === p.id}
                              style={s.btnDeletar}
                            >
                              {deletandoId === p.id ? "..." : "deletar"}
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modal produto */}
      {modalAberto && (
        <ProdutoForm
          produtoEditar={produtoEditar}
          onSalvar={salvar}
          onCancelar={fecharModal}
          carregando={salvando}
        />
      )}

      {/* Modal confirmação de delete */}
      {confirmDelete && (
        <div style={s.overlay}>
          <div style={s.confirmModal}>
            <p style={s.confirmTitulo}>deletar produto</p>
            <p style={s.confirmMsg}>
              Tem certeza que deseja deletar{" "}
              <span style={{ color: c.fg, fontFamily: "'DM Mono', monospace" }}>
                {confirmDelete.nome}
              </span>
              ? Esta ação não pode ser desfeita.
            </p>
            <div style={s.confirmAcoes}>
              <button onClick={cancelarDelete} style={s.confirmBtnCancelar}>
                cancelar
              </button>
              <button onClick={confirmarDelete} style={s.confirmBtnDeletar}>
                sim, deletar
              </button>
            </div>
          </div>
        </div>
      )}
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
  layout: {
    display: "flex", minHeight: "100vh",
    background: c.bg,
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    color: c.fg,
  },

  // Sidebar
  sidebar: {
    width: "56px", background: c.surface,
    borderRight: `0.5px solid ${c.border}`,
    display: "flex", flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center", padding: "16px 0",
    position: "sticky", top: 0, height: "100vh",
    flexShrink: 0,
  },
  sideTop: { display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" },
  logoMark: {
    width: "32px", height: "32px", borderRadius: "8px",
    background: c.accent, color: c.bg,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "11px", fontWeight: 500, letterSpacing: "0.05em",
    fontFamily: "'DM Mono', monospace",
  },
  nav: { display: "flex", flexDirection: "column", gap: "4px" },
  navBtn: {
    width: "36px", height: "36px", borderRadius: "8px",
    background: "transparent", border: "none",
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
  },
  navBtnActive: { background: "#1a1d26" },
  sideBottom: { display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" },
  sideUser: { position: "relative", cursor: "default" },
  sideAvatar: {
    width: "32px", height: "32px", borderRadius: "50%",
    background: "#1a1d26",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "12px", fontWeight: 500, color: c.accent,
    fontFamily: "'DM Mono', monospace",
  },
  sideRoleDot: {
    width: "7px", height: "7px", borderRadius: "50%",
    position: "absolute", bottom: 0, right: 0,
    border: `1.5px solid ${c.surface}`,
  },
  sideLogout: {
    width: "36px", height: "36px", borderRadius: "8px",
    background: "transparent", border: "none",
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
  },

  // Main
  main: {
    flex: 1, padding: "2rem 2rem 2rem 1.75rem",
    display: "flex", flexDirection: "column", gap: "1rem",
    minWidth: 0,
  },
  header: {
    display: "flex", justifyContent: "space-between",
    alignItems: "flex-start", flexWrap: "wrap", gap: "1rem",
  },
  titulo: {
    margin: 0, fontSize: "1.5rem", fontWeight: 500,
    color: c.fg, letterSpacing: "-0.03em",
    fontFamily: "'DM Mono', monospace",
  },
  subtitulo: { margin: "3px 0 0", fontSize: "11px", color: c.muted, fontFamily: "'DM Mono', monospace" },
  headerRight: { display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" },
  searchWrap: {
    display: "flex", alignItems: "center", gap: "8px",
    background: c.surface, border: `0.5px solid ${c.border}`,
    borderRadius: "8px", padding: "7px 12px",
  },
  searchInput: {
    background: "transparent", border: "none", outline: "none",
    fontSize: "12px", color: c.dim, fontFamily: "'DM Mono', monospace",
    width: "220px",
  },
  btnRefresh: {
    width: "34px", height: "34px", borderRadius: "8px",
    background: c.surface, border: `0.5px solid ${c.border}`,
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
  },
  btnNovo: {
    padding: "8px 14px", borderRadius: "8px",
    background: c.accent, border: "none",
    color: c.bg, cursor: "pointer",
    fontSize: "12px", fontWeight: 500,
    fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap",
  },

  // Alertas
  alertaErro: {
    background: "#1f0a0a", color: c.danger,
    border: `0.5px solid ${c.danger}`,
    borderRadius: "8px", padding: "10px 14px",
    display: "flex", justifyContent: "space-between", alignItems: "center",
    fontSize: "12px", fontFamily: "'DM Mono', monospace",
  },
  alertaSucesso: {
    background: "#0a1f14", color: c.success,
    border: `0.5px solid ${c.success}`,
    borderRadius: "8px", padding: "10px 14px",
    fontSize: "12px", fontFamily: "'DM Mono', monospace",
  },
  btnDismiss: {
    background: "none", border: "none", cursor: "pointer",
    color: c.danger, fontWeight: 700, fontSize: "12px",
  },
  centro: {
    textAlign: "center", padding: "4rem", color: c.muted,
    fontSize: "12px", fontFamily: "'DM Mono', monospace",
  },

  // Tabela
  tableWrap: {
    overflowX: "auto", borderRadius: "10px",
    border: `0.5px solid ${c.border}`,
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "12px" },
  th: {
    padding: "10px 14px", textAlign: "left",
    background: c.surface,
    fontFamily: "'DM Mono', monospace",
    fontSize: "10px", color: c.muted,
    textTransform: "uppercase", letterSpacing: "0.08em",
    fontWeight: 400,
    borderBottom: `0.5px solid ${c.border}`,
    whiteSpace: "nowrap",
  },
  tr: {
    borderBottom: `0.5px solid ${c.border}`,
    background: c.bg,
  },
  td: { padding: "11px 14px", verticalAlign: "middle" },
  idCell: { fontFamily: "'DM Mono', monospace", fontSize: "11px", color: c.muted },
  monoCell: { fontFamily: "'DM Mono', monospace", fontSize: "12px", color: c.dim },
  precoCell: { fontFamily: "'DM Mono', monospace", fontSize: "12px", color: c.accent },
  estoqueAlerta: { color: c.danger, fontWeight: 500 },
  produtoCell: { display: "flex", alignItems: "center", gap: "10px" },
  thumb: { width: "36px", height: "36px", objectFit: "cover", borderRadius: "6px", flexShrink: 0 },
  produtoNome: { fontSize: "13px", fontWeight: 400, color: c.fg },
  produtoMarca: { fontSize: "11px", color: c.muted, fontFamily: "'DM Mono', monospace", marginTop: "1px" },
  badges: { display: "flex", gap: "5px", flexWrap: "wrap" },
  badgeAtivo: {
    display: "inline-block", padding: "2px 8px", borderRadius: "4px",
    background: "#0a1f14", color: c.success,
    fontSize: "10px", fontFamily: "'DM Mono', monospace",
  },
  badgeInativo: {
    display: "inline-block", padding: "2px 8px", borderRadius: "4px",
    background: "#1a1d26", color: c.muted,
    fontSize: "10px", fontFamily: "'DM Mono', monospace",
  },
  badgeServico: {
    display: "inline-block", padding: "2px 8px", borderRadius: "4px",
    background: "#1a1030", color: c.accent,
    fontSize: "10px", fontFamily: "'DM Mono', monospace",
  },
  acoes: { display: "flex", gap: "6px" },
  btnEditar: {
    padding: "5px 10px", borderRadius: "6px",
    background: "transparent", border: `0.5px solid ${c.border}`,
    color: c.dim, cursor: "pointer",
    fontSize: "11px", fontFamily: "'DM Mono', monospace",
  },
  btnDeletar: {
    padding: "5px 10px", borderRadius: "6px",
    background: "transparent", border: `0.5px solid #3d1414`,
    color: c.danger, cursor: "pointer",
    fontSize: "11px", fontFamily: "'DM Mono', monospace",
  },

  // Modal delete
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000, padding: "1rem",
  },
  confirmModal: {
    background: c.surface, border: `0.5px solid ${c.border}`,
    borderRadius: "12px", padding: "1.75rem",
    maxWidth: "380px", width: "100%",
  },
  confirmTitulo: {
    margin: "0 0 0.75rem", fontSize: "14px", fontWeight: 500,
    color: c.danger, fontFamily: "'DM Mono', monospace",
    textTransform: "uppercase", letterSpacing: "0.06em",
  },
  confirmMsg: {
    margin: "0 0 1.5rem", fontSize: "13px", color: c.dim,
    lineHeight: 1.6,
  },
  confirmAcoes: { display: "flex", gap: "8px", justifyContent: "flex-end" },
  confirmBtnCancelar: {
    padding: "8px 16px", borderRadius: "7px",
    background: "transparent", border: `0.5px solid ${c.border}`,
    color: c.muted, cursor: "pointer",
    fontSize: "12px", fontFamily: "'DM Mono', monospace",
  },
  confirmBtnDeletar: {
    padding: "8px 16px", borderRadius: "7px",
    background: c.danger, border: "none",
    color: "#0d0f14", cursor: "pointer",
    fontSize: "12px", fontWeight: 500,
    fontFamily: "'DM Mono', monospace",
  },
};