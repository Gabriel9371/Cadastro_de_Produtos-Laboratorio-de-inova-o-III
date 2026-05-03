package com.gabriel.Cad_Produtos.Cadastro_de_produtos.service;

import com.gabriel.Cad_Produtos.Cadastro_de_produtos.model.Usuarios;
import com.gabriel.Cad_Produtos.Cadastro_de_produtos.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService{
    private final UserRepository repository;

    public CustomUserDetailsService(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username){

        Usuarios user = repository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Usuario não encontrado"));


        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                List.of(
                        new SimpleGrantedAuthority("ROLE_" + user.getRole().name())
                )
        );
    }
}
