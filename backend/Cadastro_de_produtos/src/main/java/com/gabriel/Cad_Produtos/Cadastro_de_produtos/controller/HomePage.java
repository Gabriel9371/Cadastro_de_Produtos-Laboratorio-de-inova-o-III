package com.gabriel.Cad_Produtos.Cadastro_de_produtos.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/home")
public class HomePage {

    //Pagina Home pra sera feita com react depois mas por agora apenas pra ter uma rota acessivel deixei isso...
    //Criei o html e css no VScode primeiro, logico.
    private final String test = """
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Home</title>
                <style>
                    
                    body, html {
                        margin: 0;
                        padding: 0;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center; 
                        font-family: sans-serif;
                    }
            
                    h1 {
                        color: #0000FF; /* Azul padrão (pure blue) */
                        font-size: 3rem;
                    }
                </style>
            </head>
            <body>
            
                <h1>Pagina home :)</h1>
            
            </body>
            </html>
            """;


    @GetMapping
    public String homepage(){
        return test;
    }
}
