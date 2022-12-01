
import { limparCampos } from './util.js'
import { campos, validaMotorista } from "./motorista-fieldValidation.mjs";
import { sendHttpRequest } from "./xhr.js";



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
  window.location.href = `../motorista-consultar.html`
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
  sendHttpRequest('POST', `https://safvroma.herokuapp.com/motorista/`, {

    nome: campos.nome.value,
    sobrenome: campos.sobrenome.value,
    cpf: campos.cpf.value.replaceAll(".", "").replace("-", ""),
    dataNascimento: campos.dataNasc.value,
    cnh: campos.cnh.value,
    categoria:  campos.categoria.value.toUpperCase(),
    logradouro: campos.logradouro.value,
    numero: parseInt(campos.numero.value),
    cep: parseInt(campos.cep.value.replace('.', "").replace('-', "")),
    complemento: campos.complemento.value,
    email: campos.email.value

  }).then(console.log("dados salvos")).catch(err => { console.log(err) });

  setTimeout(() => {
    window.location.href = `../motorista-consultar.html`
  }, "2000")
}


const confirmSalvar = document.querySelector('#btn-saveChanges');
confirmSalvar.addEventListener('click', salvarMotorista);







