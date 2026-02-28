document.addEventListener("DOMContentLoaded", function () {

  const container = document.getElementById("estoque-container");

  // Só executa se estiver na página de estoque
  if (!container) return;

  if (typeof carros === "undefined") {
    console.error("carros não está definido");
    return;
  }

  carros.forEach(carro => {
    container.innerHTML += criarCard(carro);
  });

});