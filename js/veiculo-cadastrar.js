import { limparCampos } from "./util.js";
import { campos, validaVeiculo } from "./veiculo-fieldValidation.js";

validaVeiculo();


//Ações

//Limpar
const limpar = document.querySelectorAll('.btn-clear')
for (let button of limpar) {
  button.addEventListener('click', function () {
    limparCampos(campos);
    document.querySelector('.alert').classList.add('hidden');
  });
}

//Sair
const sair = document.querySelector('.btn-exit');
sair.addEventListener('click', function () {
  window.location.href = `../veiculo/veiculo-consultar.html`
});

//Salvar
let salvar = document.querySelector('.btn-save');
salvar.addEventListener('click', function (e) {
  if (!validaVeiculo()) {
    e.preventDefault();
    $('#saveModal').modal({ show: false });
    document.querySelector('.alert').classList.remove('d-none');

  } else {
    $('#saveModal').modal('show');
    document.querySelector('.alert').classList.add('d-none');
  }
});

const salvarVeiculo = () => {
  fetch("/veiculo", {
    method: 'POST',
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
  }).then(window.location.href = `../veiculo/veiculo-consultar.html`)
}


const confirmSalvar = document.querySelector('#btn-saveChanges');
confirmSalvar.addEventListener('click', salvarVeiculo);


