# API do Sistema Acadêmico

## Como executar a API localmente

1. No terminal, acessar a pasta `sistema-academico-api`.
2. Instalar as dependências do projeto: `npm install`
3. Executar a API: `npm start`

A API ficará disponível em `http://localhost:8080`.

## Workflow

Optamos pelo GitHub Flow, porque o projeto é pequeno e não tem ciclos de release formais. Esse fluxo favorece entregas contínuas e mantém a branch `main` estável. Cada nova funcionalidade é desenvolvida em uma branch específica e, após a conclusão, integrada à branch principal por meio de um Pull Request.

## Qualidade de Código e Análise Estática (SonarQube / SonarCloud)

O projeto está integrado ao SonarQube Cloud, utilizando a versão gratuita.

Link do projeto:
`https://sonarcloud.io/project/overview?id=Lucas21-10_sistema-academico-api`

### Execução local

1. Executar os testes e gerar o relatório de cobertura: `npm test`
2. Executar o linter: `npm run lint`
3. Executar o SonarScanner localmente: `npm run sonar`

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

## Infraestrutura com Vagrant e Configuração com Ansible

O projeto possui uma infraestrutura automatizada com duas máquinas virtuais criadas pelo **Vagrant** (Oracle VirtualBox) e gerenciadas via **Ansible**.

### Arquitetura das Máquinas Virtuais

| Máquina | Hostname | Função | Memória RAM | Endereço IP |
| --- | --- | --- | --- | --- |
| **VM1** | `no-controle` | Nó de controle (Ansible) e máquina de testes | 1024 MB | `192.168.56.10` |
| **VM2** | `servidor-api` | Servidor da API (Nó gerenciado) | 2048 MB | `192.168.56.11` |

As duas máquinas utilizam **Ubuntu 22.04 (`ubuntu/jammy64`)** e estão conectadas por uma rede privada (`192.168.56.0/24`).

### Arquivos de Configuração do Ansible

Os arquivos de configuração do Ansible estão na raiz do repositório e são montados automaticamente dentro da **VM1** no diretório `/vagrant_data` (com atalhos também em `/home/vagrant` e `/etc/ansible`):

- `ansible.cfg`: Configurações padrões do Ansible (inventário padrão `./hosts`, usuário `vagrant`, `host_key_checking = False` e escalonamento de privilégios via `sudo`).
- `hosts`: Inventário definindo o grupo `[servidor_api]` apontando para a **VM2** (`192.168.56.11`).
- `configura-node.yaml`: Playbook responsável por configurar a **VM2**:
  1. Instala dependências de sistema (`git`, `curl`, `ca-certificates`, `gnupg`) e o **Node.js 24**.
  2. Realiza o **clone do repositório** (`https://github.com/Lucas21-10/sistema-academico-api.git`) em `/opt/sistema-academico` na **VM2**.
  3. Realiza a **instalação das dependências de execução** da aplicação (`npm ci --omit=dev`).
  4. Configura e inicia o serviço `sistema-academico.service` via `systemd` na porta `8080`.

### Pré-requisitos

- Oracle VirtualBox instalado.
- Vagrant instalado.
- Git instalado para obter o repositório.

### Passo a Passo: Como Criar a Infraestrutura e Executar a Aplicação

#### 1. Subir as máquinas virtuais (Vagrant)

No terminal da máquina host, na pasta raiz do projeto, execute:

```bash
vagrant up
```

Durante o provisionamento inicial:
- Na **VM1** (Nó de controle), o Vagrant instala o **Ansible**, `sshpass`, `curl`, `wget` e `git`, além de montar os arquivos `ansible.cfg`, `hosts` e `configura-node.yaml` em `/vagrant_data`.
- Na **VM2**, o Vagrant habilita o acesso SSH para que o nó de controle possa gerenciá-la.

Para verificar o estado das máquinas virtuais:

```bash
vagrant status
```

#### 2. Acessar o nó de controle (VM1) e executar o Playbook do Ansible

Acesse a **VM1** via SSH:

```bash
vagrant ssh vm1
```

Dentro da **VM1**, acesse a pasta montada `/vagrant_data` (ou execute diretamente do diretório inicial `/home/vagrant`) e execute o playbook `configura-node.yaml`:

```bash
cd /vagrant_data
ansible-playbook -i hosts configura-node.yaml
```

> Como o arquivo `ansible.cfg` já define o inventário padrão, você também pode executar apenas `ansible-playbook configura-node.yaml`.

Ao final da execução do playbook, o repositório terá sido clonado em `/opt/sistema-academico` na **VM2**, as dependências de execução estarão instaladas e o serviço da API estará ativo na porta `8080`.

 Caso deseje verificar ou reiniciar manualmente a aplicação diretamente na **VM2** (`vagrant ssh vm2`):

```bash
sudo systemctl status sistema-academico
# Ou para executar manualmente em primeiro plano:
sudo systemctl stop sistema-academico
cd /opt/sistema-academico && npm start
```

### Como Testar a Aplicação usando `curl` ou `wget`

Com o playbook executado, a partir do terminal da **VM1** (`vagrant ssh vm1`), teste os endpoints da API hospedada na **VM2** (`192.168.56.11:8080`):

#### Teste com `curl`

Listar disciplinas cadastradas (`GET /api/disciplinas`):

```bash
curl http://192.168.56.11:8080/api/disciplinas
```

Cadastrar uma nova disciplina (`POST /api/disciplinas`):

```bash
curl -X POST http://192.168.56.11:8080/api/disciplinas \
  -H "Content-Type: application/json" \
  -d '{"nome": "Gerencia de Configuracao", "cargaHoraria": 60, "obrigatoria": true}'
```

#### Teste com `wget`

Listar disciplinas cadastradas (`GET /api/disciplinas`) exibindo a saída JSON no terminal:

```bash
wget -qO- http://192.168.56.11:8080/api/disciplinas
```

Se a configuração estiver correta, ambos os comandos retornarão a lista de disciplinas em formato JSON com status HTTP `200 OK`.

### Encerrar a infraestrutura

Para desligar as máquinas virtuais sem removê-las:

```bash
vagrant halt
```

Para remover as máquinas virtuais criadas pelo Vagrant:

```bash
vagrant destroy
```
