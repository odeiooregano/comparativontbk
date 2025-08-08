document.addEventListener('DOMContentLoaded', () => {
  let todosNotebooks = [];

  fetch('data/notebooks.json')
    .then(response => response.json())
    .then(data => {
      todosNotebooks = data;
      exibirComparacao(todosNotebooks);
    })
    .catch(error => console.error("Erro ao carregar JSON:", error));

  document.getElementById('perfilSelect').addEventListener('change', function() {
    const perfilSelecionado = this.value;
    let filtrados = todosNotebooks;

    mostrarRecomendacao(perfilSelecionado);

    if (perfilSelecionado !== 'todos') {
      filtrados = todosNotebooks.filter(nb =>
        nb.perfil.toLowerCase().includes(perfilSelecionado.toLowerCase())
      );
    }
    exibirComparacao(filtrados);
  });
});

function mostrarRecomendacao(perfil) {
  const box = document.getElementById('recomendacao');
  let mensagem = "";

  switch (perfil) {
    case "Gamer":
      mensagem = "💡 Para gamers, priorize notebooks com GPU dedicada, tela de alta taxa de atualização (120Hz ou mais) e bom sistema de refrigeração.";
      break;
    case "Editor de vídeo":
      mensagem = "💡 Para edição de vídeo, escolha notebooks com processador potente, GPU dedicada e bastante memória RAM.";
      break;
    case "Programador":
      mensagem = "💡 Para programadores, priorize notebooks com boa tela IPS, teclado confortável e pelo menos 16GB de RAM.";
      break;
    case "Empresa de BI":
      mensagem = "💡 Para análise de dados/BI, prefira notebooks com processadores multicore, bastante memória RAM e armazenamento rápido NVMe.";
      break;
    default:
      box.style.display = "none";
      return;
  }

  box.textContent = mensagem;
  box.style.display = "block";
}

function exibirComparacao(notebooks) {
  const container = document.getElementById('comparacao-container');
  if (notebooks.length === 0) {
    container.innerHTML = "<p>Nenhum notebook encontrado para este perfil.</p>";
    return;
  }

  let tabela = `
    <table>
      <tr>
        <th>Imagem</th>
        <th>Modelo</th>
        <th>Processador</th>
        <th>RAM</th>
        <th>SSD</th>
        <th>Tela</th>
        <th>GPU</th>
        <th>Sistema</th>
        <th>Perfil</th>
      </tr>
  `;

  notebooks.forEach(nb => {
    tabela += `
      <tr>
        <td><img src="${nb.imagem}" alt="${nb.nome}" width="120"></td>
        <td>${nb.nome}</td>
        <td>${nb.processador}</td>
        <td>${nb.ram}</td>
        <td>${nb.ssd}</td>
        <td>${nb.tela}</td>
        <td>${nb.gpu}</td>
        <td>${nb.sistema}</td>
        <td>${nb.perfil}</td>
      </tr>
    `;
  });

  tabela += `</table>`;
  container.innerHTML = tabela;
}
