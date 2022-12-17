import { validacaoApenasNumeros } from '../js/validation.js'

const btnBuscar = document.querySelector('#btn-buscar');
const buscar = document.querySelector('#buscar');


function validaCampoID() {
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

buscar.addEventListener('keyup', validaCampoID)

function getByID() {
  if (validaCampoID()) {
    const idSelecionado = buscar.value;
    let viagens = JSON.parse(sessionStorage.getItem("viagens"));

    for (let viagem of viagens) {
      if (viagem.id == idSelecionado) {
        window.location.href = `../viagem/viagem-editar.html?${idSelecionado}`
      } else {
        $('#viagemNotFoundModal').modal('show');

      }
    }
  }
}

btnBuscar.addEventListener('click', getByID);