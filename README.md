# Portfólio Pessoal | Felipe Pina

Página de apresentação pessoal desenvolvida para a disciplina **Programação Web Frontend** (II Unidade), na **Universidade Tiradentes (UNIT)**, em Aracaju-SE, sob orientação do Prof. Josimar Santos.

O portfólio reúne informações sobre mim, os miniprojetos feitos em sala, minhas habilidades e um formulário de contato.

## Seções

- **Sobre:** foto, apresentação pessoal e objetivos.
- **Portfólio:** carrossel com os projetos desenvolvidos. Cada card abre o projeto correspondente.
- **Contato:** formulário com validação em JavaScript e envio da mensagem por e-mail.

## Projetos incluídos

| Projeto | Descrição | Conceitos praticados |
|---|---|---|
| Lista de Tarefas | Adiciona tarefas por um campo de texto e permite removê-las. | DOM, eventos, criação de elementos |
| Lâmpada | Liga e desliga a lâmpada pelo clique ou por um interruptor animado e muda o fundo da página. | Eventos de clique, funções, troca de imagem e estilo, transições CSS |
| Calculadora | Soma, subtração, multiplicação, divisão e porcentagem, com suporte a teclado. | Eventos, funções, lógica condicional, `switch`, grid CSS |

## Tecnologias

- HTML5
- CSS3 (variáveis CSS, Flexbox, Grid, media queries)
- JavaScript (DOM, eventos, `IntersectionObserver`, `fetch`)
- [Formspree](https://formspree.io) para o envio do formulário

## Funcionalidades

- Layout responsivo para celular, tablet e desktop, com menu recolhível em telas pequenas.
- Carrossel de projetos com setas de navegação.
- Animações simples em CSS e JavaScript: entrada da página, aparecer ao rolar, barra de progresso de rolagem e efeitos nos cards.
- Destaque do item de menu da seção visível.
- Formulário com validação em JavaScript:
  - Nome, e-mail e mensagem obrigatórios.
  - Nome com no mínimo 3 caracteres.
  - Formato de e-mail verificado.
  - Mensagem com no mínimo 10 caracteres.
  - Mensagens de erro e de sucesso exibidas na tela.

## Acessibilidade

- Contraste de cores adequado entre texto e fundo.
- Textos alternativos (`alt`) nas imagens.
- Link para pular direto ao conteúdo.
- Rótulos (`label`) associados aos campos e uso de atributos `aria`.
- Foco visível na navegação por teclado.
- Respeito à preferência de movimento reduzido do sistema.

## Estrutura de pastas

```
Perfil/
├── index.html
├── script.js
├── style.css
├── README.md
├── assets/
│   └── img/
│       ├── felipe.jpg
│       ├── favicon.png
│       ├── calculadora.svg
│       ├── lampada.jpg
│       └── tarefas.svg
└── projects/
    ├── calculadora/
    │   ├── index.html
    │   ├── style.css
    │   └── script.js
    ├── lampada/
    │   └── index.html
    └── lista-de-tarefas/
        └── index.html
```

## Como executar

1. Baixe ou clone o repositório.
2. Abra o arquivo `index.html` em qualquer navegador.

Para um teste mais fiel, use a extensão **Live Server** do VS Code.

## Autor

**Felipe Pina**
Estudante de Análise e Desenvolvimento de Sistemas | Universidade Tiradentes (UNIT), Aracaju-SE.
