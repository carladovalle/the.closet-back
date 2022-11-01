# the.closet

O the.closet foi um projeto realizado por mim e pela Carla Valle, durante a última semana do "Módulo 3: back-end e MongoDB", do bootcamp da Driven Education. Trata-se de um e-commerce totalmente idealizado e desenvolvido por nós, desde o layout até os detalhes de cada funcionalidade. O front-end da aplicação foi inteiramente desenvolvido em React.js, utilizando tecnologias/ferramentas como styled-components, axios, ContextAPI e react-router-dom. Já o back-end foi feito em Node.js, utilizando express, para conexão do servidor; a lib JOI, para a validação de inputs; a lib bcrypt, para o armazenamento de dados sensíveis com segurança; e banco de dados NoSQL MongoDB, para armazenamento de dados dos usuários e de produtos.

<div align="center">
  <img src="https://i.postimg.cc/138PKx9K/the-closet.png" />
</div>

Teste a aplicação através do link: https://projeto14-the-closet-front.vercel.app/

## Sobre

Essa aplicação foi desenvolvida para dispositivos móveis, através da qual é possível realizar quaisquer funcionalidades encontradas em aplicações similares. Friso que os produtos constantes da aplicação, bem como seus preços, são meramente ilustrativos e, portanto, não é possível realizar quaisquer transações financeiras. Listo, a seguir, as funcionalidades implementadas:

- Cadastro de usuário;
- Login;
- Listagem de todos os produtos existentes, bem como o agrupamento desses em categorias (Masculina, Feminina, Verão, Inverno e Calçados);
- Busca de produtos em página própria ou pela barra de pesquisa na página principal, viabilizada por meio de requisições feitas para o banco de dados (mongoDB);
- Página de produto com sua imagem, preço, cores e tamanhos disponíveis e comentários de usuários;
- Avaliação de produtos através de comentários realizados pelos usuários na página dos produtos;
- Inclusão/Remoção de itens na lista de desejos, através do ícone em formato de coração, presente nos cards de produtos ou em sua página;
- Inclusão/Remoção de itens no carrinho de compras, possibilitando ao usuário escolher a quantidade desejada de cada item;
- Checkout para finalização da compra, no qual são inseridos os dados pessoais/financeiros e o endereço de entrega. Ao fim, é exibida ao usuário uma janela com o resumo do pedido, cujos dados são salvos em banco de dados que serão utilizados, futuramente, na construção de uma página de histórico de compras.

## Tecnologias
As seguintes ferramentas, tecnologias e frameworks foram utilizadas na construção desse projeto:<br>
<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/styled-components%20-%2320232a.svg?&style=for-the-badge&color=b8679e&logo=styled-components&logoColor=%3a3a3a'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/axios%20-%2320232a.svg?&style=for-the-badge&color=informational'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/react-app%20-%2320232a.svg?&style=for-the-badge&color=60ddf9&logo=react&logoColor=%2361DAFB"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/react_route%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/react-context%20api%20-%2320232a.svg?&style=for-the-badge&logo=react"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/react-day%20js%20-%2320232a.svg?&style=for-the-badge&logo=react"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/node-node%20js%20-%2320232a.svg?&style=for-the-badge&logo=Node.js"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/node-express-%2320232a.svg?&style=for-the-badge&logo=Node.js"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/node-JOI-%2320232a.svg?&style=for-the-badge&logo=Node.js"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/node-bcrypt-%2320232a.svg?&style=for-the-badge&logo=Node.js"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/.env-%2320232a.svg?&style=for-the-badge&logo=.ENV"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/mongoDB-%2320232a.svg?&style=for-the-badge&logo=mongodb"/>
</p>

## Como rodar a aplicação:

1. Clone o repositório front-end através do endereço: https://github.com/FilipeGarroteDev/the.closet-front
2. Instale as dependências:
```bash
npm i
```
3. Rode o front-end através do comando:
```bash
npm start
```
4. Opcionalmente, a build do projeto pode ser feita através do comando:
```bash
npm run build
```
5. Clone o repositório back-end através do endereço: https://github.com/FilipeGarroteDev/the.closet-back
6. Instale as dependências:
```bash
npm i
```
7. Adicionae, no arquivo .env, na raiz do projeto, a seguinte linha:
```bash
PORT = [PORTA DE SUA PREFERÊNCIA]
```
8. Rode o back-end através do comando:
```bash
node src/index.js
```
9. Finalmente, acesse http://localhost:3000 no seu browser favorito (a não ser que seja o Internet Explorer. Nesse caso, você precisa rever suas decisões)
