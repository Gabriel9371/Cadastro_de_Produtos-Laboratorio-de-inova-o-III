import { useState, useEffect, useCallback } from "react";
import { api } from "./api";
import { limparAuth } from "./auth";
import ProdutoForm from "./ProdutoForm";
import Home from "./Home";
import Login from "./Login";
import "./styles/App.css";

const ROLE_CONFIG = {
  ADMIN:    { text: "admin",    color: "#c8b4fa" },
  VENDEDOR: { text: "vendedor", color: "#5cffa8" },
  CLIENTE:  { text: "cliente",  color: "#4a4f63" },
};

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
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [usuario, setUsuario]         = useState(null);

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

  // ─── Delete com confirmação ─────────────────────────────────────────────────
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

  const roleInfo = ROLE_CONFIG[usuario?.role]
    ?? { text: usuario?.role?.toLowerCase() ?? "—", color: "#4a4f63" };

  // ─── Tela produtos ─────────────────────────────────────────────────────────
  return (
    <div className="app-layout">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-logo">SL</div>
          <nav className="sidebar-nav">
            <button
              onClick={() => setTela("home")}
              className="nav-btn"
              title="Home"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 6.5L8 2l6 4.5V14a.5.5 0 01-.5.5h-3.75v-4h-3.5v4H2.5A.5.5 0 012 14V6.5z"
                  stroke="var(--muted)" strokeWidth="1.2" fill="none"/>
              </svg>
            </button>
            <button className="nav-btn active" title="Produtos">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.2" stroke="var(--accent)" strokeWidth="1.2"/>
                <rect x="9" y="1.5" width="5.5" height="5.5" rx="1.2" stroke="var(--accent)" strokeWidth="1.2"/>
                <rect x="1.5" y="9" width="5.5" height="5.5" rx="1.2" stroke="var(--accent)" strokeWidth="1.2"/>
                <rect x="9" y="9" width="5.5" height="5.5" rx="1.2" stroke="var(--accent)" strokeWidth="1.2"/>
              </svg>
            </button>
          </nav>
        </div>
        <div className="sidebar-bottom">
          <div className="sidebar-user" title={`${usuario?.username} · ${roleInfo.text}`}>
            <div className="sidebar-avatar">
              {(usuario?.username?.[0] ?? "?").toUpperCase()}
            </div>
            <div className="sidebar-role-dot" style={{ background: roleInfo.color }} />
          </div>
          <button onClick={handleLogout} className="sidebar-logout" title="Sair">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M6 2H2.5A.5.5 0 002 2.5v11a.5.5 0 00.5.5H6" stroke="var(--muted)" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M10.5 11L14 8l-3.5-3M14 8H6" stroke="var(--muted)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="main-content">

        {/* Header */}
        <div className="main-header">
          <div>
            <h1 className="main-titulo">produtos</h1>
            <p className="main-subtitulo">
              {carregando
                ? "carregando..."
                : `${produtos.length} cadastrado${produtos.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <div className="header-right">
            <div className="search-wrap">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{flexShrink:0}}>
                <circle cx="6.5" cy="6.5" r="4.5" stroke="var(--muted)" strokeWidth="1.3"/>
                <path d="M10 10l3.5 3.5" stroke="var(--muted)" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="buscar por nome, categoria, cód. barras..."
                value={busca}
                onChange={e => setBusca(e.target.value)}
                className="search-input"
              />
            </div>
            <button onClick={carregar} className="btn-refresh" title="Recarregar">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 8A5.5 5.5 0 112.5 5" stroke="var(--muted)" strokeWidth="1.3" strokeLinecap="round"/>
                <path d="M2.5 2v3h3" stroke="var(--muted)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {podeGerenciar && (
              <button onClick={abrirNovo} className="btn-novo">
                + novo produto
              </button>
            )}
          </div>
        </div>

        {/* Alertas */}
        {erro && (
          <div className="alerta-erro">
            <span>{erro}</span>
            <button onClick={() => setErro(null)} className="btn-dismiss">✕</button>
          </div>
        )}
        {sucesso && <div className="alerta-sucesso">{sucesso}</div>}

        {/* Tabela */}
        {carregando ? (
          <div className="centro-vazio">carregando...</div>
        ) : produtosFiltrados.length === 0 ? (
          <div className="centro-vazio">
            {busca
              ? "nenhum produto encontrado para essa busca."
              : "nenhum produto cadastrado ainda."}
          </div>
        ) : (
          <div className="table-wrap">
            <table className="table-produtos">
              <thead>
                <tr>
                  {["#", "produto", "categoria", "preço", "estoque", "un.", "status",
                    ...(podeGerenciar ? ["ações"] : [])
                  ].map(col => (
                    <th key={col}>{col}</th>
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
                    <tr key={p.id}>
                      <td><span className="cell-id">#{p.id}</span></td>
                      <td>
                        <div className="produto-cell">
                          {p.url_img && (
                            <img src={p.url_img} alt={p.nome} className="produto-thumb" />
                          )}
                          <div>
                            <div className="produto-nome">{p.nome}</div>
                            {p.marca && <div className="produto-marca">{p.marca}</div>}
                          </div>
                        </div>
                      </td>
                      <td><span className="cell-mono">{p.categoria ?? "—"}</span></td>
                      <td>
                        <span className="cell-preco">
                          {p.preco != null
                            ? p.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                            : "—"}
                        </span>
                      </td>
                      <td>
                        <span className={`cell-mono${estoqueAlerta ? " cell-estoque-alerta" : ""}`}>
                          {p.estoque_inicial ?? "—"}
                        </span>
                      </td>
                      <td><span className="cell-mono">{p.Un ?? "—"}</span></td>
                      <td>
                        <div className="badges">
                          <span className={`badge ${p.ativo ? "badge-ativo" : "badge-inativo"}`}>
                            {p.ativo ? "ativo" : "inativo"}
                          </span>
                          {p.servico && <span className="badge badge-servico">serviço</span>}
                        </div>
                      </td>

                      {podeGerenciar && (
                        <td>
                          <div className="acoes">
                            <button onClick={() => abrirEditar(p)} className="btn-editar">
                              editar
                            </button>
                            <button
                              onClick={() => pedirConfirmDelete(p)}
                              disabled={deletandoId === p.id}
                              className="btn-deletar"
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
        <div className="overlay">
          <div className="confirm-modal">
            <p className="confirm-titulo">deletar produto</p>
            <p className="confirm-msg">
              Tem certeza que deseja deletar{" "}
              <span className="confirm-nome">{confirmDelete.nome}</span>
              ? Esta ação não pode ser desfeita.
            </p>
            <div className="confirm-acoes">
              <button onClick={cancelarDelete} className="confirm-btn-cancelar">
                cancelar
              </button>
              <button onClick={confirmarDelete} className="confirm-btn-deletar">
                sim, deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}