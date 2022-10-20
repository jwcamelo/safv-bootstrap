
import { limparCampos } from './util.js'
import { campos, validaServidor } from "./servidor-fieldValidation.mjs";
import { sendHttpRequest } from "./xhr.js";

//Preenchimento dropdown

const urlSetores = "https://safvroma.herokuapp.com/setor";
const urlFuncoes = "https://safvroma.herokuapp.com/funcao";

sendHttpRequest('GET', urlSetores).then(setores => setores.map(setor => {
  campos.setor.innerHTML += `
    <option value="${setor.id}">${setor.nome}</option>
  `
}))

sendHttpRequest('GET', urlFuncoes).then(funcoes => funcoes.map(funcao => {
  campos.funcao.innerHTML += `
    <option value="${funcao.id}">${funcao.nome}</option>
  `
}))

validaServidor()

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
  window.location.href = `../servidor-consultar.html`
});

//Salvar
let salvar = document.querySelector('.btn-save');
salvar.addEventListener('click', function (e) {
  if (!validaServidor()) {
    e.preventDefault();
    $('#saveModal').modal({ show: false });
    document.querySelector('.alert').classList.remove('d-none');

  } else {
    $('#saveModal').modal('show');
    document.querySelector('.alert').classList.add('d-none');
  }
});

const salvarServidor = () => {
  sendHttpRequest('POST', `https://safvroma.herokuapp.com/funcionario/`, {

    matricula: campos.matricula.value,
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

  }).then(console.log("dados salvos")).catch(err => { console.log(err) });

  setTimeout(() => {
    window.location.href = `../servidor-consultar.html`
  }, "2000")
}


const confirmSalvar = document.querySelector('#btn-saveChanges');
confirmSalvar.addEventListener('click', salvarServidor);







