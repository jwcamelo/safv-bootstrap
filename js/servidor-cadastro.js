import {
  validacaoApenasLetras, validacaoCPF, validacaoApenasNumeros, validacaoEmail,
  validacaoCEP, validacaoVazia, validacaoData
} from './validation.js'
import { limparCampos } from './util.js'


// Obtenção dos elementos 

let nome = document.querySelector('#nome');
let cpf = document.querySelector('#cpf');
let rg = document.querySelector('#rg');
let dataNasc = document.querySelector('#dataNascimento');
let logradouro = document.querySelector('#logradouro');
let numero = document.querySelector('#numero');
let cidade = document.querySelector('#cidade');
let estado = document.querySelector('#estado');
let cep = document.querySelector('#cep');
let email = document.querySelector('#email');
let telefone = document.querySelector('#telefone');
let matricula = document.querySelector('#matricula');
let funcao = document.querySelector('#funcao');
let setor = document.querySelector('#setor');

// Aplicação das validações nos campos


function validaCampoNome() {
  if (validacaoApenasLetras(nome)) {
    nome.classList.remove('is-invalid');
    nome.classList.add('is-valid');
    return true;
  } else {
    nome.classList.remove('is-valid');
    nome.classList.add('is-invalid');
    return false;
  }
}

function validaCampoCpf() {

  if (validacaoCPF(cpf.value)) {
    cpf.classList.remove('is-invalid');
    cpf.classList.add('is-valid');
    return true;
  } else {
    cpf.classList.remove('is-valid');
    cpf.classList.add('is-invalid');
    return false;
  }
}

function validaCampoRg() {

  if (validacaoApenasNumeros(rg.value.replaceAll('.', ''))) {
    rg.classList.remove('is-invalid');
    rg.classList.add('is-valid');
    return true;
  } else {
    rg.classList.remove('is-valid');
    rg.classList.add('is-invalid');
    return false;
  }
}



function validaCampoDataNasc() {
  if (validacaoData(dataNasc.value)) {
    dataNasc.classList.remove('is-invalid');
    dataNasc.classList.add('is-valid');
    return true;
  } else {
    dataNasc.classList.remove('is-valid');
    dataNasc.classList.add('is-invalid');
    return false;
  }
}

function validaCampoMatricula() {

  if (validacaoApenasNumeros(matricula.value)) {
    matricula.classList.remove('is-invalid');
    matricula.classList.add('is-valid');
    return true;
  } else {
    matricula.classList.remove('is-valid');
    matricula.classList.add('is-invalid');
    return false;
  }
}

function validaCampoFuncao() {

  if (validacaoApenasLetras(funcao)) {
    funcao.classList.remove('is-invalid');
    funcao.classList.add('is-valid');
    return true;
  } else {
    funcao.classList.remove('is-valid');
    funcao.classList.add('is-invalid');
    return false;
  }
}

function validaCampoSetor() {

  if (validacaoApenasLetras(setor)) {
    setor.classList.remove('is-invalid');
    setor.classList.add('is-valid');
    return true;
  } else {
    setor.classList.remove('is-valid');
    setor.classList.add('is-invalid');
    return false;
  }
}

function validaCampoLogradouro() {
  if (validacaoVazia(logradouro) && logradouro.value.length > 4) {
    logradouro.classList.remove('is-invalid');
    logradouro.classList.add('is-valid');
    return true;
  } else {
    logradouro.classList.remove('is-valid');
    logradouro.classList.add('is-invalid');
    return false;
  }
}

function validaCampoCEP() {
  if (validacaoCEP(cep.value)) {
    cep.classList.remove('is-invalid');
    cep.classList.add('is-valid');
    return true;
  } else {
    cep.classList.remove('is-valid');
    cep.classList.add('is-invalid');
    return false;
  }
}

function validaCampoNumero() {
  if (validacaoApenasNumeros(numero.value)) {
    numero.classList.remove('is-invalid');
    numero.classList.add('is-valid');
    return true;
  } else {
    numero.classList.remove('is-valid');
    numero.classList.add('is-invalid');
    return false;
  }
}

function validaCampoCidade() {
  if (validacaoApenasLetras(cidade)) {
    cidade.classList.remove('is-invalid');
    cidade.classList.add('is-valid');
    return true;
  } else {
    cidade.classList.remove('is-valid');
    cidade.classList.add('is-invalid');
    return false;
  }
}

function validaCampoEstado() {
  if (validacaoApenasLetras(estado)) {
    estado.classList.remove('is-invalid');
    estado.classList.add('is-valid');
    return true;
  } else {
    estado.classList.remove('is-valid');
    estado.classList.add('is-invalid');
    return false;
  }
}

function validaCampoTelefone() {
  if (validacaoApenasNumeros(telefone.value.replace(/[()-]/g, '')) && telefone.value.replace(/[()-]/g, '').length == 11) {
    telefone.classList.remove('is-invalid');
    telefone.classList.add('is-valid');
    return true;
  } else {
    telefone.classList.remove('is-valid');
    telefone.classList.add('is-invalid');
    return false;
  }
}

function validaCampoEmail() {
  if (validacaoEmail(email.value)) {
    email.classList.remove('is-invalid');
    email.classList.add('is-valid');
    return true;
  } else {
    email.classList.remove('is-valid');
    email.classList.add('is-invalid');
    return false;
  }
}

nome.addEventListener('keyup', validaCampoNome);
cpf.addEventListener('keyup', validaCampoCpf);
rg.addEventListener('keyup', validaCampoRg);
matricula.addEventListener('keyup', validaCampoMatricula);
funcao.addEventListener('keyup', validaCampoFuncao);
setor.addEventListener('keyup', validaCampoSetor);
dataNasc.addEventListener('keyup', validaCampoDataNasc);

logradouro.addEventListener('keyup', validaCampoLogradouro);
numero.addEventListener('keyup', validaCampoNumero);
cidade.addEventListener('keyup', validaCampoCidade);
estado.addEventListener('keyup', validaCampoEstado);
cep.addEventListener('keyup', validaCampoCEP);
telefone.addEventListener('keyup', validaCampoTelefone);
email.addEventListener('keyup', validaCampoEmail);

// Ações 


let listaDeCampos = [nome, cpf, rg, matricula, funcao, setor, dataNasc,
  logradouro, numero, cidade, estado, cep, telefone, email]


document.querySelector('.btn-next').addEventListener('click', function () {

  if (validaCampoNome() && validaCampoCpf() && validaCampoRg() && validaCampoDataNasc() && validaCampoMatricula()
    && validaCampoFuncao() && validaCampoSetor()) {
    document.querySelector('.page-1').classList.add('hidden');
    document.querySelector('.page-2').classList.remove('hidden');
    document.querySelector('.alert-danger').classList.add('d-none');

  }
  else {
    document.querySelector('.alert-danger').classList.remove('d-none');
  }
});

document.querySelector('.btn-back').addEventListener('click', function () {
  document.querySelector('.page-2').classList.add('hidden');
  document.querySelector('.page-1').classList.remove('hidden');
});

const clearButtons = document.querySelectorAll('.btn-clear');
for (let button of clearButtons) {
  button.addEventListener('click', function () {
    limparCampos(listaDeCampos)
  });
}

document.querySelector('.btn-save').addEventListener('click', function () {
  if (validaCampoLogradouro() && validaCampoNumero() && validaCampoCidade() && validaCampoEstado() && validaCampoCEP()
    && validaCampoEmail() && validaCampoTelefone()) {
    alert("dados salvos")
    limparCampos(listaDeCampos);
    document.querySelector('#alert2').classList.add('d-none');

  } else {
    document.querySelector('#alert2').classList.remove('d-none');
  }
})









