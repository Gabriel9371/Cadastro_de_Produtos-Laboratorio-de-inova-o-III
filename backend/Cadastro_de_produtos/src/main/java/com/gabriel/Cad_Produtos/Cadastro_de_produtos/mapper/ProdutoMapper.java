package com.gabriel.Cad_Produtos.Cadastro_de_produtos.mapper;


import com.gabriel.Cad_Produtos.Cadastro_de_produtos.dtos.produtos.ProdutoCreateRequestDTO;
import com.gabriel.Cad_Produtos.Cadastro_de_produtos.dtos.produtos.ProdutoResponseDTO;
import com.gabriel.Cad_Produtos.Cadastro_de_produtos.dtos.produtos.ResponseToUpdate;
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


        produto.setAtivo(produtosDto.getAtivo());
        produto.setCategoria(produtosDto.getCategoria());
        produto.setServico(produtosDto.getServico());

        produto.setMarca(produtosDto.getMarca());
        produto.setUn(produtosDto.getUn());
        produto.setEstoque_inicial(produtosDto.getEstoque_inicial());

        produto.setCod_barras(produtosDto.getCod_barras());
        produto.setUrl_img(produtosDto.getUrl_img());

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

        response.setMarca(produto.getMarca());
        response.setUn(produto.getUn());

        response.setEstoque_inicial(produto.getEstoque_inicial());
        response.setCategoria(produto.getCategoria());
        response.setCod_barras(produto.getCod_barras());
        response.setUrl_img(produto.getUrl_img());

        return response;
    }

    public ResponseToUpdate toResponseTdoUpdate(Produtos produto){
        ResponseToUpdate updateProduct = new ResponseToUpdate();

        updateProduct.setId(produto.getId());
        updateProduct.setNome(produto.getNome());
        updateProduct.setPreco(produto.getPreco());
        updateProduct.setDescricao(produto.getDescricao());
        updateProduct.setAtualizadoEm(produto.getAtualizadoEm());

        updateProduct.setServico(produto.getServico());
        updateProduct.setAtivo(produto.getAtivo());

        updateProduct.setMarca(produto.getMarca());
        updateProduct.setUn(produto.getUn());
        updateProduct.setEstoque_inicial(produto.getEstoque_inicial());
        updateProduct.setCategoria(produto.getCategoria());
        updateProduct.setCod_barras(produto.getCod_barras());

        return updateProduct;

    }



    //Metodo muito especial usando função lambda!
    public List<ProdutoResponseDTO> toResponseList(List<Produtos> produtos){
        return produtos.stream().map(this::toResponse).toList();
    }
}
