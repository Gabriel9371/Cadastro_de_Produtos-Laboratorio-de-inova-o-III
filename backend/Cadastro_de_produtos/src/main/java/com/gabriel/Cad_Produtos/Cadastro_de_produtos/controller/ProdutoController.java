package com.gabriel.Cad_Produtos.Cadastro_de_produtos.controller;


import com.gabriel.Cad_Produtos.Cadastro_de_produtos.dtos.produtos.ProdutoCreateRequestDTO;
import com.gabriel.Cad_Produtos.Cadastro_de_produtos.dtos.produtos.ProdutoResponseDTO;
import com.gabriel.Cad_Produtos.Cadastro_de_produtos.dtos.produtos.ProdutoUpdate;
import com.gabriel.Cad_Produtos.Cadastro_de_produtos.dtos.produtos.ResponseToUpdate;
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

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoResponseDTO> listProductById(@PathVariable Long id){
        ProdutoResponseDTO product = service.listProdutoById(id);

        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductById(@PathVariable Long id){
        service.deleteProductById(id);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ResponseToUpdate> updateProdutct(@PathVariable Long id, @RequestBody ProdutoUpdate dto){
        ResponseToUpdate product = service.updateTotalProdutct(id, dto);

        return ResponseEntity.ok(product);
    }
}
