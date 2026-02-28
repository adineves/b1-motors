function criarCard(carro) {
  return `
    <a href="carro.html?id=${carro.id}" 
       class="block relative rounded-2xl overflow-hidden group cursor-pointer transition duration-500 hover:scale-[1.03]">

      <img src="${carro.imagem[0]}" 
           class="w-full h-72 object-cover transition duration-700 group-hover:scale-110">

      <div class="absolute bottom-0 left-0 w-full
                  bg-gradient-to-t from-black/80 via-black/40 to-transparent
                  px-4 py-3 transition-all duration-500">

        <div class="flex justify-between items-center">
          <h4 class="text-lg font-semibold">${carro.nome}</h4>
          <span class="font-bold text-white group-hover:text-primary transition-colors duration-300">
            ${carro.preco}
          </span>
        </div>

        <div class="overflow-hidden max-h-0 group-hover:max-h-20
                    transition-all duration-500 text-sm text-zinc-200 mt-2">
          ${carro.ano} • ${carro.km} • ${carro.cambio}
        </div>
      </div>

    </a>
  `;
}