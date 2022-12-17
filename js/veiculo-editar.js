import { campos, validaVeiculo } from "./veiculo-fieldValidation.mjs";

let veiculos = JSON.parse(sessionStorage.getItem("veiculos"));

// Placa passada como parâmetro na url
const placaSelecionada = window.location.href.split('?')[1];

for (let veiculo of veiculos) {
  if (veiculo.placa == placaSelecionada) {
    campos.placa.value = veiculo.placa;
    campos.fabricante.value = veiculo.fabricante;
    campos.quilometragem.value = veiculo.quilometragem;
    campos.modelo.value = veiculo.modelo;
    campos.cor.value = veiculo.cor;
    campos.ano.value = veiculo.ano;
    campos.tipo.value = veiculo.tipo;
  }
}

validaVeiculo()

//Ações

//Sair
const sair = document.querySelector('.btn-exit');
sair.addEventListener('click', function () {
  window.location.href = `../veiculo/veiculo-consultar.html`
});

//Atualizar
const atualizar = document.querySelector('.btn-update');
atualizar.addEventListener('click', function (e) {
  if (!validaVeiculo()) {
    e.preventDefault();
    $('#saveModal').modal({ show: false });
    document.querySelector('.alert').classList.remove('d-none');

  } else {
    $('#saveModal').modal('show');
    document.querySelector('.alert').classList.add('d-none');
  }
});


const atualizarVeiculo = () => {
  fetch("/veiculo", {
    method: "PUT",
    body: JSON.stringify({
      placa: campos.placa.value.toUpperCase(),
      fabricante: campos.fabricante.value,
      quilometragem: campos.quilometragem.value,
      cor: campos.cor.value,
      ano: campos.ano.value,
      modelo: campos.modelo.value,
      tipo: campos.tipo.value
    }),
    headers: { "content-type": "application/json" }
  }).then(
    setTimeout(() => {
      window.location.href = `../veiculo/veiculo-consultar.html`
    }, "3000"))

}


const salvar = document.querySelector('#btn-saveChanges');
salvar.addEventListener('click', atualizarVeiculo);


// Excluir

const excluirVeiculo = () => {
  fetch("/veiculo", {
    method: 'DELETE',
    body: JSON.stringify({
      placa: placaSelecionada
    }),
    headers: { "content-type": "application/json" }
  }).then(
    setTimeout(() => {
      window.location.href = `../veiculo/veiculo-consultar.html`
    }, "3000")).catch(err => console.log(err));
}

const excluir = document.querySelector('.btn-delete');
excluir.addEventListener('click', function () {
  $('#deleteModal').modal('show');
});

const confirmExcluir = document.querySelector('#btn-confirmDelete');
confirmExcluir.addEventListener('click', excluirVeiculo)
