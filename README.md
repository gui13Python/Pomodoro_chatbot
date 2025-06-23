# 🌍 Multilingual Vocabulary Hub (English, Portuguese, Spanish)

## 📖 Visão Geral do Projeto

Bem-vindo ao **Multilingual Vocabulary Hub**! Este repositório contém uma vasta coleção de vocabulário essencial em inglês, acompanhada de suas traduções e frases de exemplo em Português (Brasil) e Espanhol. O objetivo é fornecer um recurso de fácil acesso e expansível para estudantes e entusiastas de idiomas que desejam aprimorar suas habilidades em inglês, ou que precisam de referências rápidas para Português e Espanhol.

O vocabulário está organizado de forma temática, cobrindo diversas áreas do dia a dia, tornando o aprendizado mais estruturado e contextualizado.

## ✨ Funcionalidades Principais

* **Vocabulário Temático:** Palavras e frases agrupadas por categorias relevantes (pessoas, ações, cozinha, tecnologia, saúde, etc.).
* **Traduções Triplas:** Cada termo em inglês vem com sua tradução em Português e Espanhol.
* **Frases de Exemplo:** Para cada palavra, uma frase de exemplo em inglês com suas respectivas traduções para Português e Espanhol, ajudando a entender o uso contextual.
* **Formato de Dados Estruturado:** O vocabulário é armazenado em um formato JavaScript (`.js`), o que o torna facilmente integrável em outras aplicações web, flashcards, ou ferramentas de estudo.
* **Fácil Expansão:** A estrutura do `vocabularyData` permite adicionar novas palavras e categorias de forma simples e rápida.

## 🚀 Como Usar o Vocabulário

O `vocabularyData` é um array de objetos JavaScript, onde cada objeto representa uma palavra com suas informações.

### Exemplo de Estrutura de Dados:

```javascript
const vocabularyData = [
    {
        word: "Hello",
        sentence: "Hello! How are you today?",
        portuguese: "Olá",
        spanish: "Hola",
        translation_pt: "Olá! Como você está hoje?",
        translation_es: "¡Hola! ¿Cómo estás hoy?"
    },
    // ... outros objetos de vocabulário
];
