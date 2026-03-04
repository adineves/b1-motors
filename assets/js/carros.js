const carros = [
    {
        nome: "Hyundai Creta 1.6 Flex",
        preco: "R$ 92.900,00",
        ano: "2020/2021",
        km: "65.000km",
        cambio: "Automático",
        img: "assets/images/carros/hyundai-creta/hyundai-creta1.jpg"
    },
        {
        nome: "Hyundai HB20 1.0 Flex",
        preco: "R$ 42.900,00",
        ano: "2013/2013",
        km: "171.000km",
        cambio: "Manual",
        img: "assets/images/carros/hyundai-hb20/hyundai-hb201.jpg"
    },
        {
        nome: "Toyota Corolla 2.0 VVT-IE Flex",
        preco: "R$ 124.900,00",
        ano: "2023/2024",
        km: "14.000km",
        cambio: "Automático",
        img: "assets/images/carros/toyota-corolla/toyota-corolla1.jpg"
    },
];

const carrossel = document.getElementById("carrossel");

// Cria automaticamente
carros.forEach(carro => {
    const card = document.createElement("div");
    card.className = "flex-shrink-0 min-w-[100%] md:min-w-[48%] lg:min-w-[31%]";

    card.innerHTML = `
    <div class="relative rounded-2xl overflow-hidden group cursor-pointer transition duration-500 hover:scale-[1.03]">
      <img src="${carro.img}" class="w-full h-72 object-cover object-center transition duration-700 group-hover:scale-110">

      <div class="absolute bottom-0 left-0 w-full px-4 py-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm rounded-b-2xl">
        <div class="flex justify-between items-center mb-2">
          <h4 class="text-lg font-semibold">${carro.nome}</h4>
          <span class="font-bold text-red-500 group-hover:text-red-600 transition duration-300">${carro.preco}</span>
        </div>
        <div class="text-sm text-zinc-200">
          ${carro.ano} • ${carro.km} • ${carro.cambio}
        </div>
      </div>
    </div>
  `;
  carrossel.appendChild(card);
});