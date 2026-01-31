📱 Feedly — Social Feed Experience

O **Feedly** é uma aplicação de feed social moderna desenvolvida com **React** e **TypeScript**.  
O projeto simula funcionalidades centrais de uma rede social real, com foco em **UI/UX**, **gestão de estado** e **boas práticas de front-end**.

---

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido com o objetivo de consolidar conhecimentos em **React**, **TypeScript**, **gerenciamento de estado**, **componentização** e **persistência de dados**, simulando um cenário próximo ao de aplicações utilizadas em produção.

---

## 🧠 Nota Técnica

Este projeto foi originalmente desenvolvido em **JavaScript** e posteriormente **migrado para TypeScript**, visando:

- Maior segurança de tipos
- Código mais previsível e legível
- Facilidade de manutenção e escalabilidade
- Melhor experiência de desenvolvimento (DX)

---

## 🚀 Funcionalidades

- **CRUD Completo**  
  Criação, leitura, edição e exclusão de postagens.

- **Edição Avançada**  
  Suporte a atalhos de teclado:
  - `Enter` para salvar
  - `Esc` para cancelar a edição

- **Gestão de Estado Inteligente**  
  Sistema de **Like / Dislike** com lógica que:
  - Impede votos duplicados
  - Permite alternar entre like e dislike corretamente

- **Persistência de Dados**  
  As postagens são salvas no **localStorage**, garantindo que os dados não sejam perdidos ao recarregar a página.

- **Busca Dinâmica**  
  Painel de pesquisa que filtra os posts em **tempo real**.

- **Interface Moderna (Theming)**  
  Suporte completo a **Dark Mode**, **Light Mode** e **System Mode** utilizando o padrão **Shadcn UI**.

- **Organização Modular**  
  Arquitetura de pastas organizada por responsabilidade:
  - `navigation`: Componentes de busca e menus
  - `post`: Lógica e exibição de postagens
  - `layout`: Elementos estruturais (Sidebar, Footer)
  - `theme`: Provedor de tema e estilos globais

- **Layout Responsivo**  
  - Sidebar retrátil no desktop  
  - Navegação fixada para dispositivos móveis

---

## 🛠️ Tecnologias Utilizadas

- **React** (Vite)
- **TypeScript**
- **Tailwind CSS**
- **Shadcn UI** (Gerenciamento de Tema)
- **Lucide React** (Ícones)

---

## 📌 Observações

Este projeto não utiliza API externa até o momento.  
Toda a lógica é feita no front-end, focando na manipulação de **estado, interações complexas e organização de código**.

---

## 🔮 Possíveis Melhorias Futuras

- Integração com API REST
- Autenticação de usuários
- Paginação de posts

---
