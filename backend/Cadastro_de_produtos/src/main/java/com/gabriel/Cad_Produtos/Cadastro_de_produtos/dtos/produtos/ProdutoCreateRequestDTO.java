package com.gabriel.Cad_Produtos.Cadastro_de_produtos.dtos.produtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ProdutoCreateRequestDTO {

    @NotBlank
    private String nome;
    @NotBlank
    private String descricao;

    @NotNull
    @Min(1)
    private Double preco;


    private String cod_barras;
    @NotBlank
    private String categoria;

    @NotNull
    @Min(1)
    private Integer estoque_inicial;


    @NotBlank
    private String Un;

    private String url_img;

    private String marca;
    private Boolean ativo;
    private Boolean servico;


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

    public String getUrl_img() {
        return url_img;
    }

    public void setUrl_img(String url_img) {
        this.url_img = url_img;
    }
}
