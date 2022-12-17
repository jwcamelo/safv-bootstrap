import { campos, validaServidor } from "./servidor-fieldValidation.mjs";

let servidores = JSON.parse(sessionStorage.getItem("servidores"));
let funcoes = JSON.parse(sessionStorage.getItem("funcoes"));
let setores = JSON.parse(sessionStorage.getItem("setores"));

// Matricula passada como parâmetro na url
const matriculaSelecionada = window.location.href.split('?')[1];
let senha = "";
let admin = "";


//Preenchimento dropdown
for (let setor of setores) {
  campos.setor.innerHTML += `
     <option value="${setor.id}">${setor.nome}</option>
   `
}
for (let funcao of funcoes) {
  campos.funcao.innerHTML += `
     <option value="${funcao.id}">${funcao.nome}</option>
   `
}


//Preencher campos
for (let servidor of servidores) {
  if (servidor.matricula == matriculaSelecionada) {
    console.log(servidor);
    campos.nome.value = servidor.nome;
    campos.sobrenome.value = servidor.sobrenome;
    campos.cpf.value = servidor.cpf;
    campos.sexo.value = servidor.sexo;
    campos.dataNasc.value = servidor.dataDeNascimento;
    campos.matricula.value = servidor.matricula;
    campos.funcao.value = servidor.funcao.id;
    campos.setor.value = servidor.setor.id;
    campos.logradouro.value = servidor.logradouro;
    campos.numero.value = servidor.numero;
    campos.cep.value = servidor.cep;
    campos.complemento.value = servidor.complemento;
    campos.emailses.value = servidor.emailSes;
    campos.email.value = servidor.email;
    senha = servidor.senha;
    admin = servidor.admin;
  }
}

validaServidor();

//Ações

//Sair
const sair = document.querySelector('.btn-exit');
sair.addEventListener('click', function () {
  window.location.href = `../servidor/servidor-consultar.html`
});



//Atualizar

const atualizar = document.querySelector('.btn-update');
atualizar.addEventListener('click', function (e) {
  if (!validaServidor()) {
    e.preventDefault();
    $('#saveModal').modal({ show: false });
    document.querySelector('.alert').classList.remove('d-none');

  } else {
    $('#saveModal').modal('show');
    document.querySelector('.alert').classList.add('d-none');
  }
});

const atualizarServidor = () => {
  fetch("/servidor", {
    method: "PUT",
    body: JSON.stringify({
      matricula: campos.matricula.value,
      idFuncao: parseInt(campos.funcao.value),
      idSetor: parseInt(campos.setor.value),
      nome: campos.nome.value,
      sobrenome: campos.sobrenome.value,
      cpf: campos.cpf.value.replaceAll(".", "").replace("-", ""),
      dataDeNascimento: campos.dataNasc.value,
      logradouro: campos.logradouro.value,
      numero: parseInt(campos.numero.value),
      cep: parseInt(campos.cep.value.replace('.', "").replace('-', "")),
      complemento: campos.complemento.value,
      emailSes: campos.emailses.value,
      email: campos.email.value,
      sexo: campos.sexo.value,
      senha: senha,
      admin: admin
    }),
    headers: { "content-type": "application/json" }
  }).then(
    setTimeout(() => {
      window.location.href = `../servidor/servidor-consultar.html`
    }, "3000"))

}


const salvar = document.querySelector('#btn-saveChanges');
salvar.addEventListener('click', atualizarServidor);


const excluirServidor = () => {
  fetch("/servidor", {
    method: 'DELETE',
    body: JSON.stringify({
      matricula: matriculaSelecionada
    }),
    headers: { "content-type": "application/json" }
  }).then(
    setTimeout(() => {
      window.location.href = `../servidor/servidor-consultar.html`
    }, "3000")).catch(err => console.log(err));
}

const excluir = document.querySelector('.btn-delete');
excluir.addEventListener('click', function () {
  $('#deleteModal').modal('show');
});

const confirmExcluir = document.querySelector('#btn-confirmDelete');
confirmExcluir.addEventListener('click', excluirServidor)
