package com.gabriel.Cad_Produtos.Cadastro_de_produtos.dataLoader;

import com.gabriel.Cad_Produtos.Cadastro_de_produtos.enums.Roles;
import com.gabriel.Cad_Produtos.Cadastro_de_produtos.model.Usuarios;
import com.gabriel.Cad_Produtos.Cadastro_de_produtos.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {
    @Bean
    CommandLineRunner loadUsers(UserRepository repository){
        return args -> {
            if (repository.count() == 0){
                Usuarios admin = new Usuarios();
                admin.setUsername("admin");
                admin.setPassword("123");
                admin.setRole(Roles.ADMIN);

                Usuarios vendedor = new Usuarios();
                vendedor.setUsername("vendedor");
                vendedor.setPassword("123");
                vendedor.setRole(Roles.VENDEDOR);

                Usuarios user = new Usuarios();
                user.setUsername("usuario");
                user.setPassword("123");
                user.setRole(Roles.USER);

                repository.save(admin);
                repository.save(vendedor);
                repository.save(user);
            }
        };
    }
}
