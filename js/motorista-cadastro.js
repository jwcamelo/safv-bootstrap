
import { limparCampos } from './util.js'
import { campos, validaMotorista } from "./motorista-fieldValidation.mjs";

validaMotorista()

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
  window.location.href = `../motorista/motorista-consultar.html`
});

//Salvar
let salvar = document.querySelector('.btn-save');
salvar.addEventListener('click', function (e) {
  if (!validaMotorista()) {
    e.preventDefault();
    $('#saveModal').modal({ show: false });
    document.querySelector('.alert').classList.remove('d-none');

  } else {
    $('#saveModal').modal('show');
    document.querySelector('.alert').classList.add('d-none');
  }
});

const salvarMotorista = () => {
  fetch("/motorista", {
    method: 'POST',
    body: JSON.stringify({
      nome: campos.nome.value,
      sobrenome: campos.sobrenome.value,
      cpf: campos.cpf.value.replaceAll(".", "").replace("-", ""),
      dataDeNascimento: campos.dataNasc.value,
      cnh: campos.cnh.value,
      categoria: campos.categoria.value.toUpperCase(),
      logradouro: campos.logradouro.value,
      numero: parseInt(campos.numero.value),
      cep: parseInt(campos.cep.value.replace('.', "").replace('-', "")),
      complemento: campos.complemento.value,
      email: campos.email.value,
      sexo: campos.sexo.value
    }),
    headers: { "content-type": "application/json" }
  }).then(window.location.href = `../motorista/motorista-consultar.html`)
}


const confirmSalvar = document.querySelector('#btn-saveChanges');
confirmSalvar.addEventListener('click', salvarMotorista);







