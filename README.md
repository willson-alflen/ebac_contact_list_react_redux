# Exercício: Lista de Contatos - React + Redux

![contact-list](https://github.com/willson-alflen/ebac_tech_talks/assets/87523872/d0778789-2d45-40b4-b440-278da17e253a)

## Requisitos da atividade

1) Criar uma lista de contatos utilizando o React.
2) Usar o Redux para gestão dos dados.
3) Utilizar o Styled-Components para estilização.
4) Os contatos deverão conter as informações: nome completo, e-mail e telefone;
5) Incluir as funcionalidades: adição, remoção e edição dos itens da lista de contatos.

## O que eu fiz além dos requisitos
1) Utilizei a biblioteca `react-input-mask` para aplicar uma máscara aos campos do formulário;
2) Acrescentei um input que usa uma FileReader API para ler arquivos de imagem e convertê-los em URL - assim o usuário pode fazer o upload de fotos dos seus contatos;
3) Criei inputs específicos para buscar contatos pelo nome e para reorganizar a lista de A-Z ou de Z-A;
4) Utilizei o Local Storage do navegador para armazenar a lista de contatos e desta forma persistir os dados;
5) Adaptei o layout de forma responsiva para que o mesmo se adapte em diferentes tamanhos de telas;

## O que poderia ser melhorado
1) O componente ContactList é, atualmente, responsável por uma série de tarefas (gerenciamento de estado, submissão do formulário, leitura de arquivos e renderização da interface. Seria interessante criar novos componentes que pudessem lidar melhor com cada parte do código, separando as tarefas e assim também melhorar o tratamento de erros;
2) Itens para acessibilidade poderiam ser acrescentados de uma forma que os leitores de tela tivessem uma descrição melhor dos elementos da tela e a navegação pelo app fosse aprimorada;
3) Testes de código poderiam ser adicionados, garantindo assim que o código seja sempre executado de forma apropriada.

## Orientações
### Para clonar o projeto
`https://github.com/willson-alflen/ebac_contact_list_react_redux.git` ou <br />
`git@github.com:willson-alflen/ebac_contact_list_react_redux.git`

### Para instalar as dependências
`npm install` ou `yarn install`

### Para executar a aplicação em localhost
`npm run dev` ou `yarn dev`

### Para visualizar o projeto online
 [https://contact-list-react-redux.vercel.app/](https://contact-list-react-redux.vercel.app/)
