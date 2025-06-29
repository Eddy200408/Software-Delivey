# Delivery App – Backend

Este projeto é um sistema de backend para um Software de Entrega em Casa, desenvolvido em Node.js com Express, Sequelize e PostgreSQL. Ele permite o gerenciamento de usuários (cliente, entregador, admin), lojas, produtos e pedidos, incluindo autenticação JWT, controle de acesso por tipo de usuário e simulação de fluxo real via Postman.

---

## Tecnologias Utilizadas

- **Node.js** + **Express** – Servidor web
- **Sequelize** – ORM para PostgreSQL
- **PostgreSQL** – Banco de dados relacional
- **JWT** – Autenticação segura
- **bcryptjs** – Criptografia de senhas
- **dotenv** – Variáveis de ambiente
- **morgan** – Logs de requisições

---

## Estrutura de Pastas

```
/config         # Configuração do banco de dados
/controllers    # Lógica das rotas
/middlewares    # Autenticação e autorização
/models         # Modelos Sequelize
/routes         # Rotas da API
/utils          # Funções utilitárias
```

---

## Como rodar o projeto

1. **Clone o repositório e instale as dependências:**
   ```
   npm install
   ```

2. **Configure o arquivo `.env` com suas credenciais do banco e JWT:**
   ```
   DB_NAME=delivery
   DB_USER=postgres
   DB_PASSWORD=sua_senha
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=sua_chave_secreta
   ```

3. **Sincronize o banco dados:**
   ```
   npm start
   ```
   Ou para desenvolvimento:
   ```
   npm run dev
   ```

4. **(Opcional) Teste a conexão com o banco:**
   ```
   node config/testeConnection.js
   ```

---

## Primeiros Passos para Testar o Sistema

> **IMPORTANTE:** Ao executar o software pela primeira vez, siga esta ordem para garantir que todos os testes funcionem:
>
> 1. **O admin é criado automaticamente pelo sistema.**
>    - **Credenciais padrão:**
>      - Email: `admin@email.com`
>      - Senha: `admin1234`
> 2. **Faça login como admin** e cadastre pelo menos um entregador, uma loja e um produto.
> 3. **Cadastre um cliente** pelo endpoint de registro.
> 4. **Faça login como cliente** e realize um pedido.
> 5. **Faça login como entregador** para aceitar e entregar pedidos.

---

## Usuários do Sistema

- **Admin:** Gerencia lojas, produtos e entregadores.
- **Entregador:** Aceita e entrega pedidos.
- **Cliente:** Visualiza produtos, faz pedidos e acompanha status.

---

## Fluxo de Uso no Postman (com links completos)

### Admin

- **Login:**
  ```
  POST http://localhost:3000/api/auth/login
  Body: { "email": "admin@email.com", "senha": "admin1234" }
  ```
- **Cadastrar loja:**
  ```
  POST http://localhost:3000/api/lojas
  Headers: Authorization: Bearer SEU_TOKEN_ADMIN
  Body: { "nome": "Loja Central", "endereco": "Mindelo", "telefone": "2389999999" }
  ```
- **Cadastrar produto:**
  ```
  POST http://localhost:3000/api/produtos
  Headers: Authorization: Bearer SEU_TOKEN_ADMIN
  Body: { "nome": "Pizza", "preco": 60, "descricao": "Grande", "lojaId": 1 }
  ```
- **Cadastrar entregador:**
  ```
  POST http://localhost:3000/api/usuarios/entregador
  Headers: Authorization: Bearer SEU_TOKEN_ADMIN
  Body: { "nome": "Entregador 1", "email": "entregador1@email.com", "senha": "senhaentregador" }
  ```

---

### Cliente

- **Cadastro:**
  ```
  POST http://localhost:3000/api/auth/register
  Body: { "nome": "Cliente 1", "email": "cliente1@email.com", "senha": "senhacliente" }
  ```
- **Login:**
  ```
  POST http://localhost:3000/api/auth/login
  Body: { "email": "cliente1@email.com", "senha": "senhacliente" }
  ```
- **Visualizar lojas:**
  ```
  GET http://localhost:3000/api/lojas
  ```
- **Visualizar produtos:**
  ```
  GET http://localhost:3000/api/produtos
  ```
- **Visualizar produtos de uma loja:**
  ```
  GET http://localhost:3000/api/produtos/loja/1
  ```
- **Fazer pedido:**
  ```
  POST http://localhost:3000/api/pedidos
  Headers: Authorization: Bearer SEU_TOKEN_CLIENTE
  Body: {
    "produtos": [{"nome": "Pizza", "quantidade": 1}],
    "valorTotal": 60,
    "latitude_cliente": -23.55052,
    "longitude_cliente": -46.633308
  }
  ```
- **Ver meus pedidos:**
  ```
  GET http://localhost:3000/api/pedidos/meus
  Headers: Authorization: Bearer SEU_TOKEN_CLIENTE
  ```

---

### Entregador

- **Login:**
  ```
  POST http://localhost:3000/api/auth/login
  Body: { "email": "entregador1@email.com", "senha": "senhaentregador" }
  ```
- **Ver pedidos disponíveis:**
  ```
  GET http://localhost:3000/api/pedidos/todos
  Headers: Authorization: Bearer SEU_TOKEN_ENTREGADOR
  ```
- **Aceitar pedido:**
  ```
  POST http://localhost:3000/api/pedidos/ID_DO_PEDIDO/aceitar
  Headers: Authorization: Bearer SEU_TOKEN_ENTREGADOR
  ```
- **Atualizar status do pedido:**
  ```
  PATCH http://localhost:3000/api/pedidos/ID_DO_PEDIDO/status
  Headers: Authorization: Bearer SEU_TOKEN_ENTREGADOR
  Body: { "status": "saiu_para_entrega" }
  ```
- **Finalizar pedido (entregue):**
  ```
  PATCH http://localhost:3000/api/pedidos/ID_DO_PEDIDO/status
  Headers: Authorization: Bearer SEU_TOKEN_ENTREGADOR
  Body: { "status": "entregue" }
  ```

---

## Observações Importantes

- Sempre envie o token JWT no header Authorization para rotas protegidas.
- O admin é criado automaticamente pelo sistema com as credenciais acima.
- Use o Postman para simular todo o fluxo do sistema.
- Para automatizar o uso do token no Postman, salve o token em uma variável de ambiente após o login.



**Projeto final De Engenharia de Software – Helder Santos**
