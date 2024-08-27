# Projeto para apredizagem de colegas sobre api, apenas o básico

## Organização

O projeto foi organizado em módulos dividindo cada funcionalidade específica.
O banco de dados utilizado é SQLite, com consultas realizadas pelo prisma-client.

## iniciar o projeto

### setup banco de dados

Para iniciar o projeto, primeiro inicie o banco de dados prisma SQLite com os comandos abaixo

    $ npx prisma migrate dev --name init
    $ npx prisma generate
    $ npm run load:db

### Inicio do server

Com o banco de dados em mão basta apenas instalar as dependencias do projeto

    $ npm i

Apos isso basta iniciar e ja poderá fazer requisições

    $ npm run dev
