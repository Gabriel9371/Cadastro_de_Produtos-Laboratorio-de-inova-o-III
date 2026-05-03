import { useState, useEffect, useCallback } from 'react';
import { api } from './api';
import ProdutoForm from './ProdutoForm';
import Home from './Home';
import Login from './Login';





export default function App() {
  const [tela, setTela]                   = useState('home');
  const [produtos, setProdutos]           = useState([]);
  const [busca, setBusca]                 = useState('');
  const [carregando, setCarregando]       = useState(false);
  const [salvando, setSalvando]           = useState(false);
  const [erro, setErro]                   = useState(null);
  const [sucesso, setSucesso]             = useState(null);
  const [modalAberto, setModalAberto]     = useState(false);
  const [produtoEditar, setProdutoEditar] = useState(null);
  const [deletandoId, setDeletandoId]     = useState(null);
  const [usuario, setUsuario] = useState(null);

  const podeGerenciar =
  usuario?.role === "ADMIN" ||
  usuario?.role === "VENDEDOR";


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
    } catch (e) {
      setErro('Não foi possível conectar com o servidor. Verifique se o backend está rodando na porta 8080.');
    } finally {
      setCarregando(false);
    }
  }, []);


  

  useEffect(() => {
    if (tela === 'produtos') carregar();
  }, [tela, carregar]);

  const abrirNovo   = () => { setProdutoEditar(null); setModalAberto(true); };
  const abrirEditar = (p) => { setProdutoEditar(p);  setModalAberto(true); };
  const fecharModal = () => { setModalAberto(false); setProdutoEditar(null); };

  const salvar = async (dto) => {
    setSalvando(true);
    try {
      if (produtoEditar) {
        await api.atualizar(produtoEditar.id, dto);
        mostrarSucesso('Produto atualizado com sucesso!');
      } else {
        await api.criar(dto);
        mostrarSucesso('Produto cadastrado com sucesso!');
      }
      fecharModal();
      carregar();
    } catch (e) {
      setErro(e.message);
    } finally {
      setSalvando(false);
    }
  };

  const deletar = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este produto?')) return;
    setDeletandoId(id);
    try {
      await api.deletar(id);
      mostrarSucesso('Produto deletado.');
      carregar();
    } catch (e) {
      setErro(e.message);
    } finally {
      setDeletandoId(null);
    }
  };

  const produtosFiltrados = produtos.filter(p =>
    p.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    p.categoria?.toLowerCase().includes(busca.toLowerCase()) ||
    p.cod_barras?.toLowerCase().includes(busca.toLowerCase())
  );

if(!usuario){
  return <Login onLogin={setUsuario}/>
}

  if (tela === 'home') {
    return <Home onIrParaProdutos={() => setTela('produtos')} />;
  }

  return (
    <div style={s.container}>
      <header style={s.header}>
        <div>
          <button onClick={() => setTela('home')} style={s.btnVoltar}>← Home</button>
          <h1 style={s.titulo}>Produtos</h1>
          <p style={s.subtitulo}>
            {produtos.length} produto{produtos.length !== 1 ? 's' : ''} cadastrado{produtos.length !== 1 ? 's' : ''}
          </p>
        </div>
        {podeGerenciar &&(
        <button onClick={abrirNovo} style={s.btnPrimario}>+ Novo produto</button>

        )}
      </header>

      <div style={s.barraFiltro}>
        <input
          type="text"
          placeholder="Buscar por nome, categoria ou cód. de barras..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          style={s.inputBusca}
        />
        <button onClick={carregar} style={s.btnAtualizar} title="Recarregar">↻</button>
      </div>

      {erro && (
        <div style={s.alertaErro}>
          {erro}
          <button onClick={() => setErro(null)} style={s.btnDismiss}>✕</button>
        </div>
      )}
      {sucesso && <div style={s.alertaSucesso}>{sucesso}</div>}

      {carregando ? (
        <div style={s.centro}>Carregando...</div>
      ) : produtosFiltrados.length === 0 ? (
        <div style={s.centro}>
          {busca ? 'Nenhum produto encontrado para essa busca.' : 'Nenhum produto cadastrado ainda.'}
        </div>
      ) : (
        <div style={s.tabelaWrapper}>
          <table style={s.tabela}>
            <thead>
              <tr>
                {['ID', 'Nome', 'Categoria', 'Preço', 'Estoque', 'Unid.', 'Status', 'Ações'].map(col => (
                  <th key={col} style={s.th}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {produtosFiltrados.map((p) => (
                <tr key={p.id} style={s.tr}>
                  <td style={s.td}><span style={s.idBadge}>#{p.id}</span></td>
                  <td style={s.td}>
                    {p.url_img && (
    <img
      src={p.url_img}
      alt={p.nome}
      style={s.imagemProduto}
    />
  )}

  <div style={s.nomeProduto}>
    {p.nome}
  </div>

  {p.marca && (
    <div style={s.sub}>
      {p.marca}
    </div>
  )}

                  </td>
                  <td style={s.td}>{p.categoria ?? '—'}</td>
                  <td style={s.td}>
                    {p.preco != null
                      ? p.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                      : '—'}
                  </td>
                  <td style={s.td}>
                    <span style={p.estoque_inicial != null && p.estoque_minimo != null && p.estoque_inicial <= p.estoque_minimo ? s.estoqueAlerta : {}}>
                      {p.estoque_inicial ?? '—'}
                    </span>
                  </td>
                  <td style={s.td}>{p.Un ?? '—'}</td>
                  <td style={s.td}>
                    {p.ativo
                      ? <span style={s.badgeAtivo}>Ativo</span>
                      : <span style={s.badgeInativo}>Inativo</span>}
                    {p.servico && <span style={s.badgeServico}>Serviço</span>}
                  </td>
                  <td style={s.td}>
  {podeGerenciar && (
    <div style={s.acoes}>
      <button onClick={() => abrirEditar(p)} style={s.btnEditar}>
        Editar
      </button>

      <button
        onClick={() => deletar(p.id)}
        disabled={deletandoId === p.id}
        style={s.btnDeletar}
      >
        {deletandoId === p.id ? '...' : 'Deletar'}
      </button>
    </div>
  )}
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalAberto && (
        <ProdutoForm
          produtoEditar={produtoEditar}
          onSalvar={salvar}
          onCancelar={fecharModal}
          carregando={salvando}
        />
      )}
    </div>
  );
}

const d = {
  bg:         '#282a36',
  bgCard:     '#1e1f29',
  bgSurface:  '#323447',
  border:     '#44475a',
  purple:     '#bd93f9',
  pink:       '#ff79c6',
  green:      '#50fa7b',
  red:        '#ff5555',
  cyan:       '#8be9fd',
  comment:    '#6272a4',
  foreground: '#f8f8f2',
};

const s = {
  container: {
    maxWidth: '1100px', margin: '0 auto', padding: '2rem 1rem',
    fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
    background: d.bg, minHeight: '100vh', color: d.foreground,
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    marginBottom: '1.5rem',
  },
  btnVoltar: {
    background: 'none', border: 'none', cursor: 'pointer',
    color: d.comment, fontSize: '0.78rem', padding: '0 0 4px',
    display: 'block', fontFamily: 'inherit',
  },
  titulo: { margin: 0, fontSize: '1.5rem', fontWeight: 700, color: d.purple },
  subtitulo: { margin: '2px 0 0', fontSize: '0.875rem', color: d.comment },
  barraFiltro: { display: 'flex', gap: '8px', marginBottom: '1rem' },
  inputBusca: {
    flex: 1, padding: '8px 12px', borderRadius: '8px',
    border: `1px solid ${d.border}`, fontSize: '0.875rem',
    background: d.bgSurface, color: d.foreground, outline: 'none',
    fontFamily: 'inherit',
  },
  btnAtualizar: {
    padding: '8px 14px', borderRadius: '8px', border: `1px solid ${d.border}`,
    background: d.bgSurface, color: d.foreground, cursor: 'pointer', fontSize: '1rem',
  },
  btnPrimario: {
    padding: '9px 18px', borderRadius: '8px', border: 'none',
    background: d.purple, color: d.bg, cursor: 'pointer',
    fontSize: '0.875rem', fontWeight: 700, whiteSpace: 'nowrap',
    fontFamily: 'inherit',
  },
  alertaErro: {
    background: '#3d1f1f', color: d.red, border: `1px solid ${d.red}`,
    borderRadius: '8px', padding: '10px 14px', marginBottom: '1rem',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    fontSize: '0.875rem',
  },
  alertaSucesso: {
    background: '#1a3d25', color: d.green, border: `1px solid ${d.green}`,
    borderRadius: '8px', padding: '10px 14px', marginBottom: '1rem',
    fontSize: '0.875rem',
  },
  btnDismiss: {
    background: 'none', border: 'none', cursor: 'pointer',
    color: d.red, fontWeight: 700,
  },
  centro: { textAlign: 'center', padding: '3rem', color: d.comment, fontSize: '0.875rem' },
  tabelaWrapper: { overflowX: 'auto', borderRadius: '10px', border: `1px solid ${d.border}` },
  tabela: { width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' },
  th: {
    padding: '10px 12px', textAlign: 'left', background: d.bgCard,
    fontWeight: 600, fontSize: '0.78rem', color: d.cyan,
    borderBottom: `1px solid ${d.border}`, whiteSpace: 'nowrap',
  },
  tr: { borderBottom: `1px solid ${d.border}`, background: d.bgSurface },
  td: { padding: '10px 12px', verticalAlign: 'middle' },
  idBadge: { fontSize: '0.75rem', color: d.comment },
  nomeProduto: { fontWeight: 500, color: d.foreground },
  sub: { fontSize: '0.75rem', color: d.comment, marginTop: '1px' },
  estoqueAlerta: { color: d.red, fontWeight: 600 },
  badgeAtivo: {
    background: '#1a3d25', color: d.green, fontSize: '0.7rem',
    padding: '2px 8px', borderRadius: '999px', fontWeight: 500,
  },
  badgeInativo: {
    background: d.bgCard, color: d.comment, fontSize: '0.7rem',
    padding: '2px 8px', borderRadius: '999px',
  },
  badgeServico: {
    background: '#2d1f45', color: d.pink, fontSize: '0.7rem',
    padding: '2px 8px', borderRadius: '999px', marginLeft: '4px',
  },
  acoes: { display: 'flex', gap: '6px' },
  btnEditar: {
    padding: '5px 10px', borderRadius: '6px', border: `1px solid ${d.border}`,
    background: d.bgCard, color: d.cyan, cursor: 'pointer', fontSize: '0.78rem',
    fontFamily: 'inherit',
  },
  imagemProduto: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '6px',
  },

  btnDeletar: {
    padding: '5px 10px', borderRadius: '6px', border: `1px solid ${d.red}`,
    background: d.bgCard, color: d.red, cursor: 'pointer', fontSize: '0.78rem',
    fontFamily: 'inherit',
  },
};
