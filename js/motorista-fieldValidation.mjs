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
const cnh = document.querySelector('#cnh');
const email = document.querySelector('#email');
const categoria = document.querySelector('#categoria');
const sexo = document.querySelector('#sexo');

export function validaMotorista() {
  function validaCampoNome() {
    if (validacaoApenasLetras(nome) && nome.value.length > 3) {
      nome.classList.remove('is-invalid');
      nome.classList.add('is-valid');
      return true;
    } else {
      nome.classList.remove('is-valid');
      nome.classList.add('is-invalid');
      return false;
    }
  }

  function validaCampoSexo() {
    if (sexo.selectedIndex > 0) {

      sexo.classList.remove('is-invalid');
      sexo.classList.add('is-valid');
      return true;
    } else {
      sexo.classList.remove('is-valid');
      sexo.classList.add('is-invalid');
      return false;
    }
  }

  function validaCampoSobrenome() {
    if (validacaoApenasLetras(sobrenome) && sobrenome.value.length > 3) {
      sobrenome.classList.remove('is-invalid');
      sobrenome.classList.add('is-valid');
      return true;
    } else {
      sobrenome.classList.remove('is-valid');
      sobrenome.classList.add('is-invalid');
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

  function validaCampoCategoria() {
    if (categoria.selectedIndex > 0) {
      categoria.classList.remove('is-invalid');
      categoria.classList.add('is-valid');
      return true;
    } else {
      categoria.classList.remove('is-valid');
      categoria.classList.add('is-invalid');
      return false;
    }
  }

  function validaCampoCnh() {
    if (validacaoApenasNumeros(cnh.value) && (cnh.value.length > 8 && cnh.value.length < 12)) {
      cnh.classList.remove('is-invalid');
      cnh.classList.add('is-valid');
      return true;
    } else {
      cnh.classList.remove('is-valid');
      cnh.classList.add('is-invalid');
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
  sobrenome.addEventListener('keyup', validaCampoSobrenome);
  dataNasc.addEventListener('keyup', validaCampoDataNasc);
  cpf.addEventListener('keyup', validaCampoCpf);
  cnh.addEventListener('keyup', validaCampoCnh);
  categoria.addEventListener('change', validaCampoCategoria);
  logradouro.addEventListener('keyup', validaCampoLogradouro);
  numero.addEventListener('keyup', validaCampoNumero);
  cep.addEventListener('keyup', validaCampoCEP);
  complemento.addEventListener('keyup', validaCampoComplemento)
  email.addEventListener('keyup', validaCampoEmail);
  sexo.addEventListener('change', validaCampoSexo)

  return (validaCampoNome() && validaCampoSobrenome() && validaCampoSexo() && validaCampoDataNasc() && validaCampoCpf()
    && validaCampoCnh() && validaCampoCategoria() && validaCampoEmail() && validaCampoLogradouro()
    && validaCampoNumero() && validaCampoComplemento() && validaCampoCEP());
}

export const campos = {
  nome, sobrenome, sexo, dataNasc, cpf, cnh, categoria, logradouro, numero, complemento, cep, email,
}
