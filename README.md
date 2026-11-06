# API do Sistema Acadêmico

## Como executar a API localmente

1. No terminal, acessar a pasta `sistema-academico-api`.
2. Instalar as dependências do projeto: npm install
3. Executar a API: npm start

A API ficará disponível em `http://localhost:8080`.

## Workflow

Optamos pelo GitHub Flow, porque o projeto é pequeno e não tem ciclos de release formais. Esse fluxo favorece entregas contínuas e mantém a branch `main` estável. Cada nova funcionalidade é desenvolvida em uma branch específica e, após a conclusão, integrada à branch principal por meio de um Pull Request.

## Qualidade de Código e Análise Estática (SonarQube / SonarCloud)

O projeto está integrado ao SonarQube Cloud, utilizando a versão gratuita.

Link do projeto: 
`https://sonarcloud.io/project/overview?id=Lucas21-10_sistema-academico-api`

### Execução local

1. Executar os testes e gerar o relatório de cobertura: npm test
2. Executar o linter: npm run lint
3. Executar o SonarScanner localmente: npm run sonar

Para a análise, é necessário configurar a variável de ambiente `SONAR_TOKEN`.

## Docker Hub

A imagem Docker da API está hospedada publicamente no Docker Hub.

Repositório: 
`https://hub.docker.com/r/luc2110/sistema-academico-api`

[![Docker Pulls](https://img.shields.io/docker/pulls/luc2110/sistema-academico-api?logo=docker)](https://hub.docker.com/r/luc2110/sistema-academico-api)

### Executar a API com Docker
Para baixar a imagem: `docker pull luc2110/sistema-academico-api:latest`

Para executar o container: `docker run -p 8080:8080 luc2110/sistema-academico-api:latest`

A API ficará disponível em:

`http://localhost:8080`

## Infraestrutura com Vagrant

O projeto possui uma infraestrutura automatizada com duas máquinas virtuais, utilizando Vagrant e Oracle VirtualBox.

### Configuração das máquinas virtuais
MÁQUINAS: 

Máquina: VM1
Função: Máquina de testes
Memória RAM: 1024 MB
Endereço IP: 192.168.56.10

Máquina: VM2
Função: Servidor da API
Memória RAM: 2048 MB
Endereço IP: 192.168.56.11

As duas máquinas utilizam Ubuntu 22.04 e estão conectadas por uma rede privada, permitindo a comunicação entre elas.

### Pré-requisitos

- Oracle VirtualBox instalado.
- Vagrant instalado.
- Git instalado para obter o repositório.
- Node.js não precisa estar instalado no computador host, pois será instalado automaticamente na VM2.

### Como iniciar a infraestrutura

1. Abrir o terminal na pasta do projeto.
2. Executar o comando: vagrant up

O Vagrant criará as duas máquinas virtuais e realizará automaticamente as configurações necessárias.

Na VM1 será instalado o `curl`, utilizado para testar a comunicação com a API.

Na VM2 serão instalados o Node.js 24 e as dependências da aplicação. A pasta do projeto será sincronizada com o diretório `/vagrant_data`. Uma cópia local da aplicação será utilizada para instalar as dependências e executar a API.

### Verificar o estado das máquinas virtuais

Para verificar o estado das máquinas: vagrant status

### Acessar as máquinas virtuais

Para acessar a VM1: vagrant ssh vm1

Para acessar a VM2: vagrant ssh vm2


### Testar a API a partir da VM1

Com as duas máquinas virtuais em execução, acessar a VM1: vagrant ssh vm1


Dentro da VM1, executar o comando: curl http://192.168.56.11:8080/api/disciplinas

Se a comunicação estiver funcionando, será retornada a lista de disciplinas cadastradas em formato JSON.


### Encerrar a infraestrutura

Para desligar as máquinas virtuais sem removê-las: vagrant halt


Para remover as máquinas virtuais criadas pelo Vagrant: vagrant destroy

Observação: o comando `vagrant destroy` remove as máquinas virtuais, mas não apaga os arquivos do projeto armazenados no computador host.