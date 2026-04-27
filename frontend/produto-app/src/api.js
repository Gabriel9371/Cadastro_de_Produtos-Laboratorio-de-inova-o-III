const BASE_URL = 'http://localhost:8080/produtos';

export const api = {
  listarTodos: async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Erro ao listar produtos');
    return res.json();
  },

  buscarPorId: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error('Produto não encontrado');
    return res.json();
  },

  criar: async (dto) => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Erro ao criar produto');
    return res.json();
  },

  atualizar: async (id, dto) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw new Error('Erro ao atualizar produto');
    return res.json();
  },

  deletar: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Erro ao deletar produto');
  },
};
