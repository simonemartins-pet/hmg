document.addEventListener('DOMContentLoaded', function() {
    console.log("Scripts carregados com sucesso!");

    // --- LÓGICA DO MENU ---
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    if (menuToggle && menu) {
        menuToggle.onclick = () => menu.classList.toggle('show');
    }

    // --- FAQ ---
    if (document.getElementById('faq-content-container')) {
        initFAQ();
    }

    // --- FORMULÁRIO ---
    const form = document.getElementById('form-contato');
    if (form) {
        window.enviarWhatsApp = function() {
            const nome = document.getElementById('nome').value;
            const telefone = document.getElementById('telefone').value;
            const bairro = document.getElementById('bairro').value;
            const servico = document.getElementById('servico').value;
            const mensagem = document.getElementById('mensagem').value;

            if (!nome || !telefone || !bairro || !servico) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            const texto = `Olá! Gostaria de agendar um serviço:\n\n• Nome: ${nome}\n• Contato: ${telefone}\n• Bairro: ${bairro}\n• Serviço: ${servico}\n• Detalhes: ${mensagem}`;
            window.open(`https://wa.me/5521972045256?text=${encodeURIComponent(texto)}`, '_blank');
            form.reset();
        };
    }

    // ✅ CHAMADA DA TROCA DE IMAGEM
    initHeroSlider();
});

// Função auxiliar do FAQ
function initFAQ() {
    window.carregarConteudo = function(arquivo, elemento) {
        document.querySelectorAll('.faq-btn').forEach(btn => btn.classList.remove('active'));
        elemento.classList.add('active');

        fetch(arquivo)
            .then(res => res.text())
            .then(data => {
                document.getElementById('faq-content-container').innerHTML = data;
            });
    };
}

// --- LÓGICA DE DATAS E TROCA DE IMAGENS (Página Index) ---
function initHeroSlider() {
    const heroImage = document.getElementById('heroImage');
    if (!heroImage) return;

    const hoje = new Date();
    const dia = hoje.getDate();
    const mes = hoje.getMonth() + 1;

    const imagens = {
        padrao: ["img/pet_hero.webp"],
        natal: ["img/natal-1.jpg", "img/natal-2.jpg"],
        anoNovo: [
            "img/ano-novo/feliz-ano-novo-1.webp", 
            "img/ano-novo/feliz-ano-novo-2.webp",
            "img/ano-novo/feliz-ano-novo-3.webp"
        ],
        caos: ["img/dia-do-cao/dia-do-cao-1.webp"],
        gatos: ["img/dia-do-gato/dia-do-gato-1.webp", "img/dia-do-gato/dia-do-gato-2.webp"]
    };

    let listaAtual = imagens.padrao;

    // Lógica para Janeiro (Mês 1)
    if (mes === 12 && dia >= 20 && dia <= 25) listaAtual = imagens.natal;
    else if ((mes === 12 && dia >= 26) || (mes === 1 && dia <= 2)) listaAtual = imagens.anoNovo;
    else if ((mes === 4 && dia === 27) || (mes === 7 && dia === 27) || (mes === 8 && dia === 26)) listaAtual = imagens.caos;
    else if (mes === 8 && dia === 8) listaAtual = imagens.gatos;

    // Define a imagem inicial imediatamente
    heroImage.src = listaAtual[0];

    if (listaAtual.length > 1) {
        let index = 0;
        setInterval(() => {
            index = (index + 1) % listaAtual.length;
            heroImage.style.opacity = "0";
            setTimeout(() => {
                heroImage.src = listaAtual[index];
                heroImage.style.opacity = "1";
            }, 500);
        }, 15000);
    }
}
/* ================= FAQ – CARREGAMENTO DE ABAS ================= */
function carregarConteudoFAQ(arquivo, elemento) {
  // Atualiza estado visual dos botões
  document.querySelectorAll('.faq-btn').forEach(btn =>
    btn.classList.remove('active')
  );

  if (elemento) elemento.classList.add('active');

  // Carrega conteúdo externo
  fetch(arquivo)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo');
      }
      return response.text();
    })
    .then(data => {
      const container = document.getElementById('faq-content-container');
      if (container) {
        container.innerHTML = data;
      }
    })
    .catch(err => {
      console.error(err);
      const container = document.getElementById('faq-content-container');
      if (container) {
        container.innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
      }
    });
}

/* ================= FAQ – CARREGAMENTO AUTOMÁTICO ================= */
document.addEventListener('DOMContentLoaded', () => {
  const faqContainer = document.getElementById('faq-content-container');
  if (!faqContainer) return;

  const btnAtivo =
    document.querySelector('.faq-btn.active') ||
    document.querySelector('.faq-btn');

  if (!btnAtivo) return;

  const arquivo = btnAtivo.dataset.arquivo;
  if (!arquivo) return;

  carregarConteudoFAQ(arquivo, btnAtivo);
});



/* ================= DEPOIMENTOS ================= */
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('depoimentos-container');
  if (!container) return;

  fetch('partials/depoimentos.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar depoimentos');
      }
      return response.text();
    })
    .then(html => {
      container.innerHTML = html;
      iniciarCarrosselDepoimentos();
    })
    .catch(err => {
      console.error(err);
      container.innerHTML =
        '<p style="text-align:center;color:#999">Depoimentos indisponíveis no momento.</p>';
    });
});

function iniciarCarrosselDepoimentos() {
  const depoimentos = document.querySelectorAll('.depoimento');
  if (!depoimentos.length) return;

  let index = 0;

  setInterval(() => {
    depoimentos[index].classList.remove('ativo');
    index = (index + 1) % depoimentos.length;
    depoimentos[index].classList.add('ativo');
  }, 7000);
  let startX = 0;

const wrapper = document.querySelector('.depoimentos-wrapper');
if (!wrapper) return;

wrapper.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

wrapper.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) < 50) return;

  depoimentos[index].classList.remove('ativo');

  if (diff > 0) {
    index = (index + 1) % depoimentos.length;
  } else {
    index = (index - 1 + depoimentos.length) % depoimentos.length;
  }

  depoimentos[index].classList.add('ativo');
});

}

