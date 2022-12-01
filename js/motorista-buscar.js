import { sendHttpRequest } from "./xhr.js";
import { validacaoApenasNumeros } from "./validation.js";


const btnBuscar = document.querySelector('#btn-buscar');
const buscar = document.querySelector('#buscar');

function validaCampoCNH() {
  if (validacaoApenasNumeros(buscar.value) && buscar.value.length > 8 && buscar.value.length < 12) {
    buscar.classList.remove('is-invalid');
    buscar.classList.add('is-valid');
    return true;
  } else {
    buscar.classList.remove('is-valid');
    buscar.classList.add('is-invalid');
    return false;
  }
}

buscar.addEventListener('keyup', validaCampoCNH)

function getByCNH() {
  if (validaCampoCNH()) {
    const cnhSelecionada = buscar.value;
    sendHttpRequest('GET', `https://safvroma.herokuapp.com/motorista?cnh=${cnhSelecionada}`)
      .then(response => {
        if (response.length > 0) {
          console.log(response);
          window.location.href = `../motorista-editar.html?${cnhSelecionada}`
        } else {
          $('#motoristaNotFoundModal').modal('show');
        }
      }).catch(err => console.log(err));
  }
}

btnBuscar.addEventListener('click', getByCNH)