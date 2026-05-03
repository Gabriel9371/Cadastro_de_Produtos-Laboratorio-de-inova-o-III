import { useState, useEffect } from 'react';

const d = {
  bg:         '#282a36',
  bgCard:     '#1e1f29',
  bgSurface:  '#323447',
  border:     '#44475a',
  purple:     '#bd93f9',
  red:        '#ff5555',
  comment:    '#6272a4',
  foreground: '#f8f8f2',
};

const camposFormulario = [
  { key: 'nome',            label: 'Nome',             tipo: 'text',   obrigatorio: true },
  { key: 'descricao',       label: 'Descrição',        tipo: 'text',   obrigatorio: true },
  { key: 'preco',           label: 'Preço (R$)',        tipo: 'number', obrigatorio: true },
  { key: 'qtd',             label: 'Quantidade',        tipo: 'number', obrigatorio: true },
  { key: 'categoria',       label: 'Categoria',         tipo: 'text',   obrigatorio: true },
  { key: 'estoque_inicial', label: 'Estoque Inicial',   tipo: 'number', obrigatorio: true },
  { key: 'estoque_minimo',  label: 'Estoque Mínimo',    tipo: 'number', obrigatorio: true },
  { key: 'Un',              label: 'Unidade (ex: UN)',  tipo: 'text',   obrigatorio: true },
  { key: 'marca',           label: 'Marca',             tipo: 'text',   obrigatorio: false },
  { key: 'grupo',           label: 'Grupo',             tipo: 'text',   obrigatorio: false },
  { key: 'cod_barras',      label: 'Cód. de Barras',    tipo: 'text',   obrigatorio: false },
  { key: 'url_img',         label: 'URL da imagem',     tipo: 'text',   obrigatorio: false}
];

const valorInicial = {
  nome: '', descricao: '', preco: '', qtd: '', categoria: '',
  estoque_inicial: '', estoque_minimo: '', Un: '',
  marca: '', grupo: '', cod_barras: '',
  ativo: true, servico: false,
  url_img: '',
};

export default function ProdutoForm({ produtoEditar, onSalvar, onCancelar, carregando }) {
  const [form, setForm] = useState(valorInicial);

  useEffect(() => {
    if (produtoEditar) {
      setForm({
        url_img:         produtoEditar.url_img           ?? '',
        nome:             produtoEditar.nome             ?? '',
        descricao:        produtoEditar.descricao        ?? '',
        preco:            produtoEditar.preco            ?? '',
        qtd:              produtoEditar.qtd              ?? '',
        categoria:        produtoEditar.categoria        ?? '',
        estoque_inicial:  produtoEditar.estoque_inicial  ?? '',
        estoque_minimo:   produtoEditar.estoque_minimo   ?? '',
        Un:               produtoEditar.Un               ?? '',
        marca:            produtoEditar.marca            ?? '',
        grupo:            produtoEditar.grupo            ?? '',
        cod_barras:       produtoEditar.cod_barras       ?? '',
        ativo:            produtoEditar.ativo            ?? true,
        servico:          produtoEditar.servico          ?? false,
      });
    } else {
      setForm(valorInicial);
    }
  }, [produtoEditar]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dto = {
      ...form,
      preco:            form.preco            !== '' ? parseFloat(form.preco)         : undefined,
      qtd:              form.qtd              !== '' ? parseInt(form.qtd)              : undefined,
      estoque_inicial:  form.estoque_inicial  !== '' ? parseInt(form.estoque_inicial)  : undefined,
      estoque_minimo:   form.estoque_minimo   !== '' ? parseInt(form.estoque_minimo)   : undefined,
      cod_barras:       form.cod_barras       || undefined,
    };
    onSalvar(dto);
  };

  const isEdicao = !!produtoEditar;

  return (
    <div style={s.overlay}>
      <div style={s.modal}>
        <div style={s.header}>
          <h2 style={s.titulo}>{isEdicao ? 'Editar produto' : 'Novo produto'}</h2>
          <button onClick={onCancelar} style={s.btnFechar}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={s.grid}>
            {camposFormulario.map(({ key, label, tipo, obrigatorio }) => (
              <div key={key} style={key === 'descricao' ? { ...s.campo, gridColumn: '1 / -1' } : s.campo}>
                <label style={s.label}>
                  {label}
                  {obrigatorio && <span style={s.obrigatorio}> *</span>}
                </label>
                <input
                  name={key}
                  type={tipo}
                  step={tipo === 'number' ? 'any' : undefined}
                  value={form[key]}
                  onChange={handleChange}
                  required={obrigatorio && !isEdicao}
                  style={s.input}
                  placeholder={label}
                />
              </div>
            ))}

            <div style={s.checks}>
              <label style={s.checkLabel}>
                <input type="checkbox" name="ativo" checked={form.ativo} onChange={handleChange} />
                Ativo
              </label>
              <label style={s.checkLabel}>
                <input type="checkbox" name="servico" checked={form.servico} onChange={handleChange} />
                Serviço
              </label>
            </div>
          </div>

          <div style={s.rodape}>
            <button type="button" onClick={onCancelar} style={s.btnSecundario}>
              Cancelar
            </button>
            <button type="submit" disabled={carregando} style={s.btnPrimario}>
              {carregando ? 'Salvando...' : isEdicao ? 'Salvar alterações' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const s = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.65)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, padding: '1rem',
  },
  modal: {
    background: d.bgCard,
    border: `1px solid ${d.border}`,
    borderRadius: '12px',
    width: '100%', maxWidth: '640px',
    maxHeight: '90vh', overflowY: 'auto',
    padding: '1.5rem',
    fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
    color: d.foreground,
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '1.25rem',
  },
  titulo: { margin: 0, fontSize: '1.1rem', fontWeight: 600, color: d.purple },
  btnFechar: {
    background: 'none', border: 'none', cursor: 'pointer',
    fontSize: '1.1rem', color: d.comment, padding: '4px 8px', borderRadius: '4px',
  },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  campo: { display: 'flex', flexDirection: 'column', gap: '4px' },
  label: { fontSize: '0.75rem', fontWeight: 500, color: d.comment },
  obrigatorio: { color: d.red },
  input: {
    padding: '8px 10px', borderRadius: '6px',
    border: `1px solid ${d.border}`,
    background: d.bgSurface, color: d.foreground,
    fontSize: '0.875rem', outline: 'none',
    width: '100%', boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  checks: {
    gridColumn: '1 / -1',
    display: 'flex', gap: '1.5rem',
    alignItems: 'center', paddingTop: '4px',
  },
  checkLabel: {
    display: 'flex', alignItems: 'center', gap: '6px',
    fontSize: '0.875rem', cursor: 'pointer', color: d.foreground,
  },
  rodape: {
    display: 'flex', justifyContent: 'flex-end', gap: '10px',
    marginTop: '1.5rem',
  },
  btnSecundario: {
    padding: '8px 16px', borderRadius: '6px',
    border: `1px solid ${d.border}`, background: d.bgSurface,
    color: d.foreground, cursor: 'pointer', fontSize: '0.875rem',
    fontFamily: 'inherit',
  },
  btnPrimario: {
    padding: '8px 20px', borderRadius: '6px',
    border: 'none', background: d.purple, color: d.bg,
    cursor: 'pointer', fontSize: '0.875rem', fontWeight: 700,
    fontFamily: 'inherit',
  },
};
