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

    private String cod_barras;
    private String categoria;

    private Integer estoque_inicial;
    private Integer estoque_minimo;
    private String Un;
    private String marca;
    private String grupo;
    private Boolean ativo;
    private Boolean servico;


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

    public String getCod_barras() {
        return cod_barras;
    }

    public void setCod_barras(String cod_barras) {
        this.cod_barras = cod_barras;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public Integer getEstoque_inicial() {
        return estoque_inicial;
    }

    public void setEstoque_inicial(Integer estoque_inicial) {
        this.estoque_inicial = estoque_inicial;
    }

    public Integer getEstoque_minimo() {
        return estoque_minimo;
    }

    public void setEstoque_minimo(Integer estoque_minimo) {
        this.estoque_minimo = estoque_minimo;
    }

    public String getUn() {
        return Un;
    }

    public void setUn(String un) {
        Un = un;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getGrupo() {
        return grupo;
    }

    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public Boolean getServico() {
        return servico;
    }

    public void setServico(Boolean servico) {
        this.servico = servico;
    }
}
