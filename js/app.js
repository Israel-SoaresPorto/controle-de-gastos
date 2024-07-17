// Selecionando elementos do DOM
const descricao = document.querySelector("#descricao");
const valor = document.querySelector("#valor");
const form = document.querySelector("#form");
const modal = document.querySelector("#modal");
const abrirModal = document.querySelector("#abrirModal");
const fecharModal = document.querySelector("#fecharModal");
const receitas = document.querySelector("#receitas");
const despesas = document.querySelector("#despesas");

//array para armazenar receitas
valoresReceitas = [];
//array para armazenar despesas
valoresDespesas = [];

// cria um item com a descrição e o valor para ser exibido na tela
function criarItem(elemento, descricao, valor) {
  const item = document.createElement("div");
  item.classList.add("secao_valores_item");
  const itemDescricao = document.createElement("h3");
  const itemValor = document.createElement("p");

  itemDescricao.textContent = `${descricao}`;
  itemValor.textContent = formatarParaMoeda(valor);

  item.appendChild(itemDescricao);
  item.appendChild(itemValor);

  elemento.appendChild(item);
}

// exibe os valores na seção de receitas ou despesas
function exibirEm(secao, valores) {
  const secaoValores = secao.querySelector(".secao_valores");

  secaoValores.innerHTML = "";

  valores.forEach((val) => criarItem(secaoValores, val.descricao, val.valor));

  let total = somarValores(valores);

  secao.querySelector(".secao_total span").textContent =
    formatarParaMoeda(total);
}

// substitui virgula por ponto e formata o valor para tipo float
function formatarValor(valor) {
  let valorFormatado = valor.replace(",", ".");
  return parseFloat(valorFormatado);
}

// formata o valor para moeda brasileira
function formatarParaMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    currencyDisplay: "symbol",
  });
}

// soma os valores do array
function somarValores(valores) {
  return valores.reduce((acc, val) => acc + val.valor, 0);
}

// limpa os campos de descrição e valor
function limparCampos() {
  descricao.value = "";
  valor.value = "";
}

// valida o valor digitado
function validarValor(valor) {
  const regex = /^[0-9]+[[,.]?[0-9]{2}$/;

  if (!regex.test(valor)) {
    throw new Error("Valor inválido");
  }
}

// insere os valores no array
function inserirEm(valores) {
  valores.push({
    descricao: descricao.value,
    valor: formatarValor(valor.value),
  });
}

// exibe o saldo total
function exibirSaldo() {
  let total = somarValores(valoresReceitas) - somarValores(valoresDespesas);
  document.querySelector(".saldo_total").textContent = formatarParaMoeda(total);
}

abrirModal.addEventListener("click", () => {
  modal.showModal();
});

fecharModal.addEventListener("click", () => {
  modal.close();
});  

// evento para submeter os dados para receitas ou despesas
form.addEventListener("submit", (e) => {
  try {
    e.preventDefault();

    validarValor(valor.value);

    const tipoSelecionado = document.querySelector(
      'input[name="tipo"]:checked'
    ).value;

    if (tipoSelecionado == "receita") {
      inserirEm(valoresReceitas);
      exibirEm(receitas, valoresReceitas);
    }

    if (tipoSelecionado == "despesa") {
      inserirEm(valoresDespesas);
      exibirEm(despesas, valoresDespesas);
    }

    exibirSaldo();
  } catch (error) {
    alert(error.message);
  } finally {
    limparCampos();
  }
});
