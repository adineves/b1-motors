document.addEventListener("DOMContentLoaded", function () {

  const container = document.getElementById("carro-detalhe");

  // Só executa se estiver na página de detalhe
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  if (!id) {
    container.innerHTML = "<p class='text-center mt-10'>Veículo não encontrado.</p>";
    return;
  }

  const carro = carros.find(c => c.id === id);

  if (!carro) {
    container.innerHTML = "<p class='text-center mt-10'>Veículo não encontrado.</p>";
    return;
  }

  container.innerHTML = `
    <section class="max-w-6xl mx-auto p-6">
      
      <img src="${carro.imagem[0]}" 
           class="w-full h-[500px] object-cover rounded-xl mb-6">

      <h1 class="text-4xl font-bold mb-2">${carro.nome}</h1>
      <p class="text-2xl text-red-600 font-semibold mb-6">${carro.preco}</p>

      <div class="grid grid-cols-2 gap-4 text-gray-300">
        <div><strong>Ano:</strong> ${carro.ano}</div>
        <div><strong>KM:</strong> ${carro.km}</div>
        <div><strong>Câmbio:</strong> ${carro.cambio}</div>
        <div><strong>Combustível:</strong> ${carro.combustivel}</div>
        <div><strong>Cor:</strong> ${carro.cor}</div>
      </div>

      <p class="mt-6 text-gray-400">${carro.descricao}</p>

    </section>
  `;
});