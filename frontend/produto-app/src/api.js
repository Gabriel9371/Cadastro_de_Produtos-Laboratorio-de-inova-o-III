import { pegarAuth } from "./auth";

const BASE_URL = "http://localhost:8080/produtos";

function getHeaders() {
  return {
    "Content-Type": "application/json",
    "Authorization": pegarAuth()
  };
}

export const api = {

  listarTodos: async () => {

    const res = await fetch(BASE_URL, {
      headers: getHeaders()
    });

    if (!res.ok) {
      throw new Error("Erro ao listar produtos");
    }

    return res.json();
  },


  buscarPorId: async (id) => {

    const res = await fetch(`${BASE_URL}/${id}`, {
      headers: getHeaders()
    });

    if (!res.ok) {
      throw new Error("Produto não encontrado");
    }

    return res.json();
  },


  criar: async (dto) => {

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(dto)
    });

    if (!res.ok) {
      throw new Error("Erro ao criar produto");
    }

    return res.json();
  },


  atualizar: async (id, dto) => {

    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(dto)
    });

    if (!res.ok) {
      throw new Error("Erro ao atualizar produto");
    }

    return res.json();
  },


  deletar: async (id) => {

    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: getHeaders()
    });

    if (!res.ok) {
      throw new Error("Erro ao deletar produto");
    }
  }
};