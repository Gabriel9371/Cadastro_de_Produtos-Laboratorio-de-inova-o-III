package com.gabriel.Cad_Produtos.Cadastro_de_produtos.service;

import com.gabriel.Cad_Produtos.Cadastro_de_produtos.dtos.produtos.ProdutoCreateRequestDTO;
import com.gabriel.Cad_Produtos.Cadastro_de_produtos.dtos.produtos.ProdutoResponseDTO;
import com.gabriel.Cad_Produtos.Cadastro_de_produtos.exception.ProdutctNotFoundException;
import com.gabriel.Cad_Produtos.Cadastro_de_produtos.mapper.ProdutoMapper;
import com.gabriel.Cad_Produtos.Cadastro_de_produtos.model.Produtos;
import com.gabriel.Cad_Produtos.Cadastro_de_produtos.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {
    Gerador_codBarras gen = new Gerador_codBarras();
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
        if (dto.getAtivo() == null && dto.getServico() == null) {
            dto.setAtivo(true);
            dto.setServico(false);

        }

        if (dto.getCod_barras() == null){

            dto.setCod_barras(gen.gerar_codigoDeBarras());
        }

        Produtos produto = produtoMapper.toEntity(dto);


        Produtos saveProduto = repository.save(produto);

        return produtoMapper.toResponse(saveProduto);
    }
    public ProdutoResponseDTO listProdutoById(Long id){
      Produtos produto = repository.findById(id).orElseThrow(
              () -> new ProdutctNotFoundException(id)
      );

      return produtoMapper.toResponse(produto);
    }




}
