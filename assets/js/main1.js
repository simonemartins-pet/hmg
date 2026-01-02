/* ==========================================================================
   SIMONE MARTINS - JAVASCRIPT CENTRALIZADO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    if (document.getElementById('form-contato')) initForm();
    if (document.getElementById('heroImage')) initHeroSlider();
    if (document.querySelector('.faq-nav')) initFAQ();
    if (document.getElementById('depoimentos-container')) initDepoimentos();
});

// --- 1. MENU HAMBÚRGUER (Todas as páginas) ---
function initMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => menu.classList.toggle('show'));
        
        // Fecha o menu ao clicar num link (Melhor experiência mobile)
        document.querySelectorAll('.menu a').forEach(link => {
            link.addEventListener('click', () => menu.classList.remove('show'));
        });
    }
}

// --- 2. ENVIO WHATSAPP COM RESET (Página Index) ---
function initForm() {
    window.enviarWhatsApp = function() {
        const form = document.getElementById('form-contato');
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const bairro = document.getElementById('bairro').value;
        const servico = document.getElementById('servico').value;
        const mensagem = document.getElementById('mensagem').value;

        if (!nome || !telefone || !bairro || !servico) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const texto = `Olá! Gostaria de agendar um serviço:\n\n` +
                      `• Nome: ${nome}\n` +
                      `• Contato: ${telefone}\n` +
                      `• Bairro: ${bairro}\n` +
                      `• Serviço: ${servico}\n` +
                      `• Detalhes: ${mensagem}`;

        window.open(`https://wa.me/5521972045256?text=${encodeURIComponent(texto)}`, '_blank');
        form.reset(); // Limpa o formulário após abrir o WhatsApp
    };
}

// --- 3. LÓGICA DE DATAS E TROCA DE IMAGENS (Página Index) ---
function initHeroSlider() {
    const heroImage = document.getElementById('heroImage');
    const hoje = new Date();
    const dia = hoje.getDate();
    const mes = hoje.getMonth() + 1;

    // Definição das listas de imagens
    const imagens = {
        padrao: ["img/pet_hero.webp"],
        natal: ["img/pet_hero.webp"],
        anoNovo: ["img/ano-novo/feliz-ano-novo-1.webp", "img/ano-novo/feliz-ano-novo-2.webp",
		"img/ano-novo/feliz-ano-novo-3.webp"],
        caos: ["img/dia-do-cao/dia-do-cao-1.webp"],
        gatos: ["img/dia-do-gato/dia-do-gato-1.webp", "img/dia-do-gato/dia-do-gato-2.webp", "img/dia-do-gato/dia-do-gato-3.webp", "img/dia-do-gato/dia-do-gato-4.webp"]
    };

    const imgCaos = ["img/especial-caes.jpg"];
    const imgGatos = ["img/especial-gatos.jpg"];
    const imgNatal = ["img/natal-1.jpg", "img/natal-2.jpg"];
    const imgAnoNovo = [

    let listaAtual = imagens.padrao;

    // Verificação de Datas Especiais
    if (mes === 12 && dia >= 20 && dia <= 25) listaAtual = imagens.natal;
    else if (mes === 12 && dia >= 26 || (mes === 1 && dia <= 2)) listaAtual = imagens.anoNovo;
    else if ((mes === 4 && dia === 27) || (mes === 7 && dia === 27) || (mes === 8 && dia === 26)) listaAtual = imagens.caos;
    else if (mes === 8 && dia === 8) listaAtual = imagens.gatos;

    let index = 0;
    if (listaAtual.length > 1) {
        setInterval(() => {
            index = (index + 1) % listaAtual.length;
            heroImage.style.opacity = "0";
            setTimeout(() => {
                heroImage.src = listaAtual[index];
                heroImage.style.opacity = "1";
            }, 500);
        }, 15000);
    } else {
        heroImage.src = listaAtual[0];
    }
}

// --- 4. FAQ DINÂMICO (Página FAQ) ---
function initFAQ() {
    window.carregarConteudo = function(arquivo, elemento) {
        document.querySelectorAll('.faq-btn').forEach(btn => btn.classList.remove('active'));
        elemento.classList.add('active');

        fetch(arquivo)
            .then(res => res.text())
            .then(data => {
                document.getElementById('faq-content-container').innerHTML = data;
            })
            .catch(() => {
                document.getElementById('faq-content-container').innerHTML = "<p>Erro ao carregar conteúdo.</p>";
            });
    };

    // Carrega a aba inicial
    const btnPadrao = document.querySelector('.faq-btn');
    if (btnPadrao) carregarConteudo('perguntas.html', btnPadrao);
}

// --- 5. CARREGAR DEPOIMENTOS (Página Index) ---
function initDepoimentos() {
    const container = document.getElementById('depoimentos-container');
    fetch('depoimentos.html')
        .then(res => res.text())
        .then(data => container.innerHTML = data)
        .catch(err => console.log("Erro ao carregar depoimentos"));
}