package com.gabriel.Cad_Produtos.Cadastro_de_produtos.repository;

import com.gabriel.Cad_Produtos.Cadastro_de_produtos.model.Produtos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produtos, Long> {
}
