package com.gabriel.Cad_Produtos.Cadastro_de_produtos.mapper;


import com.gabriel.Cad_Produtos.Cadastro_de_produtos.dtos.produtos.ProdutoCreateRequestDTO;
import com.gabriel.Cad_Produtos.Cadastro_de_produtos.dtos.produtos.ProdutoResponseDTO;
import com.gabriel.Cad_Produtos.Cadastro_de_produtos.model.Produtos;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProdutoMapper {

    public Produtos toEntity(ProdutoCreateRequestDTO produtosDto){
        Produtos produto = new Produtos();
        produto.setNome(produtosDto.getNome());
        produto.setDescricao(produtosDto.getDescricao());
        produto.setPreco(produto.getPreco());
        produto.setQtd(produto.getQtd());

        return produto;
    }


    public ProdutoResponseDTO toResponse(Produtos produto){
        ProdutoResponseDTO response = new ProdutoResponseDTO();
        response.setId(produto.getId());
        response.setNome(produto.getNome());
        response.setPreco(produto.getPreco());
        response.setDescricao(produto.getDescricao());
        response.setCriadoEm(produto.getCriadoEm());

        return response;
    }



    //Metodo muito especial usando função lambda!
    public List<ProdutoResponseDTO> toResponseList(List<Produtos> produtos){
        return produtos.stream().map(this::toResponse).toList();
    }
}
