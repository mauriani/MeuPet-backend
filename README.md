# MeuPet-backend

## Sobre o projeto

O projeto meuPet foi desenvolvido com a ideia de testar os conhecimentos que foram adquiridos durantes o bootecamp número 10.

## 🚀 Tecnologias usadas

- NodesJs
- Sequelize
- postgres

## 💻Pré requisitos

- Nodejs
- Yarn ou Npm
- Insomia
- Postbird

## Conceitos Docker

**Como funciona ?**

- A definição séria, que o docker ele é capaz de empacotar nossa aplicação e executar.
- Ele cria ambientes isolados, chamado de container;
- Esses contêineres expõe portas para fazer comunicação.

**Conceitos Docker**

- **Contêineres**

    Um container é um software ou até mesmo um ambiente inteiro onde todo o processo será executado. Por exemplo, eu posso ter várias imagens postgress mas eles rodam em containers diferentes.

- **Imagem**

    Imagens são tecnologias que podemos instalar dentro do nosso container, nela temos arquivos necessário para aplicação rodar.

- **Docker File**

    O docker file é um arquivo onde temos a receita de uma imagem, ou seja, um passo a passo para a geração de uma imagem.

    ```jsx
    Criação do Dockerfile > Criação de uma imagem > Criação de um contêiner
    ```

- **Docker Registry (Docker Hub)**

    Onde podemos visualizar todas imagens, em outras palavras séria o um repositório.

**Criação de container**

```jsx
sudo docker run --name FastFeet -e POSTGRES_PASSWORD=123456 -p 5432:5432 -d postgres
```

**Iniciando o projeto**

```jsx
sudo docker start (nome do container)
```

## 🚀Executando Projeto

Para executar o nosso conatiner docker tem que está executando.

```jsx
yarn dev
```

## ✏️ Clonando o projeto

```jsx
git clone https://github.com/mauriani/MeuPet-backend.git
```
