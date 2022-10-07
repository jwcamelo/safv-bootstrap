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
  var add = 0;

  for (let i = 0; i < 9; i++) {
    add += parseInt(cpf.charAt(i)) * (10 - i);
  }
  var rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) {
    rev = 0;
  }

  if (rev != parseInt(cpf.charAt(9))) {
    return false;
  }

  // Valida 2o digito 
  add = 0;
  for (let i = 0; i < 10; i++) {
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
  const letters = /^[A-Za-z ]+$/;
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

function validacaoEmail(value) {
  if (value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    return true;
  } else {
    return false;
  }
}

export { validacaoApenasLetras, validacaoApenasNumeros, validacaoCEP, validacaoCPF, validacaoEmail, validacaoVazia }