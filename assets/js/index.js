const carrossel = document.getElementById("carrossel");

// Pega só os 3 últimos adicionados
const ultimos = carros.slice(-3).reverse();

ultimos.forEach(carro => {
  carrossel.innerHTML += `
    <div class="min-w-full md:min-w-[48%] lg:min-w-[31%]">
      <div class="relative rounded-2xl overflow-hidden group cursor-pointer transition duration-500 hover:scale-[1.03]">
        <img src="${carro.imagem}" class="w-full h-72 object-cover transition duration-700 group-hover:scale-110">

        <div class="absolute bottom-0 left-0 w-full bg-white/10 backdrop-blur-md px-4 py-3 text-white">
          <div class="flex justify-between items-center">
            <h4 class="text-lg font-semibold">${carro.nome}</h4>
            <span class="font-bold text-white group-hover:text-primary transition duration-300">
              ${carro.preco}
            </span>
          </div>

          <div class="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500 text-sm text-zinc-200 mt-3">
            ${carro.info}
          </div>
        </div>
      </div>
    </div>
  `;
});