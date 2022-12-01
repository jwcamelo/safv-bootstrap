import { motoristas } from "./motorista-consultar.js";
import { campos, validaMotorista } from "./motorista-fieldValidation.mjs";
import { sendHttpRequest } from "./xhr.js";

// Matricula passada como parâmetro na url
const cnhSelecionada = window.location.href.split('?')[1];

//Preencher campos

for (let motorista of motoristas) {
  if (motorista.cnh == cnhSelecionada) {
    console.log(motorista);
    campos.nome.value = motorista.nome;
    campos.sobrenome.value = motorista.sobrenome;
    campos.cpf.value = motorista.cpf;
    campos.dataNasc.value = motorista.dataNascimento;
    campos.cnh.value = motorista.cnh;
    campos.categoria.value = motorista.categoria;
    campos.logradouro.value = motorista.logradouro;
    campos.numero.value = motorista.numero;
    campos.cep.value = motorista.cep;
    campos.complemento.value = motorista.complemento;
    campos.email.value = motorista.email;
  }
}


validaMotorista()

//Ações

//Sair
const sair = document.querySelector('.btn-exit');
sair.addEventListener('click', function () {
  window.location.href = `../motorista-consultar.html`
});

//Atualizar

const atualizar = document.querySelector('.btn-update');
atualizar.addEventListener('click', function (e) {
  if (!validaMotorista()) {
    e.preventDefault();
    $('#saveModal').modal({ show: false });
    document.querySelector('.alert').classList.remove('d-none');

  } else {
    $('#saveModal').modal('show');
    document.querySelector('.alert').classList.add('d-none');
  }
});


const atualizarMotorista = () => {
  sendHttpRequest('PUT', `https://safvroma.herokuapp.com/motorista/${cnhSelecionada}`, {

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

  }).then(console.log("dados atualizados")).catch(err => { console.log(err) });

  setTimeout(() => {
    window.location.href = `../motorista-consultar.html`
  }, "2000")
}


const salvar = document.querySelector('#btn-saveChanges');
salvar.addEventListener('click', atualizarMotorista);


// Excluir

const excluirMotorista = () => {
  sendHttpRequest('DELETE', `https://safvroma.herokuapp.com/motorista/${cnhSelecionada}`)
    .then(console.log("dados excluídos")).catch(err => console.log(err));

  setTimeout(() => {
    window.location.href = `../motorista-consultar.html`
  }, "2000")
}

const excluir = document.querySelector('.btn-delete');
excluir.addEventListener('click', function () {
  $('#deleteModal').modal('show');
});

const confirmExcluir = document.querySelector('#btn-confirmDelete');
confirmExcluir.addEventListener('click', excluirMotorista)
