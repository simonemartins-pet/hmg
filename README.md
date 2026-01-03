# 🐾 Simone Martins Pet Sitter - Website

## 📌 Visão Geral
Site institucional da Simone Martins, Pet Sitter no Grajaú (RJ), oferecendo:
- Hospedagem domiciliar
- Banho em casa
- Visitas com cuidados especiais

O projeto é hospedado via **GitHub Pages** e utiliza HTML, CSS e JavaScript para entregar uma experiência simples, responsiva e integrada ao WhatsApp.

---

## 🗂️ Estrutura de Diretórios

```plaintext
├── assets
│   ├── css
│   │   └── style.css
│   ├── js
│   │   └── main3.js
│   └── img
│       ├── ano-novo/
│       ├── dia-do-cao/
│       ├── dia-do-gato/
│       ├── promocoes/
│       ├── dog-cat.webp
│       ├── icone.webp
│       ├── pet-na-sala.webp
│       ├── pet_hero.webp
│       └── why-pet.webp
├── partials
│   ├── depoimentos.html
│   ├── dicas.html
│   └── perguntas.html
├── faq.html
├── index.html
├── servicos.html
└── sobre.html
```

---

## ⚙️ Scripts Principais (`main3.js`)

O arquivo **`main3.js`** inicializa todos os recursos dinâmicos do site ao carregar a página:

### 1. **Menu Responsivo**
- Função: `initMenu()`
- Alterna a classe `.show` no menu ao clicar no botão `.menu-toggle`.

### 2. **Formulário de Agendamento**
- Função: `initFormulario()`
- Captura dados do formulário (`nome`, `telefone`, `bairro`, `servico`, `mensagem`).
- Gera mensagem formatada e abre o WhatsApp via `wa.me`.
- Reseta o formulário após envio.

### 3. **FAQ Dinâmico**
- Função: `initFAQ()`
- Carrega conteúdo de arquivos HTML em `/partials/` (ex.: `perguntas.html`).
- Alterna botões ativos e atualiza container `#faq-content-container`.

### 4. **Hero Slider com Troca Automática**
- Função: `initHeroSlider()`
- Exibe imagens diferentes conforme **data comemorativa ou promoção**:
  - **Natal:** 20 a 25 de dezembro
  - **Ano Novo:** 26 de dezembro a 1º de janeiro
  - **Dia do Cão:** 27 de abril e 27 de julho
  - **Dia do Gato:** 8 de agosto
  - **Promoções:** imagens padrão e campanhas
- Recursos adicionais:
  - Bullets de navegação (`#heroIndicators`)
  - Efeito **fade** na troca de imagens
  - Giro automático a cada 8 segundos

### 5. **Depoimentos**
- Função: `initDepoimentos()`
- Carrega `partials/depoimentos.html`.
- Inicia carrossel automático com rotação a cada 7 segundos.
- Suporte a **gestos de swipe** em dispositivos móveis.

### 6. **Busca Interna**
- Função: `initSearch()`
- Abre modal de busca (`#searchModal`).
- Pesquisa em páginas locais (`index.html`, `servicos.html`, `faq.html`, `sobre.html`).
- Remove header/footer para evitar duplicados.
- Exibe resultados com link direto para a página encontrada.

---

## 🔄 Guia Rápido: Adicionar Novas Campanhas ao Hero Slider

1. **Adicionar imagens** na pasta correspondente:
   - `assets/img/promocoes/` → campanhas promocionais
   - `assets/img/ano-novo/` → Ano Novo
   - `assets/img/dia-do-cao/` → Dia do Cão
   - `assets/img/dia-do-gato/` → Dia do Gato
   - `assets/img/natal/` → Natal

2. **Editar o objeto `imagens` em `main3.js`:**
   ```javascript
   const imagens = {
     natal: ['img/natal/natal-1.webp', 'img/natal/natal-2.webp'],
     anoNovo: ['img/ano-novo/feliz-ano-novo-1.webp'],
     dogs: ['img/dia-do-cao/dia-do-cao-1.webp'],
     gatos: ['img/dia-do-gato/dia-do-gato-1.webp'],
     promocoes: ['img/promocoes/promocoes-1.webp', 'img/promocoes/promocoes-2.webp']
   };
   ```

3. **Configurar a data no bloco condicional:**
   ```javascript
   if (mes === 12 && dia >= 20 && dia <= 25) listaAtual = imagens.natal;
   else if ((mes === 12 && dia >= 26) || (mes === 1 && dia <= 1)) listaAtual = imagens.anoNovo;
   else if (mes === 4 && dia === 27) listaAtual = imagens.dogs;
   else if (mes === 8 && dia === 8) listaAtual = imagens.gatos;
   else listaAtual = imagens.promocoes;
   ```

4. **Testar em ambiente local** antes de publicar no GitHub Pages.

---

## 🔧 Observações Técnicas
- **Integração WhatsApp:** via `wa.me`.
- **Formulário:** sem backend, apenas redireciona para WhatsApp.
- **Estilos:** `style.css` define layout responsivo e efeitos de transição.
- **Scripts:** `main3.js` controla menu, formulário, FAQ, slider, depoimentos e busca.
- **Manutenção futura:**
  - Atualizar número de WhatsApp se necessário.
  - Revisar imagens em pastas temáticas antes de cada campanha.
  - Testar responsividade e acessibilidade semestralmente.
  - Atualizar ano no rodapé.
