import {
  validacaoApenasLetras, validacaoCPF, validacaoApenasNumeros, validacaoEmail,
  validacaoCEP, validacaoVazia, validacaoData
} from './validation.js'
import { limparCampos } from './util.js'

const nome = document.querySelector('#nome');
const sobrenome = document.querySelector('#sobrenome');
const cpf = document.querySelector('#cpf');
const rg = document.querySelector('#rg');
const dataNasc = document.querySelector('#dataNascimento');
const logradouro = document.querySelector('#logradouro');
const numero = document.querySelector('#numero');
const cidade = document.querySelector('#cidade');
const estado = document.querySelector('#estado');
const cep = document.querySelector('#cep');
const email = document.querySelector('#email');
const telefone = document.querySelector('#telefone');
const matricula = document.querySelector('#matricula');
const funcao = document.querySelector('#funcao');
const setor = document.querySelector('#setor');

export function validaCamposDadosServidor() {

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

  nome.addEventListener('keyup', validaCampoNome);
  sobrenome.addEventListener('keyup', validaCampoSobrenome);
  cpf.addEventListener('keyup', validaCampoCpf);
  rg.addEventListener('keyup', validaCampoRg);
  matricula.addEventListener('keyup', validaCampoMatricula);
  funcao.addEventListener('keyup', validaCampoFuncao);
  setor.addEventListener('change', validaCampoSetor);
  dataNasc.addEventListener('keyup', validaCampoDataNasc);

  return (validaCampoNome() && validaCampoSobrenome() && validaCampoCpf() && validaCampoRg() && validaCampoDataNasc() && validaCampoMatricula()
    && validaCampoFuncao() && validaCampoSetor());

}

export function validaCamposContatoServidor() {
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
    if (estado.options[estado.selectedIndex].value > 0) {
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

  logradouro.addEventListener('keyup', validaCampoLogradouro);
  numero.addEventListener('keyup', validaCampoNumero);
  cidade.addEventListener('keyup', validaCampoCidade);
  estado.addEventListener('change', validaCampoEstado);
  cep.addEventListener('keyup', validaCampoCEP);
  telefone.addEventListener('keyup', validaCampoTelefone);
  email.addEventListener('keyup', validaCampoEmail);

  return (validaCampoLogradouro() && validaCampoNumero() && validaCampoCidade() && validaCampoEstado() && validaCampoCEP()
    && validaCampoEmail() && validaCampoTelefone());
}

export const listaDeCampos = [nome, sobrenome, cpf, rg, dataNasc, matricula, funcao, setor,
  logradouro, numero, cidade, estado, cep, email, telefone]
