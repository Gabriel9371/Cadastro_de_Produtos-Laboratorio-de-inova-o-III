package com.gabriel.Cad_Produtos.Cadastro_de_produtos.model;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "Produtos_")
public class Produtos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String descricao;
    private Double preco;
    private LocalDateTime criadoEm;
    private LocalDateTime atualizadoEm;


    public Produtos(){

    }


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

    public LocalDateTime getAtualizadoEm() {
        return atualizadoEm;
    }

    public void setAtualizadoEm(LocalDateTime atualizadoEm) {
        this.atualizadoEm = atualizadoEm;
    }


    //primeira vez que uso LocalDateTime vou descobrir agora se funciona ou não! :)
    public void prePersist(){
        this.criadoEm = LocalDateTime.now();

    }
    public void preUpdate(){
        this.atualizadoEm = LocalDateTime.now();
    }
}
