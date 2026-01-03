document.addEventListener('DOMContentLoaded', () => {
  console.log('Scripts carregados com sucesso');

  initMenu();
  initFormulario();
  initFAQ();
  initHeroSlider();
  initDepoimentos();
  initSearch();
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

/* ================= HERO SLIDER (VERSÃO ATUALIZADA COM BULLETS E FADE) ================= */
function initHeroSlider() {
    const heroImage = document.getElementById('heroImage');
    const indicatorsContainer = document.getElementById('heroIndicators');
    if (!heroImage) return;

    const hoje = new Date();
    const dia = hoje.getDate();
    const mes = hoje.getMonth() + 1;

    const imagens = {
        natal: ['img/natal-1.jpg', 'img/natal-2.jpg'],
        anoNovo: ['img/ano-novo/feliz-ano-novo-1.webp', 'img/ano-novo/feliz-ano-novo-2.webp', 'img/ano-novo/feliz-ano-novo-3.webp'],
        dogs: ['img/dia-do-cao/dia-do-cao-1.webp'],
        gatos: ['img/dia-do-gato/dia-do-gato-1.webp', 'img/dia-do-gato/dia-do-gato-2.webp'],
        promocoes: [
            "img/promocoes/promocoes-1.webp", "img/promocoes/promocoes-2.webp",
            "img/promocoes/promocoes-3.webp", "img/promocoes/promocoes-4.webp",
            "img/promocoes/promocoes-5.webp", "img/promocoes/promocoes-6.webp",
            "img/promocoes/promocoes-7.webp", "img/promocoes/promocoes-8.webp",
            "img/pet_hero.webp"
        ]
    };

    let listaAtual = null;
    if (mes === 12 && dia >= 20 && dia <= 25) listaAtual = imagens.natal;
    else if ((mes === 12 && dia >= 26) || (mes === 1 && dia <= 3)) listaAtual = imagens.anoNovo;
    else if ((mes === 4 && dia === 27) || (mes === 7 && dia === 27)) listaAtual = imagens.dogs;
    else if (mes === 8 && dia === 8) listaAtual = imagens.gatos;

    if (!listaAtual) listaAtual = imagens.promocoes;

    let index = 0;

    // 1. Criar os bullets (pontinhos) se o container existir no HTML
    if (indicatorsContainer) {
        indicatorsContainer.innerHTML = "";
        listaAtual.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('indicator');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => mudarImagem(i));
            indicatorsContainer.appendChild(dot);
        });
    }

    // 2. Função principal de troca com efeito fade
    function mudarImagem(novoIndex) {
        if (novoIndex === index) return;
        
        // Inicia o fade out (precisa do CSS que te enviei antes)
        heroImage.classList.add('fade-out');

        setTimeout(() => {
            index = novoIndex;
            heroImage.src = listaAtual[index];

            // Só volta a aparecer quando a nova imagem carregar
            heroImage.onload = () => {
                heroImage.classList.remove('fade-out');
                
                // Atualiza bullets
                if (indicatorsContainer) {
                    const dots = document.querySelectorAll('.indicator');
                    dots.forEach(d => d.classList.remove('active'));
                    if (dots[index]) dots[index].classList.add('active');
                }
            };
        }, 800); // Tempo de espera para a imagem sumir
    }

    // 3. Configuração inicial
    heroImage.src = listaAtual[0];

    // 4. Giro automático
    if (listaAtual.length > 1) {
        setInterval(() => {
            let proximo = (index + 1) % listaAtual.length;
            mudarImagem(proximo);
        }, 8000);
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

function initSearch() {
    const openBtn = document.getElementById("openSearch");
    const closeBtn = document.getElementById("closeSearch");
    const modal = document.getElementById("searchModal");
    const input = document.getElementById("searchInput");
    const results = document.getElementById("searchResults");

    if (!openBtn || !modal) return;

    // Abrir modal
    openBtn.onclick = (e) => {
        e.preventDefault();
        modal.style.display = "flex";
        input.focus();
    };

    // Fechar modal
    const fechar = () => {
        modal.style.display = "none";
        input.value = "";
        results.innerHTML = "";
    };

    closeBtn.onclick = fechar;
    
    // Fechar ao clicar fora do modal
    window.onclick = (e) => {
        if (e.target === modal) fechar();
    };

    const pages = [
        { url: "index.html", name: "Página Inicial" },
        { url: "servicos.html", name: "Nossos Serviços" },
        { url: "faq.html", name: "Dúvidas Frequentes" },
        { url: "sobre.html", name: "Sobre a Simone" }
    ];

	input.addEventListener("input", async () => {
		const query = input.value.toLowerCase();
		results.innerHTML = "";

		if (query.length < 3) return;

		// Criamos um conjunto (Set) para armazenar apenas URLs únicas
		const paginasEncontradas = new Set();

		for (const page of pages) {
			try {
				const res = await fetch(page.url);
				const html = await res.text();
				const temp = document.createElement("div");
				temp.innerHTML = html;

				// OTIMIZAÇÃO: Removemos header e footer da busca para evitar duplicados
				const header = temp.querySelector('header');
				const footer = temp.querySelector('footer');
				if (header) header.remove();
				if (footer) footer.remove();

				const text = temp.innerText.toLowerCase();

				// Verificamos se a palavra existe E se a página já não foi adicionada
				if (text.includes(query) && !paginasEncontradas.has(page.url)) {
					paginasEncontradas.add(page.url); // Marca como encontrada

					const li = document.createElement("li");
					li.className = "search-result-item";
					li.innerHTML = `
						<div class="result-link">
							🔎 <strong>${page.name}</strong><br>
							<small>Palavra encontrada no conteúdo</small>
						</div>
					`;

					li.onclick = () => {
						fechar();
						window.location.href = page.url;
					};
					results.appendChild(li);
				}
			} catch (err) {
				console.warn("Erro ao buscar em:", page.url);
			}
		}

		if (results.children.length === 0) {
			results.innerHTML = `<li class="no-results">Nenhum resultado encontrado para "${query}"</li>`;
		}
	});
}

// Inicializa a busca
//document.addEventListener("DOMContentLoaded", initSearch);