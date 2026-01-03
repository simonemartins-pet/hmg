```markdown
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

## 🧭 Navegação
- Início → `/index.html`
- Serviços → `/servicos.html`
- FAQ → `/faq.html`
- Sobre → `/sobre.html`
- Agendar → `/#agendamento`
- WhatsApp → `https://wa.me/5521972045256`

---

## 📂 Seções Principais
- **Hero Section** com imagem dinâmica (`pet_hero.webp`)
- **Quem Sou** (apresentação da Simone)
- **Serviços** detalhados com links diretos para agendamento
- **Por que me escolher** (diferenciais)
- **Formulário de Agendamento** integrado ao WhatsApp
- **Rodapé** com contatos e redes sociais

---

## 🧠 Script de Troca de Imagem (main3.js)
O arquivo `assets/js/main3.js` contém a lógica para **alterar automaticamente imagens do site** conforme:
- **Datas comemorativas** (ex.: Ano Novo, Dia do Gato, Dia do Cão)
- **Promoções programadas**
- **Campanhas de propaganda**

### 🔄 Funcionamento
1. O script verifica a **data atual**.
2. Se houver uma imagem correspondente na pasta temática (`ano-novo/`, `dia-do-gato/`, etc.), ela substitui a imagem padrão do **Hero Section** ou de outras áreas.
3. Caso contrário, mantém a imagem padrão (`pet_hero.webp`).
4. Também pode ser configurado para exibir **banners promocionais** da pasta `promocoes/`.

### 📌 Exemplo de uso
```javascript
// Pseudocódigo simplificado
const hoje = new Date();
if (hoje.getMonth() === 0 && hoje.getDate() === 1) {
  trocarImagem("assets/img/ano-novo/banner.webp");
} else if (hoje.getMonth() === 8 && hoje.getDate() === 4) {
  trocarImagem("assets/img/dia-do-cao/cao.webp");
} else {
  trocarImagem("assets/img/pet_hero.webp");
}
```

---

## 🎨 Elementos Visuais
- Logo: `assets/img/icone.webp`
- Imagem padrão Hero: `assets/img/pet_hero.webp`
- Imagem seção "Por que me escolher": `assets/img/why-pet.webp`
- Imagens temáticas em subpastas (`ano-novo`, `dia-do-cao`, `dia-do-gato`, `promocoes`)

---

## 🔧 Observações Técnicas
- **Integração WhatsApp:** via `wa.me`.
- **Formulário:** sem backend, redireciona para WhatsApp.
- **Estilos:** `style.css` define layout responsivo.
- **Scripts:** `main3.js` controla animações e troca dinâmica de imagens.
- **Manutenção futura:**
  - Atualizar número de WhatsApp se necessário.
  - Revisar imagens em pastas temáticas antes de cada campanha.
  - Testar responsividade e acessibilidade semestralmente.
  - Atualizar ano no rodapé.

---

## ✅ Checklist de Manutenção
- [ ] Atualizar imagens promocionais em `assets/img/promocoes/`
- [ ] Revisar datas configuradas no `main3.js`
- [ ] Testar troca automática de imagens em datas comemorativas
- [ ] Validar links e integração com WhatsApp
- [ ] Revisar direitos autorais no rodapé
```
