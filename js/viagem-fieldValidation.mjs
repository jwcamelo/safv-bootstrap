import {
  validacaoApenasLetras, validacaoApenasNumeros, validacaoDataViagem, validacaoHora
} from './validation.js'


const data = document.querySelector('#data');
const hora = document.querySelector('#hora');
const localPartida = document.querySelector('#localPartida');
const localDestino = document.querySelector('#localDestino');

export function validaCampoData() {
  if (validacaoDataViagem(data.value)) {
    data.classList.remove('is-invalid');
    data.classList.add('is-valid');
    return true;
  } else {
    data.classList.remove('is-valid');
    data.classList.add('is-invalid');
    return false;
  }
}

export function validaCampoHora() {
  if (validacaoHora(hora.value)) {
    hora.classList.remove('is-invalid');
    hora.classList.add('is-valid');
    return true;
  } else {
    hora.classList.remove('is-valid');
    hora.classList.add('is-invalid');
    return false;
  }
}

export function validaCampoLocalPartida() {
  if (localPartida.selectedIndex > 0 && localPartida.value != localDestino.value) {
    localPartida.classList.remove('is-invalid');
    localPartida.classList.add('is-valid');
    return true;
  } else {
    localPartida.classList.remove('is-valid');
    localPartida.classList.add('is-invalid');
    return false;
  }
}

export function validaCampoLocalDestino() {
  if (localDestino.selectedIndex > 0 && localPartida.value != localDestino.value) {
    localDestino.classList.remove('is-invalid');
    localDestino.classList.add('is-valid');
    return true;
  } else {
    localDestino.classList.remove('is-valid');
    localDestino.classList.add('is-invalid');
    return false;
  }
}


data.addEventListener("keyup", validaCampoData);
hora.addEventListener("keyup", validaCampoHora);
localPartida.addEventListener("change", validaCampoLocalPartida);
localDestino.addEventListener("change", validaCampoLocalDestino);

export function validaViagem() {
  return (validaCampoData() && validaCampoHora() &&
    validaCampoLocalPartida() && validaCampoLocalDestino())
}

export const campos = {
  data, hora, localPartida, localDestino
}