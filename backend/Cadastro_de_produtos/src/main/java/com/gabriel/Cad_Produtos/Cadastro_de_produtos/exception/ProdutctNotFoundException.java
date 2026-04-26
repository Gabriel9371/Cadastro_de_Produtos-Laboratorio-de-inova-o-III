package com.gabriel.Cad_Produtos.Cadastro_de_produtos.exception;

public class ProdutctNotFoundException extends RuntimeException {
    public ProdutctNotFoundException(Long id) {
        super("Produto com id: "+ id + " não encontrado");
    }
}
