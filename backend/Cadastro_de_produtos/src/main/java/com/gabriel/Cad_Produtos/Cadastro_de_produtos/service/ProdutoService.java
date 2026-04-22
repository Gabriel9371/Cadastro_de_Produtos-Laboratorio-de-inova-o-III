package com.gabriel.Cad_Produtos.Cadastro_de_produtos.service;

import com.gabriel.Cad_Produtos.Cadastro_de_produtos.dtos.produtos.ProdutoCreateRequestDTO;
import com.gabriel.Cad_Produtos.Cadastro_de_produtos.dtos.produtos.ProdutoResponseDTO;
import com.gabriel.Cad_Produtos.Cadastro_de_produtos.mapper.ProdutoMapper;
import com.gabriel.Cad_Produtos.Cadastro_de_produtos.model.Produtos;
import com.gabriel.Cad_Produtos.Cadastro_de_produtos.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {
    private final ProdutoMapper produtoMapper;
    private final ProdutoRepository repository;

    public ProdutoService(ProdutoMapper produtoMapper, ProdutoRepository repository) {
        this.produtoMapper = produtoMapper;
        this.repository = repository;
    }

    public List<ProdutoResponseDTO> listAllProdutcts(){
        List<Produtos> allProdutct = repository.findAll();
        List<ProdutoResponseDTO> allProductsList = produtoMapper.toResponseList(allProdutct);

        return allProductsList;
    }

    public ProdutoResponseDTO createProduto(ProdutoCreateRequestDTO dto){
        Produtos produto = produtoMapper.toEntity(dto);
        Produtos saveProduto = repository.save(produto);

        return produtoMapper.toResponse(saveProduto);
    }

//    public ProdutoResponseDTO listProdutoById(Long id){
//        Produtos produto = repository.findById(id).orElseThrow();
//
//    }
}
