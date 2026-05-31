import { useState, useEffect } from "react";
import "./styles/ProdutoForm.css";

const camposFormulario = [
  { key: "nome",            label: "Nome",            tipo: "text",   obrigatorio: true  },
  { key: "descricao",       label: "Descrição",        tipo: "text",   obrigatorio: true,  full: true },
  { key: "preco",           label: "Preço (R$)",       tipo: "number", obrigatorio: true  },
  { key: "categoria",       label: "Categoria",        tipo: "text",   obrigatorio: true  },
  { key: "estoque_inicial", label: "Estoque Inicial",  tipo: "number", obrigatorio: true  },
  { key: "Un",              label: "Unidade (ex: UN)", tipo: "text",   obrigatorio: true  },
  { key: "marca",           label: "Marca",            tipo: "text",   obrigatorio: false },
  { key: "cod_barras",      label: "Cód. de Barras",   tipo: "text",   obrigatorio: false },
  { key: "url_img",         label: "URL da imagem",    tipo: "text",   obrigatorio: false, full: true },
];

const valorInicial = {
  nome: "", descricao: "", preco: "", categoria: "",
  estoque_inicial: "", Un: "",
  marca: "",  cod_barras: "", url_img: "",
  ativo: true, servico: false,
};

export default function ProdutoForm({ produtoEditar, onSalvar, onCancelar, carregando }) {
  const [form, setForm] = useState(valorInicial);

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
      preco:           form.preco           !== "" ? parseFloat(form.preco)         : undefined,
      qtd:             form.qtd             !== "" ? parseInt(form.qtd)              : undefined,
      estoque_inicial: form.estoque_inicial !== "" ? parseInt(form.estoque_inicial)  : undefined,
      estoque_minimo:  form.estoque_minimo  !== "" ? parseInt(form.estoque_minimo)   : undefined,
      cod_barras:      form.cod_barras      || undefined,
    };
    onSalvar(dto);
  };

  const isEdicao = !!produtoEditar;

  return (
    <div className="form-overlay">
      <div className="form-modal">

        {/* Header */}
        <div className="form-header">
          <div>
            <p className="form-modal-label">
              {isEdicao ? "editar produto" : "novo produto"}
            </p>
            {isEdicao && (
              <p className="form-modal-sub">#{produtoEditar.id} · {produtoEditar.nome}</p>
            )}
          </div>
          <button onClick={onCancelar} className="form-btn-fechar" title="Fechar">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="form-divider" />

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {camposFormulario.map(({ key, label, tipo, obrigatorio, full }) => (
              <div key={key} className={`form-campo${full ? " full" : ""}`}>
                <label className="form-label">
                  {label.toLowerCase()}
                  {obrigatorio && <span className="form-asterisco"> *</span>}
                </label>
                <input
                  name={key}
                  type={tipo}
                  step={tipo === "number" ? "any" : undefined}
                  value={form[key]}
                  onChange={handleChange}
                  required={obrigatorio && !isEdicao}
                  placeholder={label.toLowerCase()}
                  className="form-input"
                />
              </div>
            ))}

            {/* Checkboxes */}
            <div className="form-campo checkboxes">
              <label className="form-check-label">
                <input
                  type="checkbox" name="ativo"
                  checked={form.ativo} onChange={handleChange}
                />
                <span>ativo</span>
              </label>
              <label className="form-check-label">
                <input
                  type="checkbox" name="servico"
                  checked={form.servico} onChange={handleChange}
                />
                <span>serviço</span>
              </label>
            </div>
          </div>

          <div className="form-divider" />

          {/* Rodapé */}
          <div className="form-rodape">
            <button type="button" onClick={onCancelar} className="form-btn-cancelar">
              cancelar
            </button>
            <button
              type="submit"
              disabled={carregando}
              className="form-btn-salvar"
            >
              {carregando ? "salvando..." : isEdicao ? "salvar alterações" : "cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}