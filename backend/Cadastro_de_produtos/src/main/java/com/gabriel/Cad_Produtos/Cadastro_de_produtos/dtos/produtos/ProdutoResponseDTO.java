package com.gabriel.Cad_Produtos.Cadastro_de_produtos.dtos.produtos;

import java.time.LocalDateTime;

public class ProdutoResponseDTO {
    private Long id;
    private String nome;
    private String descricao;
    private Double preco;
    private LocalDateTime criadoEm;


    private Integer estoque_inicial;
    private String Un;
    private String marca;
    private Boolean ativo;
    private Boolean servico;
    private String categoria;
    private String cod_barras;
    private String url_img;




    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDateTime getCriadoEm() {
        return criadoEm;
    }

    public void setCriadoEm(LocalDateTime criadoEm) {
        this.criadoEm = criadoEm;
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

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getCod_barras() {
        return cod_barras;
    }

    public void setCod_barras(String cod_barras) {
        this.cod_barras = cod_barras;
    }

    public String getUrl_img() {
        return url_img;
    }

    public void setUrl_img(String url_img) {
        this.url_img = url_img;
    }
}
