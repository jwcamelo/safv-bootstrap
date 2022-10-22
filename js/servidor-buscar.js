import { sendHttpRequest } from "./xhr.js";
import { validacaoApenasNumeros } from "./validation.js";

const btnBuscar = document.querySelector('#btn-buscar');
const buscar = document.querySelector('#buscar');

function validaCampoMatricula() {
  if (validacaoApenasNumeros(buscar.value)) {
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
    sendHttpRequest('GET', `https://safvroma.herokuapp.com/funcionario?matricula=${matriculaSelecionada}`)
      .then(response => {
        if (response.length > 0) {
          console.log(response);
          window.location.href = `../servidor-editar.html?${matriculaSelecionada}`
        } else {
          $('#servidorNotFoundModal').modal('show');
        }
      }).catch(err => console.log(err));
  }
}

btnBuscar.addEventListener('click', getByMatricula)