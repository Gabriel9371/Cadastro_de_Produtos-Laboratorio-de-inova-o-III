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
        produto.setPreco(produtosDto.getPreco());
        produto.setQtd(produtosDto.getQtd());

        produto.setAtivo(produtosDto.getAtivo());
        produto.setCategoria(produtosDto.getCategoria());
        produto.setServico(produtosDto.getServico());
        produto.setGrupo(produtosDto.getGrupo());
        produto.setMarca(produtosDto.getMarca());
        produto.setUn(produtosDto.getUn());
        produto.setEstoque_inicial(produtosDto.getEstoque_inicial());
        produto.setEstoque_minimo(produtosDto.getEstoque_minimo());
        produto.setCod_barras(produtosDto.getCod_barras());

        return produto;
    }


    public ProdutoResponseDTO toResponse(Produtos produto){
        ProdutoResponseDTO response = new ProdutoResponseDTO();
        response.setId(produto.getId());
        response.setNome(produto.getNome());
        response.setPreco(produto.getPreco());
        response.setDescricao(produto.getDescricao());
        response.setCriadoEm(produto.getCriadoEm());

        response.setServico(produto.getServico());
        response.setAtivo(produto.getAtivo());
        response.setGrupo(produto.getGrupo());
        response.setMarca(produto.getMarca());
        response.setUn(produto.getUn());
        response.setEstoque_minimo(produto.getEstoque_minimo());
        response.setEstoque_inicial(produto.getEstoque_inicial());
        response.setCategoria(produto.getCategoria());
        response.setCod_barras(produto.getCod_barras());

        return response;
    }



    //Metodo muito especial usando função lambda!
    public List<ProdutoResponseDTO> toResponseList(List<Produtos> produtos){
        return produtos.stream().map(this::toResponse).toList();
    }
}
