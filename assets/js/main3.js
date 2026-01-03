document.addEventListener('DOMContentLoaded', () => {
  console.log('Scripts carregados com sucesso');

  initMenu();
  initFormulario();
  initFAQ();
  initHeroSlider();
  initDepoimentos();
});

/* ================= MENU ================= */
function initMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('show');
    });
  }
}

/* ================= FORMULÁRIO ================= */
function initFormulario() {
  const form = document.getElementById('form-contato');
  if (!form) return;

  window.enviarWhatsApp = function () {
    const nome = form.querySelector('#nome').value;
    const telefone = form.querySelector('#telefone').value;
    const bairro = form.querySelector('#bairro').value;
    const servico = form.querySelector('#servico').value;
    const mensagem = form.querySelector('#mensagem').value;

    if (!nome || !telefone || !bairro || !servico) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const texto = `Olá! Gostaria de agendar um serviço:\n\n• Nome: ${nome}\n• Contato: ${telefone}\n• Bairro: ${bairro}\n• Serviço: ${servico}\n• Detalhes: ${mensagem}`;

    window.open(
      `https://wa.me/5521972045256?text=${encodeURIComponent(texto)}`,
      '_blank'
    );

    form.reset();
  };
}

/* ================= FAQ ================= */
function initFAQ() {
  const container = document.getElementById('faq-content-container');
  if (!container) return;

  window.carregarConteudoFAQ = function (arquivo, botao) {
    document.querySelectorAll('.faq-btn').forEach(btn =>
      btn.classList.remove('active')
    );

    if (botao) botao.classList.add('active');

    fetch(arquivo)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao carregar FAQ');
        return res.text();
      })
      .then(html => {
        container.innerHTML = html;
      })
      .catch(() => {
        container.innerHTML =
          '<p style="text-align:center;"></p>';
      });
  };

  const btnInicial =
    document.querySelector('.faq-btn.active') ||
    document.querySelector('.faq-btn');

  if (btnInicial) {
    carregarConteudoFAQ(btnInicial.dataset.arquivo, btnInicial);
  }
}

/* ================= HERO SLIDER ================= */
function initHeroSlider() {
  const hero = document.getElementById('heroImage');
  if (!hero) return;

  const hoje = new Date();
  const dia = hoje.getDate();
  const mes = hoje.getMonth() + 1;

  const imagens = {
    padrao: ['img/pet_hero.webp'],
    natal: ['img/natal-1.jpg', 'img/natal-2.jpg'],
    anoNovo: [
      'img/ano-novo/feliz-ano-novo-1.webp',
      'img/ano-novo/feliz-ano-novo-2.webp',
      'img/ano-novo/feliz-ano-novo-3.webp'
    ],
    caos: ['img/dia-do-cao/dia-do-cao-1.webp'],
    gatos: [
      'img/dia-do-gato/dia-do-gato-1.webp',
      'img/dia-do-gato/dia-do-gato-2.webp'
    ]
  };

  let lista = imagens.padrao;

  if (mes === 12 && dia >= 20 && dia <= 25) lista = imagens.natal;
  else if ((mes === 12 && dia >= 26) || (mes === 1 && dia <= 2))
    lista = imagens.anoNovo;
  else if (
    (mes === 4 && dia === 27) ||
    (mes === 7 && dia === 27) ||
    (mes === 8 && dia === 26)
  )
    lista = imagens.caos;
  else if (mes === 8 && dia === 8) lista = imagens.gatos;

  hero.src = lista[0];

  if (lista.length > 1) {
    let index = 0;
    setInterval(() => {
      hero.style.opacity = 0;
      index = (index + 1) % lista.length;
      setTimeout(() => {
        hero.src = lista[index];
        hero.style.opacity = 1;
      }, 500);
    }, 15000);
  }
}

/* ================= DEPOIMENTOS ================= */
function initDepoimentos() {
  const container = document.getElementById('depoimentos-container');
  if (!container) return;

  fetch('partials/depoimentos.html')
    .then(res => {
      if (!res.ok) throw new Error();
      return res.text();
    })
    .then(html => {
      container.innerHTML = html;
      iniciarCarrosselDepoimentos();
    })
    .catch(() => {
      container.innerHTML =
        '<p style="text-align:center;color:#999;">Depoimentos indisponíveis.</p>';
    });
}

/* ================= CARROSSEL ================= */
function iniciarCarrosselDepoimentos() {
  const depoimentos = document.querySelectorAll('.depoimento');
  if (!depoimentos.length) return;

  let index = 0;
  let intervalo;

  function mostrar(novo) {
    depoimentos[index].classList.remove('ativo');
    index = novo;
    depoimentos[index].classList.add('ativo');
  }

  function auto() {
    intervalo = setInterval(() => {
      mostrar((index + 1) % depoimentos.length);
    }, 7000);
  }

  auto();

  const wrapper = document.querySelector('.depoimentos-wrapper');
  if (!wrapper) return;

  let startX = 0;

  wrapper.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    clearInterval(intervalo);
  });

  wrapper.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 50) return auto();

    mostrar(
      diff > 0
        ? (index + 1) % depoimentos.length
        : (index - 1 + depoimentos.length) % depoimentos.length
    );

    auto();
  });
}
