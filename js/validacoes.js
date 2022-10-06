// Validação CPF
function validacaoCPF(cpf) {
  // Remove os pontos/traço da expressão regular, caso exista
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf == '') return false;

  // Elimina CPFs invalidos conhecidos    
  if (cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999")
    return false;

  // Valida 1o digito 
  add = 0;

  for (i = 0; i < 9; i++) {
    add += parseInt(cpf.charAt(i)) * (10 - i);
  }
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) {
    rev = 0;
  }

  if (rev != parseInt(cpf.charAt(9))) {
    return false;
  }

  // Valida 2o digito 
  add = 0;
  for (i = 0; i < 10; i++) {
    add += parseInt(cpf.charAt(i)) * (11 - i);
  }
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) {
    rev = 0;
  }
  if (rev != parseInt(cpf.charAt(10))) {
    return false;
  }
  return true;
}

// Validação CEP

function validacaoCEP(strCEP) {
  // Caso o CEP não esteja nesse formato ele é inválido!
  var objER = /^[0-9]{2}\.[0-9]{3}-[0-9]{3}$/;


  if (strCEP.length > 0) {
    if (objER.test(strCEP))
      return true;
    else
      return false;
  }
  else
    return false;
}


// Validação de string com apenas letras

function validacaoApenasLetras(inputtxt) {
  const letters = /^[A-Za-z- ]+$/;
  if (inputtxt.value.match(letters) && validacaoVazia(inputtxt)) {
    return true;
  }
  else {
    return false;
  }
}

// Validação de string vazia

function validacaoVazia(inputtxt) {
  return inputtxt.value.trim().length > 4 ? true : false;
}

// Validação de string apenas com números

function validacaoApenasNumeros(value) {
  const numbers = /^[0-9]+$/;
  if (value.match(numbers)) {
    return true;
  }
  else {
    return false;
  }
}


// Aplicação das validações nos campos


function validaCampoNome() {
  let nome = document.querySelector('#nome');

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
  let cpf = document.querySelector('#cpf');
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
  let rg = document.querySelector('#rg');
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

let dataNasc = document.querySelector('#dataNascimento');
let logradouro = document.querySelector('#logradouro');
let numero = document.querySelector('#numero');
let cidade = document.querySelector('#cidade');
let estado = document.querySelector('#email');
let cep = document.querySelector('#cep');
let email = document.querySelector('#email');
let telefone = document.querySelector('#telefone');

function validaCampoDataNasc() {
  if (validacaoApenasNumeros(dataNasc.value.replaceAll('/', ''))) {
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
  let matricula = document.querySelector('#matricula');
  if (validacaoApenasNumeros(matricula.value)) {
    matricula.classList.remove('is-invalid');
    matricula.classList.add('is-valid');
    return true;
  } else {
    matricula.classList.remove('is-valid');
    matricula.classList.add('is-invalid');
  }
}

function validaCampoFuncao() {
  let funcao = document.querySelector('#funcao');
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
  let setor = document.querySelector('#setor');
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
  }
}

function validaCampoNumero() {
  if (validacaoApenasNumeros(numero.value) && numero.length < 10000000) {
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






document.querySelector('.btn-next').addEventListener('click', function () {
  if (validaCampoNome() && validaCampoCpf() && validaCampoRg() && validaCampoDataNasc() && validaCampoMatricula() && validaCampoFuncao()
    && validaCampoSetor()) {
    document.querySelector('.page-1').classList.add('hidden');
    document.querySelector('.page-2').classList.remove('hidden');
    document.querySelector('.alert-danger').classList.add('d-none');
    alert('ok')
  }
  else {
    document.querySelector('.alert-danger').classList.remove('d-none');
  }
})

