import carros from "./carros.js";

document.addEventListener("DOMContentLoaded", () => {
  // menu mobile
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (btn && menu) btn.addEventListener("click", () => menu.classList.toggle("hidden"));

  // carrossel (destaques)
  const carrossel = document.getElementById("carrossel");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  if (!carrossel) {
    console.error("Index: não encontrei #carrossel no HTML");
    return;
  }

  // limpa e renderiza
  carrossel.innerHTML = "";

  carros.forEach((carro) => {
    // só mostra se tiver imagem (evita quebrar)
    const primeiraImg = (carro.imagens && carro.imagens.length) ? carro.imagens[0] : "";

    const cardWrap = document.createElement("div");
    cardWrap.className = "flex-shrink-0 min-w-[100%] md:min-w-[48%] lg:min-w-[31%]";

    cardWrap.innerHTML = `
      <a href="carro.html?id=${encodeURIComponent(carro.id)}" class="block">
        <div class="relative rounded-2xl overflow-hidden group cursor-pointer transition duration-500 hover:scale-[1.03]">
          <img
            src="${primeiraImg || "https://via.placeholder.com/800x600?text=Sem+Imagem"}"
            class="w-full h-72 object-cover object-center transition duration-700 group-hover:scale-110"
            alt="${carro.marca} ${carro.modelo}"
          >

          <div class="absolute bottom-0 left-0 w-full px-4 py-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm">
            <div class="flex justify-between items-center mb-2">
              <h4 class="text-lg font-semibold">${carro.marca} ${carro.modelo}</h4>
              <span class="font-bold text-red-500 group-hover:text-red-600 transition duration-300">${carro.preco}</span>
            </div>
            <div class="text-sm text-zinc-200">${carro.ano} • ${carro.km} • ${carro.cambio}</div>
          </div>
        </div>
      </a>
    `;

    carrossel.appendChild(cardWrap);
  });

  // carrossel responsivo (só se tiver botões)
  let index = 0;

  function getCardsPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function updateCarrossel() {
    const first = carrossel.firstElementChild;
    if (!first) return;
    const gap = 40; // gap-10
    const width = first.offsetWidth + gap;
    carrossel.style.transform = `translateX(-${index * width}px)`;
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const cardsPerView = getCardsPerView();
      const maxIndex = Math.max(0, carros.length - cardsPerView);
      index = Math.min(index + 1, maxIndex);
      updateCarrossel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      index = Math.max(index - 1, 0);
      updateCarrossel();
    });
  }

  window.addEventListener("resize", updateCarrossel);
  updateCarrossel();
});