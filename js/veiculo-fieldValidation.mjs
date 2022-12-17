import {
  validacaoApenasLetras, validacaoApenasNumeros
} from './validation.js'

const placa = document.querySelector('#placa');
const fabricante = document.querySelector('#fabricante');
const modelo = document.querySelector('#modelo');
const quilometragem = document.querySelector('#quilometragem');
const cor = document.querySelector('#cor');
const ano = document.querySelector('#ano');
const tipo = document.querySelector('#tipo');

export function validaVeiculo() {
  function validaCampoPlaca() {
    if (placa.value.length == 7) {
      placa.classList.add('is-valid');
      placa.classList.remove('is-invalid');
      return true;
    } else {
      placa.classList.add('is-invalid');
      placa.classList.remove('is-valid');
      return false;
    }
  }

  function validaCampoFabricante() {
    if (fabricante.selectedIndex > 0) {
      fabricante.classList.add('is-valid');
      fabricante.classList.remove('is-invalid');
      return true;
    } else {
      fabricante.classList.add('is-invalid');
      fabricante.classList.remove('is-valid');
      return false;
    }
  }

  function validaCampoQuilometragem() {
    if (quilometragem.value > 0 && quilometragem.value < 1000000) {
      quilometragem.classList.add('is-valid');
      quilometragem.classList.remove('is-invalid');
      return true;
    } else {
      quilometragem.classList.add('is-invalid');
      quilometragem.classList.remove('is-valid');
      return false;
    }
  }

  function validaCampoModelo() {
    if (modelo.value.length > 1 && modelo.value.length < 16) {
      modelo.classList.add('is-valid');
      modelo.classList.remove('is-invalid');
      return true;
    } else {
      modelo.classList.add('is-invalid');
      modelo.classList.remove('is-valid');
      return false;
    }
  }

  function validaCampoCor() {
    if (validacaoApenasLetras(cor) && cor.value.length > 3 && cor.value.length < 16) {
      cor.classList.add('is-valid');
      cor.classList.remove('is-invalid');
      return true;
    } else {
      cor.classList.add('is-invalid');
      cor.classList.remove('is-valid');
      return false;
    }
  }

  function validaCampoAno() {
    if (ano.value > 1999 && ano.value < 2023) {
      ano.classList.add('is-valid');
      ano.classList.remove('is-invalid');
      return true;
    } else {
      ano.classList.add('is-invalid');
      ano.classList.remove('is-valid');
      return false;
    }
  }

  function validaCampoTipo() {
    if (tipo.selectedIndex > 0) {
      tipo.classList.add('is-valid');
      tipo.classList.remove('is-invalid');
      return true;
    } else {
      tipo.classList.add('is-invalid');
      tipo.classList.remove('is-valid');
      return false;
    }
  }

  placa.addEventListener("keyup", validaCampoPlaca);
  fabricante.addEventListener("change", validaCampoFabricante);
  quilometragem.addEventListener("keyup", validaCampoQuilometragem);
  modelo.addEventListener("keyup", validaCampoModelo);
  cor.addEventListener("keyup", validaCampoCor);
  ano.addEventListener("keyup", validaCampoAno);
  tipo.addEventListener("change", validaCampoTipo);

  return (validaCampoPlaca() && validaCampoFabricante() && validaCampoQuilometragem()
    && validaCampoModelo() && validaCampoCor() && validaCampoAno() && validaCampoTipo())
}

export const campos = {
  placa, quilometragem, fabricante, modelo, cor, ano, tipo
}