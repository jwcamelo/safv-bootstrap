import { servidores, setores, funcoes } from "./servidor-consultar.js";
import { campos, validaServidor } from "./servidor-fieldValidation.mjs";
import { sendHttpRequest } from "./xhr.js";

// Matricula passada como parâmetro na url
const matriculaSelecionada = window.location.href.split('?')[1];


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
    campos.dataNasc.value = servidor.dataDeNascimento;
    campos.matricula.value = servidor.matricula;
    campos.funcao.value = servidor.funcao.id;
    campos.setor.value = servidor.setor.id;
    campos.logradouro.value = servidor.logradouro;
    campos.numero.value = servidor.numero;
    campos.cep.value = servidor.cep;
    campos.complemento.value = servidor.complemento;
    campos.emailses.value = servidor.emailCorporativo;
    campos.email.value = servidor.emailParticular;
    campos.telefone.value = servidor.telefone;
  }
}


validaServidor()

//Ações

//Sair
const sair = document.querySelector('.btn-exit');
sair.addEventListener('click', function () {
  window.location.href = `../servidor-consultar.html`
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
  sendHttpRequest('PUT', `https://safvroma.herokuapp.com/funcionario/${matriculaSelecionada}`, {

    funcao: { id: parseInt(campos.funcao.value) },
    setor: { id: parseInt(campos.setor.value) },
    nome: campos.nome.value,
    sobrenome: campos.sobrenome.value,
    cpf: campos.cpf.value.replaceAll(".", "").replace("-", ""),
    dataDeNascimento: campos.dataNasc.value,
    logradouro: campos.logradouro.value,
    numero: parseInt(campos.numero.value),
    cep: parseInt(campos.cep.value.replace('.', "").replace('-', "")),
    complemento: campos.complemento.value,
    emailCorporativo: campos.emailses.value,
    emailParticular: campos.email.value,
    telefone: campos.telefone.value.replace(")", "").replace("(", "").replace("-", "")

  }).then(console.log("dados atualizados")).catch(err => { console.log(err) });

  setTimeout(() => {
    window.location.href = `../servidor-consultar.html`
  }, "2000")
}


const salvar = document.querySelector('#btn-saveChanges');
salvar.addEventListener('click', atualizarServidor);


// Excluir

const excluirServidor = () => {
  sendHttpRequest('DELETE', `https://safvroma.herokuapp.com/funcionario/${matriculaSelecionada}`)
    .then(console.log("dados excluídos")).catch(err => console.log(err));

  setTimeout(() => {
    window.location.href = `../servidor-consultar.html`
  }, "2000")
}

const excluir = document.querySelector('.btn-delete');
excluir.addEventListener('click', function () {
  $('#deleteModal').modal('show');
});

const confirmExcluir = document.querySelector('#btn-confirmDelete');
confirmExcluir.addEventListener('click', excluirServidor)
