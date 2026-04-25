package com.gabriel.Cad_Produtos.Cadastro_de_produtos.service;

//talvez isso não funcione kk

import java.util.Random;
import java.util.stream.Collectors;

public class Gerador_codBarras {


    public String gerar_codigoDeBarras(){
        Random random = new Random();
        StringBuilder codigo = new StringBuilder(); //Usei isso pois StringBuilder é mutavel assim conssigo gerar 13 numeros aleatorios para 1 string ;)


        for (int i=0; i<13; i++){
            codigo.append(random.nextInt(10));
        }

        return codigo.toString();
    }
}
