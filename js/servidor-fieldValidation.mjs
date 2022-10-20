import {
  validacaoApenasLetras, validacaoCPF, validacaoApenasNumeros, validacaoEmail,
  validacaoCEP, validacaoVazia, validacaoData
} from './validation.js'

const nome = document.querySelector('#nome');
const sobrenome = document.querySelector('#sobrenome');
const cpf = document.querySelector('#cpf');
const dataNasc = document.querySelector('#dataNascimento');
const logradouro = document.querySelector('#logradouro');
const numero = document.querySelector('#numero');
const cep = document.querySelector('#cep');
const complemento = document.querySelector('#complemento');
const matricula = document.querySelector('#matricula');
const funcao = document.querySelector('#funcao');
const setor = document.querySelector('#setor');
const emailses = document.querySelector('#emailses');
const email = document.querySelector('#email');
const telefone = document.querySelector('#telefone');

export function validaServidor() {
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

  function validaCampoSobrenome() {
    if (validacaoApenasLetras(sobrenome)) {
      sobrenome.classList.remove('is-invalid');
      sobrenome.classList.add('is-valid');
      return true;
    } else {
      sobrenome.classList.remove('is-valid');
      sobrenome.classList.add('is-invalid');
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
    if (funcao.options[funcao.selectedIndex].value > 0) {
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
    if (setor.options[setor.selectedIndex].value > 0) {
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

  function validaCampoComplemento() {
    if (validacaoVazia(complemento)) {
      complemento.classList.remove('is-invalid');
      complemento.classList.add('is-valid');
      return true;
    } else {
      complemento.classList.remove('is-valid');
      complemento.classList.add('is-invalid');
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

  function validaCampoEmailSES() {
    if (validacaoEmail(emailses.value)) {
      emailses.classList.remove('is-invalid');
      emailses.classList.add('is-valid');
      return true;
    } else {
      emailses.classList.remove('is-valid');
      emailses.classList.add('is-invalid');
      return false;
    }
  }

  nome.addEventListener('keyup', validaCampoNome);
  sobrenome.addEventListener('keyup', validaCampoSobrenome);
  dataNasc.addEventListener('keyup', validaCampoDataNasc);
  cpf.addEventListener('keyup', validaCampoCpf);
  matricula.addEventListener('keyup', validaCampoMatricula);
  funcao.addEventListener('keyup', validaCampoFuncao);
  setor.addEventListener('change', validaCampoSetor);
  logradouro.addEventListener('keyup', validaCampoLogradouro);
  numero.addEventListener('keyup', validaCampoNumero);
  cep.addEventListener('keyup', validaCampoCEP);
  complemento.addEventListener('keyup', validaCampoComplemento)
  telefone.addEventListener('keyup', validaCampoTelefone);
  email.addEventListener('keyup', validaCampoEmail);
  emailses.addEventListener('keyup', validaCampoEmailSES);

  return (validaCampoNome() && validaCampoSobrenome() && validaCampoDataNasc() && validaCampoCpf()
    && validaCampoMatricula() && validaCampoFuncao() && validaCampoSetor() && validaCampoLogradouro()
    && validaCampoNumero() && validaCampoComplemento() && validaCampoCEP() && validaCampoEmailSES()
    && validaCampoEmail() && validaCampoTelefone());
}


export const campos = {
  nome, sobrenome, dataNasc, cpf, matricula, funcao, setor,
  logradouro, numero, complemento, cep, emailses, email, telefone
}
