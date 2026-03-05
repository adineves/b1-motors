// Arquivo: assets/js/carros-detalhes.js
import carros from "./carros.js";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = (params.get("id") || params.get("carro") || "").trim();

  const container = document.getElementById("carro-detalhe");
  if (!container) {
    console.error('Elemento #carro-detalhe não existe no carro.html');
    return;
  }

  const carro = carros.find((c) => c.id === id);

  if (!carro) {
    container.innerHTML = `
      <div class="text-center py-32">
        <h1 class="text-3xl font-bold">Veículo não encontrado</h1>
        <p class="text-zinc-400 mt-3">
          ID recebido: <span class="text-zinc-200">${id || "(vazio)"}</span>
        </p>
      </div>
    `;
    console.warn("ID não encontrado:", id, "IDs disponíveis:", carros.map(c => c.id));
    return;
  }

  // Title dinâmico
  document.title = `${carro.marca} ${carro.modelo} ${carro.versao} | B1 Motors`;

  // Imagens (fallback)
  const imagens =
    Array.isArray(carro.imagens) && carro.imagens.length
      ? carro.imagens
      : ["https://via.placeholder.com/1200x800?text=Sem+Imagem"];

  // HTML da galeria (foto grande + miniaturas)
  const galeriaHTML = `
    <div class="relative overflow-hidden mb-5 rounded-2xl bg-zinc-950 border border-zinc-800">
      <div class="relative overflow-hidden">
        <div id="carousel-track" class="flex transition-transform duration-500 ease-in-out">
          ${imagens
            .map(
              (src) => `
              <div class="min-w-full">
                <img src="${src}" class="w-full h-[420px] md:h-[650px] object-cover object-[center_100%]" alt="">
              </div>
            `
            )
            .join("")}
        </div>

        <!-- overlay com nome + preço (fixo) -->
        <div class="absolute bottom-0 left-0 w-full bg-black/55 backdrop-blur-sm px-6 py-4 flex justify-between items-center">
          <span class="text-lg md:text-xl font-semibold text-white">
            ${carro.marca} ${carro.modelo} ${carro.versao}
          </span>
          <span class="text-xl md:text-2xl font-bold text-primary">
            ${carro.preco}
          </span>
        </div>

        <!-- botões -->
        <button id="gal-prev"
          class="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 text-white p-3 rounded-full hover:bg-black transition">
          &#10094;
        </button>
        <button id="gal-next"
          class="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 text-white p-3 rounded-full hover:bg-black transition">
          &#10095;
        </button>
      </div>
    </div>

    <!-- miniaturas -->
    <div class="flex gap-3 overflow-x-auto pb-2">
      ${imagens
        .map(
          (src, i) => `
          <button type="button"
            class="thumb flex-shrink-0 rounded-xl overflow-hidden border border-zinc-800 hover:border-primary transition"
            data-index="${i}">
            <img src="${src}" class="w-28 h-20 object-cover object-center" alt="">
          </button>
        `
        )
        .join("")}
    </div>
  `;

  // Render da página
  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-6 py-16">

      <!-- GALERIA -->
      ${galeriaHTML}

      <!-- INFO PRINCIPAL (3 colunas / 2 linhas) -->
      <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-10">
        <div>
          <p class="text-zinc-400 text-sm">Marca</p>
          <p class="font-semibold">${carro.marca}</p>
        </div>
        <div>
          <p class="text-zinc-400 text-sm">Modelo</p>
          <p class="font-semibold">${carro.modelo}</p>
        </div>
        <div>
          <p class="text-zinc-400 text-sm">Versão</p>
          <p class="font-semibold">${carro.versao}</p>
        </div>
        <div>
          <p class="text-zinc-400 text-sm">Ano/Modelo</p>
          <p class="font-semibold">${carro.ano}</p>
        </div>
        <div>
          <p class="text-zinc-400 text-sm">Cor</p>
          <p class="font-semibold">${carro.cor}</p>
        </div>
        <div>
          <p class="text-zinc-400 text-sm">KM</p>
          <p class="font-semibold">${carro.km}</p>
        </div>
      </div>

      <!-- FICHA TÉCNICA (2 colunas) -->
      <div class="bg-zinc-900 rounded-2xl p-10 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <div class="space-y-4 text-base md:text-lg">
          <h2 class="text-2xl font-bold mb-6 text-center md:text-left">FICHA TÉCNICA</h2>
          <p><span class="text-zinc-400">Motor:</span> ${carro.motor}</p>
          <p><span class="text-zinc-400">Potência:</span> ${carro.potencia}</p>
          <p><span class="text-zinc-400">Combustível:</span> ${carro.combustivel}</p>
          <p><span class="text-zinc-400">Transmissão:</span> ${carro.cambio}</p>
          <p><span class="text-zinc-400">Opcionais:</span> ${carro.opcionais}</p>
        </div>

        <div>
          <h2 class="text-2xl font-bold mb-6 text-center md:text-left">DESCRIÇÃO</h2>
          <p class="text-zinc-300 leading-relaxed">
            ${carro.descricao}
          </p>
        </div>
      </div>

      <!-- WHATSAPP (sem preço duplicado) -->
      <div class="text-center mt-12">
        <h3 class="text-2xl font-bold mb-4">Gostou? Fale conosco!</h3>
        <a
          href="https://wa.me/5511990091610?text=Olá,%20tenho%20interesse%20no%20${encodeURIComponent(
            `${carro.marca} ${carro.modelo} ${carro.versao}`
          )}"
          target="_blank"
          class="inline-block bg-primary px-10 py-4 rounded-xl text-lg font-semibold hover:bg-red-700 transition"
        >
          Fale Conosco no WhatsApp
        </a>
      </div>
    </div>
  `;

  // ===== Galeria com miniaturas =====
  const track = document.getElementById("carousel-track");
  const thumbs = Array.from(document.querySelectorAll(".thumb"));
  const prev = document.getElementById("gal-prev");
  const next = document.getElementById("gal-next");

  let current = 0;

  function updateGallery() {
    if (!track) return;
    track.style.transform = `translateX(-${current * 100}%)`;

    thumbs.forEach((btn, idx) => {
      if (idx === current) btn.classList.add("border-primary");
      else btn.classList.remove("border-primary");
    });
  }

  thumbs.forEach((btn) => {
    btn.addEventListener("click", () => {
      current = Number(btn.dataset.index);
      updateGallery();
    });
  });

  if (next) {
    next.addEventListener("click", () => {
      current = Math.min(current + 1, thumbs.length - 1);
      updateGallery();
    });
  }

  if (prev) {
    prev.addEventListener("click", () => {
      current = Math.max(current - 1, 0);
      updateGallery();
    });
  }

  window.addEventListener("resize", updateGallery);
  updateGallery();
});