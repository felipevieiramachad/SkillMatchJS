````md id="pmkv5o"
# SkillMatch JS

Simulador de Compatibilidade para vagas Front-end Júnior desenvolvido com HTML, CSS e JavaScript.

O projeto compara as habilidades de uma pessoa candidata com os requisitos de vagas fictícias, calculando o percentual de compatibilidade, exibindo habilidades faltantes e sugerindo recomendações de estudo.

---

# Objetivo

O objetivo do projeto é simular um sistema simples de análise de compatibilidade entre candidatos e vagas de tecnologia, aproximando o funcionamento de plataformas reais de recrutamento.

---

# Funcionalidades

- Cadastro de candidato
- Listagem de vagas fictícias
- Comparação de habilidades
- Cálculo de compatibilidade
- Classificação das vagas
- Identificação da melhor vaga
- Recomendação de estudos
- Sistema de candidatura
- Simulação de carregamento via Promise
- Uso de Async/Await
- Interface responsiva simples

---

# Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript ES6+

---

# Conceitos de JavaScript Utilizados

## Programação Orientada a Objetos

- Classes
- Herança
- Uso de this

## Métodos de Array

- map()
- filter()
- reduce()

## Programação Assíncrona

- Promise
- async/await

## Outros Conceitos

- Callback
- Closure
- Manipulação de DOM
- Eventos
- Estruturas de decisão

---

# Estrutura do Projeto

```bash
skillmatch-js/
│
├── index.html
├── style.css
└── script.js
````

---

# Funcionalidades do Sistema

## Compatibilidade de Vagas

O sistema compara:

* habilidades do candidato;
* requisitos da vaga;
* percentual de aderência.

---

## Classificação

As vagas são classificadas em:

* Alta compatibilidade
* Média compatibilidade
* Baixa compatibilidade

---

## Sistema de Candidatura

Cada vaga possui um botão:

```txt
Candidatar-se
```

Ao clicar:

* a candidatura é enviada;
* o botão é desativado;
* uma mensagem de sucesso é exibida.

---

# Exemplo de Compatibilidade

```txt
Empresa: WebHub
Compatibilidade: 75%
Habilidades faltantes: React
Recomendação: Estude React
```

---

# Melhorias Futuras

* Integração com banco de dados
* Login de usuário
* Cadastro dinâmico de vagas
* Sistema de autenticação
* API externa
* Dashboard administrativo

---

# Autor

Felipe Machado

Projeto acadêmico desenvolvido para prática de JavaScript Front-end.

# 📌 Kanban do Projeto

<table>
<tr>
<td valign="top" width="25%">

## 🧠 Backlog

- Dark Mode
- API real de vagas
- Dashboard
- Sistema de login
- Banco de dados
- Deploy online
- Histórico de candidaturas
- Chat com recrutador

</td>

<td valign="top" width="25%">

## 📋 A Fazer

- Melhorar responsividade
- Barra de progresso
- Melhorar CSS
- Adicionar animações
- Criar versão mobile
- Melhorar acessibilidade
- Loading animado
- Feedback visual

</td>

<td valign="top" width="25%">

## 🚧 Em Desenvolvimento

- Ajustes finais da interface
- Melhorias de UX
- Refatoração do JavaScript

</td>

<td valign="top" width="25%">

## ✅ Concluído

- Estrutura HTML
- Estilização CSS
- Cadastro do candidato
- Criação das vagas
- Compatibilidade
- Classificação das vagas
- Recomendação de estudos
- Sistema de candidatura
- Promise
- Async/Await
- Callback
- Closure
- Classes e Herança
- Manipulação de DOM

</td>
</tr>
</table>
