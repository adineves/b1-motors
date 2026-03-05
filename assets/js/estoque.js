import carros from "./carros.js";

document.addEventListener("DOMContentLoaded", () => {
  // menu mobile (estoque está em /pages)
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (btn && menu) btn.addEventListener("click", () => menu.classList.toggle("hidden"));

  const grid = document.getElementById("estoque-grid");
  if (!grid) {
    console.error("Estoque: não encontrei #estoque-grid no HTML");
    return;
  }

  grid.innerHTML = "";

  carros.forEach((carro) => {
    const primeiraImg = (carro.imagens && carro.imagens.length) ? carro.imagens[0] : "";

    const a = document.createElement("a");
    a.href = `../carro.html?id=${encodeURIComponent(carro.id)}`;
    a.className = "block group";

    a.innerHTML = `
      <div class="rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
        <div class="aspect-square overflow-hidden">
          <img
            src="${primeiraImg || "https://via.placeholder.com/800x800?text=Sem+Imagem"}"
            class="w-full h-full object-cover object-center transition duration-500 group-hover:scale-110"
            alt="${carro.marca} ${carro.modelo}"
          >
        </div>

        <div class="h-[2px] bg-primary"></div>

        <div class="bg-zinc-900 py-4 px-4 text-center">
          <h3 class="font-semibold text-lg">${carro.marca} ${carro.modelo}</h3>
        </div>
      </div>
    `;

    grid.appendChild(a);
  });
});