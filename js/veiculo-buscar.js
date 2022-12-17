const btnBuscar = document.querySelector('#btn-buscar');
const buscar = document.querySelector('#buscar');

function validaCampoPlaca() {
  if (buscar.value.length == 7) {
    buscar.classList.remove('is-invalid');
    buscar.classList.add('is-valid');
    return true;
  } else {
    buscar.classList.remove('is-valid');
    buscar.classList.add('is-invalid');
    return false;
  }
}

buscar.addEventListener('keyup', validaCampoPlaca)

function getByPlaca() {
  if (validaCampoPlaca()) {
    const placaSelecionada = buscar.value.toUpperCase();
    let veiculos = JSON.parse(sessionStorage.getItem("veiculos"));

    for (let veiculo of veiculos) {
      if (veiculo.placa == placaSelecionada) {
        window.location.href = `../veiculo/veiculo-editar.html?${placaSelecionada}`
      } else {
        $('#veiculoNotFoundModal').modal('show');

      }
    }
  }
}

btnBuscar.addEventListener('click', getByPlaca);