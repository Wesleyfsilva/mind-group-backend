# Mind Blog - API (Backend)

Case técnico desenvolvido para a Mind Group. Uma API REST para gerenciamento de posts de um blog.

## Tecnologias
- Node.js + TypeScript
- Express
- MySQL (mysql2 com Promises)
- Autenticação via JWT
- Criptografia com Bcrypt

## Como executar
1. Configure o banco de dados usando o arquivo `schema.sql`.
2. Crie um arquivo `.env` baseado no seu ambiente (Host, User, Pass, DB).
3. Instale as dependências: `npm install`
4. Inicie o servidor: `npm run dev` (Porta 3001)

## Estrutura
- `src/config`: Conexão com banco.
- `src/controllers`: Lógica de Autenticação e Artigos.
- `src/middlewares`: Filtro de segurança (Token).