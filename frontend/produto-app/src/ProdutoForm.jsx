import { useState, useEffect } from "react";

const camposFormulario = [
  { key: "nome",            label: "Nome",            tipo: "text",   obrigatorio: true  },
  { key: "descricao",       label: "Descrição",        tipo: "text",   obrigatorio: true,  full: true },
  { key: "preco",           label: "Preço (R$)",       tipo: "number", obrigatorio: true  },
  { key: "qtd",             label: "Quantidade",       tipo: "number", obrigatorio: true  },
  { key: "categoria",       label: "Categoria",        tipo: "text",   obrigatorio: true  },
  { key: "estoque_inicial", label: "Estoque Inicial",  tipo: "number", obrigatorio: true  },
  { key: "estoque_minimo",  label: "Estoque Mínimo",   tipo: "number", obrigatorio: true  },
  { key: "Un",              label: "Unidade (ex: UN)", tipo: "text",   obrigatorio: true  },
  { key: "marca",           label: "Marca",            tipo: "text",   obrigatorio: false },
  { key: "grupo",           label: "Grupo",            tipo: "text",   obrigatorio: false },
  { key: "cod_barras",      label: "Cód. de Barras",   tipo: "text",   obrigatorio: false },
  { key: "url_img",         label: "URL da imagem",    tipo: "text",   obrigatorio: false, full: true },
];

const valorInicial = {
  nome: "", descricao: "", preco: "", qtd: "", categoria: "",
  estoque_inicial: "", estoque_minimo: "", Un: "",
  marca: "", grupo: "", cod_barras: "", url_img: "",
  ativo: true, servico: false,
};

export default function ProdutoForm({ produtoEditar, onSalvar, onCancelar, carregando }) {
  const [form, setForm]     = useState(valorInicial);
  const [focusKey, setFocusKey] = useState(null);

  useEffect(() => {
    if (produtoEditar) {
      setForm({
        url_img:         produtoEditar.url_img          ?? "",
        nome:            produtoEditar.nome             ?? "",
        descricao:       produtoEditar.descricao        ?? "",
        preco:           produtoEditar.preco            ?? "",
        qtd:             produtoEditar.qtd              ?? "",
        categoria:       produtoEditar.categoria        ?? "",
        estoque_inicial: produtoEditar.estoque_inicial  ?? "",
        estoque_minimo:  produtoEditar.estoque_minimo   ?? "",
        Un:              produtoEditar.Un               ?? "",
        marca:           produtoEditar.marca            ?? "",
        grupo:           produtoEditar.grupo            ?? "",
        cod_barras:      produtoEditar.cod_barras       ?? "",
        ativo:           produtoEditar.ativo            ?? true,
        servico:         produtoEditar.servico          ?? false,
      });
    } else {
      setForm(valorInicial);
    }
  }, [produtoEditar]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dto = {
      ...form,
      preco:           form.preco           !== "" ? parseFloat(form.preco)          : undefined,
      qtd:             form.qtd             !== "" ? parseInt(form.qtd)               : undefined,
      estoque_inicial: form.estoque_inicial !== "" ? parseInt(form.estoque_inicial)   : undefined,
      estoque_minimo:  form.estoque_minimo  !== "" ? parseInt(form.estoque_minimo)    : undefined,
      cod_barras:      form.cod_barras      || undefined,
    };
    onSalvar(dto);
  };

  const isEdicao = !!produtoEditar;

  return (
    <div style={s.overlay}>
      <div style={s.modal}>

        {/* Header */}
        <div style={s.header}>
          <div>
            <p style={s.modalLabel}>
              {isEdicao ? "editar produto" : "novo produto"}
            </p>
            {isEdicao && (
              <p style={s.modalSub}>#{produtoEditar.id} · {produtoEditar.nome}</p>
            )}
          </div>
          <button onClick={onCancelar} style={s.btnFechar} title="Fechar">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke={c.muted} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div style={s.divider} />

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={s.grid}>
            {camposFormulario.map(({ key, label, tipo, obrigatorio, full }) => (
              <div
                key={key}
                style={full ? { ...s.campo, gridColumn: "1 / -1" } : s.campo}
              >
                <label style={s.label}>
                  {label.toLowerCase()}
                  {obrigatorio && <span style={s.asterisco}> *</span>}
                </label>
                <input
                  name={key}
                  type={tipo}
                  step={tipo === "number" ? "any" : undefined}
                  value={form[key]}
                  onChange={handleChange}
                  required={obrigatorio && !isEdicao}
                  placeholder={label.toLowerCase()}
                  style={{
                    ...s.input,
                    ...(focusKey === key ? s.inputFocus : {}),
                  }}
                  onFocus={() => setFocusKey(key)}
                  onBlur={() => setFocusKey(null)}
                />
              </div>
            ))}

            {/* Checkboxes */}
            <div style={{ ...s.campo, gridColumn: "1 / -1", flexDirection: "row", gap: "1.5rem", paddingTop: "4px" }}>
              <label style={s.checkLabel}>
                <input
                  type="checkbox" name="ativo"
                  checked={form.ativo} onChange={handleChange}
                  style={s.checkbox}
                />
                <span>ativo</span>
              </label>
              <label style={s.checkLabel}>
                <input
                  type="checkbox" name="servico"
                  checked={form.servico} onChange={handleChange}
                  style={s.checkbox}
                />
                <span>serviço</span>
              </label>
            </div>
          </div>

          <div style={s.divider} />

          {/* Rodapé */}
          <div style={s.rodape}>
            <button type="button" onClick={onCancelar} style={s.btnCancelar}>
              cancelar
            </button>
            <button
              type="submit"
              disabled={carregando}
              style={{ ...s.btnSalvar, ...(carregando ? s.btnDisabled : {}) }}
            >
              {carregando ? "salvando..." : isEdicao ? "salvar alterações" : "cadastrar"}
            </button>
          </div>
        </form>
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
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.75)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000, padding: "1rem",
  },
  modal: {
    background: c.surface, border: `0.5px solid ${c.border}`,
    borderRadius: "14px",
    width: "100%", maxWidth: "600px",
    maxHeight: "90vh", overflowY: "auto",
    padding: "1.5rem",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    color: c.fg,
  },
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    marginBottom: "1rem",
  },
  modalLabel: {
    margin: 0, fontSize: "13px", fontWeight: 500,
    color: c.fg, fontFamily: "'DM Mono', monospace",
    textTransform: "uppercase", letterSpacing: "0.06em",
  },
  modalSub: {
    margin: "3px 0 0", fontSize: "11px", color: c.muted,
    fontFamily: "'DM Mono', monospace",
  },
  btnFechar: {
    background: "none", border: "none", cursor: "pointer",
    padding: "4px", borderRadius: "6px", display: "flex",
  },
  divider: { height: "0.5px", background: c.border, margin: "1rem 0" },
  grid: {
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px",
  },
  campo: { display: "flex", flexDirection: "column", gap: "5px" },
  label: {
    fontSize: "10px", color: c.muted,
    textTransform: "uppercase", letterSpacing: "0.08em",
    fontFamily: "'DM Mono', monospace",
  },
  asterisco: { color: c.danger },
  input: {
    padding: "9px 11px", borderRadius: "7px",
    border: `0.5px solid ${c.border}`,
    background: c.bg, color: c.dim,
    fontSize: "12px", fontFamily: "'DM Mono', monospace",
    outline: "none", width: "100%", boxSizing: "border-box",
    transition: "border-color 0.15s, color 0.15s",
  },
  inputFocus: { borderColor: c.accent, color: c.fg },
  checkLabel: {
    display: "flex", alignItems: "center", gap: "7px",
    fontSize: "12px", color: c.dim, cursor: "pointer",
    fontFamily: "'DM Mono', monospace",
  },
  checkbox: { accentColor: c.accent, cursor: "pointer" },
  rodape: {
    display: "flex", justifyContent: "flex-end", gap: "8px",
  },
  btnCancelar: {
    padding: "9px 16px", borderRadius: "7px",
    background: "transparent", border: `0.5px solid ${c.border}`,
    color: c.muted, cursor: "pointer",
    fontSize: "12px", fontFamily: "'DM Mono', monospace",
  },
  btnSalvar: {
    padding: "9px 18px", borderRadius: "7px",
    background: c.accent, border: "none",
    color: c.bg, cursor: "pointer",
    fontSize: "12px", fontWeight: 500,
    fontFamily: "'DM Mono', monospace",
  },
  btnDisabled: { opacity: 0.5, cursor: "not-allowed" },
};