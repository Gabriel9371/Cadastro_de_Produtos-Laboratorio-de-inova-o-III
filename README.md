Projeto desenvolvido para a disciplina de **Laboratório de Inovação**.  
Este módulo é responsável por **Manter o cadastro de produtos**, incluindo backend REST em Java com Spring Boot e frontend em React.

---

## Tecnologias utilizadas

**Backend**
- Java 17+
- Spring Boot 3
- Spring Data JPA
- Hibernate
- Maven
- Banco de dados relacional (MySQL)

**Frontend**
- React 18
- Vite
- JavaScript (sem bibliotecas externas)

---

## Como rodar o projeto

### Pré-requisitos

- Java 17 ou superior instalado
- Node.js 18 ou superior instalado
- Maven instalado (ou usar o wrapper `./mvnw`)

---

### 1. Rodando o Backend

```bash
# Clone o repositório ou acesse a pasta do projeto backend
cd seu-projeto-backend

# Rode o backend
mvn clean spring-boot:run
```

O servidor irá iniciar em: `http://localhost:8080`

> Se usar banco MySQL ou PostgreSQL, configure as credenciais no arquivo `src/main/resources/application.properties` antes de subir.

---

### 2. Rodando o Frontend

```bash
# Acesse a pasta do frontend
cd produto-app

# Instale as dependências (apenas na primeira vez)
npm install

# Suba o servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`

> O frontend já está configurado com um proxy que redireciona as chamadas para `http://localhost:8080`, então **não há problema de CORS** durante o desenvolvimento.

---

## Arquitetura do Backend

O backend segue o padrão de camadas típico do Spring Boot:

```
Controller  →  Service  →  Repository  →  Banco de dados
     ↑               ↓
    DTO           Mapper
```

| Camada | Responsabilidade |
|---|---|
| `Controller` | Recebe as requisições HTTP e retorna as respostas |
| `Service` | Contém a lógica de negócio |
| `Repository` | Acesso ao banco de dados via Spring Data JPA |
| `Mapper` | Converte entre entidade e DTOs |
| `DTO` | Objetos de transferência de dados (evita expor a entidade diretamente) |

---

## Endpoints da API

Base URL: `http://localhost:8080/produtos`

### Listar todos os produtos
```
GET /produtos
```
Retorna uma lista com todos os produtos cadastrados.

**Resposta:** `200 OK`
```json
[
  {
    "id": 1,
    "nome": "Caneta BIC Azul",
    "descricao": "Caneta esferográfica azul",
    "preco": 2.50,
    "categoria": "Papelaria",
    "estoque_inicial": 150,
    "estoque_minimo": 10,
    "Un": "UN",
    "marca": "BIC",
    "grupo": "Escrita",
    "cod_barras": "7891234567890",
    "ativo": true,
    "servico": false,
    "criadoEm": "2024-01-15T10:30:00"
  }
]
```

---

### Buscar produto por ID
```
GET /produtos/{id}
```

**Resposta:** `200 OK` — retorna o produto encontrado.  
**Erro:** `404 Not Found` — se o produto não existir.

---

### Cadastrar produto
```
POST /produtos
Content-Type: application/json
```

**Campos obrigatórios:**

| Campo | Tipo | Descrição |
|---|---|---|
| `nome` | String | Nome do produto |
| `descricao` | String | Descrição do produto |
| `preco` | Double | Preço unitário |
| `qtd` | Integer | Quantidade |
| `categoria` | String | Categoria do produto |
| `estoque_inicial` | Integer | Quantidade inicial em estoque |
| `estoque_minimo` | Integer | Quantidade mínima de alerta |
| `Un` | String | Unidade de medida (ex: UN, KG, L) |

**Campos opcionais:**

| Campo | Tipo | Descrição |
|---|---|---|
| `marca` | String | Marca do produto |
| `grupo` | String | Grupo/segmento |
| `cod_barras` | String | Código de barras (gerado automaticamente se não informado) |
| `ativo` | Boolean | Se o produto está ativo (padrão: `true`) |
| `servico` | Boolean | Se é um serviço e não um produto físico (padrão: `false`) |

**Exemplo de requisição:**
```json
{
  "nome": "Mouse Logitech M100",
  "descricao": "Mouse com fio USB",
  "preco": 89.90,
  "qtd": 50,
  "categoria": "Informática",
  "estoque_inicial": 50,
  "estoque_minimo": 5,
  "Un": "UN",
  "marca": "Logitech"
}
```

**Resposta:** `201 Created`

> Se `cod_barras` não for informado, o sistema gera um automaticamente.  
> Se `ativo` e `servico` não forem informados, o padrão é `ativo: true` e `servico: false`.

---

### Atualizar produto (parcial)
```
PATCH /produtos/{id}
Content-Type: application/json
```

Todos os campos são **opcionais** — apenas os campos enviados serão atualizados.

**Exemplo — alterar só o preço:**
```json
{
  "preco": 99.90
}
```

**Resposta:** `200 OK` — retorna o produto com os dados atualizados.  
**Erro:** `404 Not Found` — se o produto não existir.

---

### Deletar produto
```
DELETE /produtos/{id}
```

**Resposta:** `204 No Content` — produto removido com sucesso.  
**Erro:** `404 Not Found` — se o produto não existir.

---

## Estrutura do Frontend

O frontend é uma Single Page Application (SPA) composta por três telas principais:

| Tela | Descrição |
|---|---|
| **Home** | Tela inicial com apresentação do sistema e total de produtos cadastrados |
| **Listagem** | Tabela com todos os produtos, busca por nome/categoria/código de barras |
| **Formulário** | Modal para cadastrar ou editar um produto |


---

## Autor

Desenvolvido como parte do projeto de Laboratório de Inovação.  
Módulo: **Manter o Cadastro de Produtos**
