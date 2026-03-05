import carros from "./carros.js";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  // aceita ?id=creta OU ?carro=creta (pra nunca quebrar)
  const id = (params.get("id") || params.get("carro") || "").trim();

  const container = document.getElementById("carro-detalhe");
  if (!container) {
    console.error('Elemento #carro-detalhe não existe no carro.html');
    return;
  }

  const carro = carros.find((c) => c.id === id);

  // Se não achou, mostra msg e PARA AQUI (não tenta acessar carro.marca)
  if (!carro) {
    container.innerHTML = `
      <div class="text-center py-32">
        <h1 class="text-3xl font-bold">Veículo não encontrado</h1>
        <p class="text-zinc-400 mt-3">ID recebido: <span class="text-zinc-200">${id || "(vazio)"}</span></p>
      </div>
    `;
    console.warn("ID não encontrado:", id, "IDs disponíveis:", carros.map(c => c.id));
    return;
  }

  // Title dinâmico (agora só roda se carro existe)
  document.title = `${carro.marca} ${carro.modelo} ${carro.versao} | B1 Motors`;

  // HTML do carrossel
  const imagensHTML = (carro.imagens || []).map((img) => `
    <div class="min-w-full">
      <img src="${img}" class="w-full h-[520px] object-cover object-center rounded-2xl">
    </div>
  `).join("");

  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-6 py-16">

      <h1 class="text-4xl font-bold mb-10 text-center">
        ${carro.marca} ${carro.modelo} ${carro.versao}
      </h1>

      <div class="overflow-hidden mb-12 rounded-2xl">
        <div id="carrossel" class="flex transition-transform duration-500">
          ${imagensHTML}
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-6 text-center mb-14 text-lg">
        <div><p class="text-zinc-400">Marca</p><p class="font-semibold">${carro.marca}</p></div>
        <div><p class="text-zinc-400">Modelo</p><p class="font-semibold">${carro.modelo}</p></div>
        <div><p class="text-zinc-400">Versão</p><p class="font-semibold">${carro.versao}</p></div>
        <div><p class="text-zinc-400">Ano / Modelo</p><p class="font-semibold">${carro.ano}</p></div>
        <div><p class="text-zinc-400">Cor</p><p class="font-semibold">${carro.cor}</p></div>
        <div><p class="text-zinc-400">KM</p><p class="font-semibold">${carro.km}</p></div>
      </div>

      <div class="bg-zinc-900 rounded-2xl p-10 grid md:grid-cols-2 gap-10">
        <div class="space-y-4 text-lg">
          <h2 class="text-2xl font-bold mb-6">Ficha Técnica</h2>
          <p><span class="text-zinc-400">Motor:</span> ${carro.motor}</p>
          <p><span class="text-zinc-400">Potência:</span> ${carro.potencia}</p>
          <p><span class="text-zinc-400">Combustível:</span> ${carro.combustivel}</p>
          <p><span class="text-zinc-400">Transmissão:</span> ${carro.cambio}</p>
          <p><span class="text-zinc-400">Opcionais:</span> ${carro.opcionais}</p>
        </div>

        <div>
          <h2 class="text-2xl font-bold mb-6">Descrição</h2>
          <p class="text-zinc-300 leading-relaxed">${carro.descricao}</p>
        </div>
      </div>

      <div class="text-center mt-14">
        <p class="text-3xl font-bold text-primary mb-6">${carro.preco}</p>
        <a
          href="https://wa.me/5511999999999?text=Olá,%20tenho%20interesse%20no%20${encodeURIComponent(carro.marca + " " + carro.modelo)}"
          target="_blank"
          class="inline-block bg-primary px-10 py-4 rounded-xl text-lg font-semibold hover:bg-red-700 transition"
        >
          Fale Conosco no WhatsApp
        </a>
      </div>

    </div>
  `;

  // carrossel automático
  const track = document.getElementById("carrossel");
  let index = 0;

  function trocarSlide() {
    index = (index + 1) % (carro.imagens?.length || 1);
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  setInterval(trocarSlide, 4000);
});