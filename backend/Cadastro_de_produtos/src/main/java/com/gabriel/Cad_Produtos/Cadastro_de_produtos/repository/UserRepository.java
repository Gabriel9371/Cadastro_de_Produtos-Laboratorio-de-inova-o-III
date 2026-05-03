package com.gabriel.Cad_Produtos.Cadastro_de_produtos.repository;

import com.gabriel.Cad_Produtos.Cadastro_de_produtos.model.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Usuarios, Long> {
    Optional<Usuarios> findByUsername(String username);
}
