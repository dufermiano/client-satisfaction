# Client Satisfaction Survey

Desafio técnico Survey - Eduardo Fermiano (dufermiano43@gmail.com)

![node-lts](https://img.shields.io/badge/Node.js-43853D)

Projeto que visa resolver o [problema](./docs/Problema.md):

## Conceitos utilizados
- Clean Architecture
- Clean Code
- Repository Pattern

## Stack de Tecnologias

1. [NodeJs 20.13.1 LTS](https://nodejs.org/en/blog/release/v20.13.1/)
2. [Express JS](https://expressjs.com/pt-br/)
3. [Sequelize](https://sequelize.org/)
4. [Typescript](https://www.typescriptlang.org/)
5. [Docker](https://www.docker.com/)
6. [Docker Compose](https://docs.docker.com)
7. [MySQL](https://www.mysql.com/)
8. [Zod Validator](https://zod.dev/)
9. [Jest](https://jestjs.io/pt-BR/)

## Dependências

Tenha o [Docker](https://www.docker.com/) instalado na sua máquina

## Executar Aplicação

Você deve ter o Docker instalado na sua máquina e rodar o seguinte comando:

```
docker-compose up
```

Para encerrá-la:

```
docker-compose down
```

## Rotas da aplicação

Importe o arquivo [Client satisfaction.postman_collection.json](./Client%20satisfaction.postman_collection.json) no seu Postman, lá existem exemplos para as rotas da aplicação.

### Instruções de execução

- Crie uma 'Survey' com um título, antes de executar as demais rotas, pois dependem dessa entidade.