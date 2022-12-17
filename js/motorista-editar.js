import { campos, validaMotorista } from "./motorista-fieldValidation.mjs";

let motoristas = JSON.parse(sessionStorage.getItem("motoristas"));

// Matricula passada como parâmetro na url
const cnhSelecionada = window.location.href.split('?')[1];
let senha = "";

for (let motorista of motoristas) {
  if (motorista.cnh == cnhSelecionada) {
    campos.nome.value = motorista.nome;
    campos.sobrenome.value = motorista.sobrenome;
    campos.cpf.value = motorista.cpf;
    campos.dataNasc.value = motorista.dataDeNascimento;
    campos.cnh.value = motorista.cnh;
    campos.categoria.value = motorista.categoria;
    campos.logradouro.value = motorista.logradouro;
    campos.numero.value = motorista.numero;
    campos.cep.value = motorista.cep;
    campos.complemento.value = motorista.complemento;
    campos.email.value = motorista.email;
    campos.sexo.value = motorista.sexo;
    senha = motorista.senha;
  }
}

validaMotorista()

//Ações

//Sair
const sair = document.querySelector('.btn-exit');
sair.addEventListener('click', function () {
  window.location.href = `../motorista/motorista-consultar.html`
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
  fetch("/motorista", {
    method: "PUT",
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
      sexo: campos.sexo.value,
      senha: senha
    }),
    headers: { "content-type": "application/json" }
  }).then(
    setTimeout(() => {
      window.location.href = `../motorista/motorista-consultar.html`
    }, "3000"))

}


const salvar = document.querySelector('#btn-saveChanges');
salvar.addEventListener('click', atualizarMotorista);


// Excluir

const excluirMotorista = () => {
  fetch("/motorista", {
    method: 'DELETE',
    body: JSON.stringify({
      cnh: cnhSelecionada
    }),
    headers: { "content-type": "application/json" }
  }).then(
    setTimeout(() => {
      window.location.href = `../motorista/motorista-consultar.html`
    }, "3000")).catch(err => console.log(err));
}

const excluir = document.querySelector('.btn-delete');
excluir.addEventListener('click', function () {
  $('#deleteModal').modal('show');
});

const confirmExcluir = document.querySelector('#btn-confirmDelete');
confirmExcluir.addEventListener('click', excluirMotorista)
