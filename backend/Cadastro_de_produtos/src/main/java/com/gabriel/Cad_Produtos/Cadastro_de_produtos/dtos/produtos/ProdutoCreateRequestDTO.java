package com.gabriel.Cad_Produtos.Cadastro_de_produtos.dtos.produtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class ProdutoCreateRequestDTO {

    @NotBlank
    private String nome;
    @NotBlank
    private String descricao;

    @NotBlank
    private Double preco;

    @NotBlank
    private Integer qtd;


    public Integer getQtd() {
        return qtd;
    }

    public void setQtd(Integer qtd) {
        this.qtd = qtd;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }
}
