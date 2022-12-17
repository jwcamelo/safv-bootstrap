import { validacaoApenasNumeros } from "./validation.js";

const btnBuscar = document.querySelector('#btn-buscar');
const buscar = document.querySelector('#buscar');

function validaCampoMatricula() {
  if (validacaoApenasNumeros(buscar.value) && buscar.value.length > 4 && buscar.value.length < 10) {
    buscar.classList.remove('is-invalid');
    buscar.classList.add('is-valid');
    return true;
  } else {
    buscar.classList.remove('is-valid');
    buscar.classList.add('is-invalid');
    return false;
  }
}

buscar.addEventListener('keyup', validaCampoMatricula)

function getByMatricula() {
  if (validaCampoMatricula()) {
    const matriculaSelecionada = buscar.value;
    let servidores = JSON.parse(sessionStorage.getItem("servidores"));

    for (let servidor of servidores) {
      if (servidor.matricula == matriculaSelecionada) {
        window.location.href = `../servidor/servidor-editar.html?${matriculaSelecionada}`
      } else {
        $('#servidoraNotFoundModal').modal('show');

      }
    }
  }
}

btnBuscar.addEventListener('click', getByMatricula);