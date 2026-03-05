// Arquivo: assets/js/estoque.js
import carros from "./carros.js";

document.addEventListener("DOMContentLoaded", () => {
  // menu mobile (se existir)
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (btn && menu) btn.addEventListener("click", () => menu.classList.toggle("hidden"));

  const grid = document.getElementById("estoque-grid");
  if (!grid) {
    console.error('[estoque.js] Não achei o elemento #estoque-grid no pages/estoque.html');
    return;
  }

  // (opcional) filtros — só usa se existirem no HTML
  const elBusca = document.getElementById("filtro-busca");
  const elMarca = document.getElementById("filtro-marca");
  const elCambio = document.getElementById("filtro-cambio");
  const elOrdem = document.getElementById("filtro-ordem");
  const btnLimpar = document.getElementById("btn-limpar");
  const countEl = document.getElementById("resultado-count");

  function render(list) {
    grid.innerHTML = "";

    if (countEl) countEl.textContent = `${list.length} veículo(s)`;

    if (!list.length) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-20">
          <p class="text-zinc-300 text-xl font-semibold">Nenhum veículo encontrado</p>
          <p class="text-zinc-500 mt-2">Tente ajustar os filtros.</p>
        </div>
      `;
      return;
    }

    list.forEach((carro) => {
      const img = (carro.imagens && carro.imagens.length)
        ? carro.imagens[0]
        : "https://via.placeholder.com/800x800?text=Sem+Imagem";

      const a = document.createElement("a");
      a.href = `../carro.html?id=${encodeURIComponent(carro.id)}`;
      a.className = "block group";

      a.innerHTML = `
        <div class="rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-primary transition">
          <div class="aspect-square overflow-hidden">
            <img
              src="${img}"
              class="w-full h-full object-cover object-[center_40%] transition duration-500 group-hover:scale-110"
              alt="${carro.marca || ""} ${carro.modelo || ""}"
              loading="lazy"
            >
          </div>

          <div class="h-[2px] bg-primary"></div>

          <div class="bg-zinc-900 py-4 px-4 text-center">
            <h3 class="font-semibold text-lg">
              ${carro.marca || ""} ${carro.modelo || ""}
            </h3>
          </div>
        </div>
      `;

      grid.appendChild(a);
    });
  }

  function getFiltered() {
    let list = [...carros];

    const busca = (elBusca?.value || "").trim().toLowerCase();
    const marca = elMarca?.value || "";
    const cambio = elCambio?.value || "";

    if (busca) {
      list = list.filter(c =>
        `${c.marca} ${c.modelo} ${c.versao} ${c.ano}`.toLowerCase().includes(busca)
      );
    }
    if (marca) list = list.filter(c => c.marca === marca);
    if (cambio) list = list.filter(c => c.cambio === cambio);

    // ordem (bem simples)
    const ordem = elOrdem?.value || "";
    if (ordem === "preco_asc") {
      list.sort((a, b) => parsePreco(a.preco) - parsePreco(b.preco));
    } else if (ordem === "preco_desc") {
      list.sort((a, b) => parsePreco(b.preco) - parsePreco(a.preco));
    }

    return list;
  }

  function parsePreco(preco) {
    if (!preco) return 0;
    return Number(preco.replace("R$", "").replace(/\./g, "").replace(",", ".").trim()) || 0;
  }

  function update() {
    render(getFiltered());
  }

  // eventos dos filtros (só liga se existirem)
  [elBusca, elMarca, elCambio, elOrdem].forEach((el) => {
    if (!el) return;
    el.addEventListener("input", update);
    el.addEventListener("change", update);
  });

  if (btnLimpar) {
    btnLimpar.addEventListener("click", () => {
      if (elBusca) elBusca.value = "";
      if (elMarca) elMarca.value = "";
      if (elCambio) elCambio.value = "";
      if (elOrdem) elOrdem.value = "";
      update();
    });
  }

  update();
});