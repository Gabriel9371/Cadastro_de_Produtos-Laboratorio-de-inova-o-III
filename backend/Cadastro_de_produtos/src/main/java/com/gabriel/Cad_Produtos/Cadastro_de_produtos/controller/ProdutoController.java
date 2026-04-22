package com.gabriel.Cad_Produtos.Cadastro_de_produtos.controller;


import com.gabriel.Cad_Produtos.Cadastro_de_produtos.dtos.produtos.ProdutoCreateRequestDTO;
import com.gabriel.Cad_Produtos.Cadastro_de_produtos.dtos.produtos.ProdutoResponseDTO;
import com.gabriel.Cad_Produtos.Cadastro_de_produtos.service.ProdutoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {
    private final ProdutoService service;

    public ProdutoController(ProdutoService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ProdutoResponseDTO>> todosOsProdutos(){
        List<ProdutoResponseDTO> produtos = service.listAllProdutcts();

        return ResponseEntity.ok(produtos);
    }


    @PostMapping
    public ResponseEntity<ProdutoResponseDTO> createProdutc(@RequestBody ProdutoCreateRequestDTO dto){
        ProdutoResponseDTO produto = service.createProduto(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(produto);
    }
}
