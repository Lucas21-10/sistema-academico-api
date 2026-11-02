API DO SISTEMA

#COMO EXECUTAR

1. No terminal ir até a pasta sistema-academico-api
2. npm install express - vai adicionar as dependências automaticamente no package.json e também criar a pasta node_modules.
4. node server.js ou npm start - para rodar a API

# Workflow

Optamos pelo Github Flow, porque o projeto é pequeno e não tem ciclos de realese formais, ele favorece entregas contínuas e a main sempre fica estável, e cada nova funcionalidade nasce em um branch curta.

# Qualidade de Código e Análise Estática (SonarQube / SonarCloud)

O projeto está integrado ao **SonarQube** (versão gratuita oficial via SonarQube Cloud):

- **Link do Projeto no SonarQube / SonarCloud:** [https://sonarcloud.io/project/overview?id=Lucas21-10_sistema-academico-api](https://sonarcloud.io/project/overview?id=Lucas21-10_sistema-academico-api)

### Execução Local:
1. Executar testes e gerar relatório LCOV: `npm test`
2. Executar linter com regras Sonar: `npm run lint`
3. Executar o SonarScanner localmente: `npm run sonar` (ou configurando a variável `SONAR_TOKEN`)

# Docker Hub

A imagem Docker da API está hospedada publicamente no Docker Hub.

**Repositório:** [sistema-academico-api](https://hub.docker.com/r/luc2110/sistema-academico-api)

[![Docker Pulls](https://img.shields.io/docker/pulls/luc2110/sistema-academico-api?logo=docker)](https://hub.docker.com/r/luc2110/sistema-academico-api)

## Executar a API com Docker

Para baixar a imagem:

```bash
docker pull luc2110/sistema-academico-api:latest
```

Para executar o container:

```bash
docker run -p 8080:8080 luc2110/sistema-academico-api:latest
```

A API ficará disponível em http://localhost:8080.