import { useEffect, useState } from 'react';
import { api } from './api';

const d = {
  bg:         '#282a36',
  bgCard:     '#1e1f29',
  bgSurface:  '#323447',
  border:     '#44475a',
  purple:     '#bd93f9',
  pink:       '#ff79c6',
  green:      '#50fa7b',
  cyan:       '#8be9fd',
  comment:    '#6272a4',
  foreground: '#f8f8f2',
};

export default function Home({ onIrParaProdutos }) {
  const [total, setTotal] = useState(null);
  const [erro, setErro]   = useState(false);

  useEffect(() => {
    api.listarTodos()
      .then(data => setTotal(data.length))
      .catch(() => setErro(true));
  }, []);

  return (
    <div style={s.page}>
      <div style={s.centro}>
        <div style={s.logo}>S</div>
        <h1 style={s.titulo}>StockLab</h1>
        <p style={s.desc}>
          Sistema de gerenciamento de produtos desenvolvido como projeto de
          laboratório de inovação. Cadastre, edite e controle o estoque de
          produtos de forma simples e rápida.
        </p>

        <div style={s.card}>
          <p style={s.cardLabel}>Total de produtos cadastrados</p>
          <p style={s.cardNumero}>
            {erro ? '—' : total === null ? '...' : total}
          </p>
        </div>

        <button onClick={onIrParaProdutos} style={s.btn}>
          Gerenciar produtos →
        </button>
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: '100vh',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: d.bg, padding: '2rem',
    fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
  },
  centro: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    textAlign: 'center', maxWidth: '480px', width: '100%',
  },
  logo: {
    width: '60px', height: '60px', borderRadius: '16px',
    background: d.purple, color: d.bg,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '1.8rem', fontWeight: 700, marginBottom: '1.25rem',
  },
  titulo: { margin: '0 0 0.75rem', fontSize: '2.2rem', fontWeight: 700, color: d.purple },
  desc: { margin: '0 0 2rem', color: d.comment, lineHeight: 1.7, fontSize: '0.9rem' },
  card: {
    background: d.bgCard,
    border: `1px solid ${d.border}`,
    borderRadius: '12px',
    padding: '1.5rem 3rem',
    marginBottom: '2rem',
    minWidth: '220px',
  },
  cardLabel: { margin: '0 0 6px', fontSize: '0.75rem', color: d.comment, fontWeight: 500 },
  cardNumero: { margin: 0, fontSize: '2.8rem', fontWeight: 700, color: d.cyan },
  btn: {
    padding: '12px 32px', borderRadius: '8px',
    border: 'none', background: d.purple, color: d.bg,
    fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer',
    fontFamily: 'inherit',
  },
};
