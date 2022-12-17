import { campos } from "./viagem-fieldValidation.mjs";
let tbodyMotoristas = document.querySelector(".tbody-motoristas");
let tbodyServidores = document.querySelector(".tbody-servidores");
let tbodyVeiculos = document.querySelector(".tbody-veiculos");
let viagens = JSON.parse(sessionStorage.getItem("viagens"));


// Id passada como parâmetro na url
const idSelecionado = window.location.href.split('?')[1];

for (let viagem of viagens) {
  if (viagem.id == idSelecionado) {
    document.querySelector('#id').value = viagem.id;
    campos.data.value = viagem.data;
    campos.hora.value = viagem.hora;
    campos.localPartida.value = viagem.localPartida;
    campos.localDestino.value = viagem.localDestino;

    let servidores = viagem.servidores;
    let motoristas = viagem.motoristas;
    let veiculos = viagem.veiculos;

    for (let servidor of servidores) {
      tbodyServidores.innerHTML += `
      <tr>
 
        <td>${servidor.nome}</td>
        <td>${servidor.sobrenome}</td>
        <td class="visible-md-block">${servidor.matricula}</td>
        <td class="visible-md-block">${servidor.funcao.nome}</td>
      
      
      </tr>
    `
    }

    for (let motorista of motoristas) {
      tbodyMotoristas.innerHTML += `
      <tr>
 
        <td>${motorista.nome}</td>
        <td>${motorista.sobrenome}</td>
        <td class="visible-md-block">${motorista.cnh}</td>
        <td class="visible-md-block">${motorista.categoria}</td>
      
      </tr>
      `
    }

    for (let veiculo of veiculos) {
      tbodyVeiculos.innerHTML += `
      <tr>
 
        <td>${veiculo.placa}</td>
        <td>${veiculo.modelo}</td>
        <td class="visible-md-block">${veiculo.ano}</td>
        <td class="visible-md-block">${veiculo.tipo}</td>
      
      </tr>
      `
    }
  }
}

//Ações

//Sair
const sair = document.querySelector('.btn-exit');
sair.addEventListener('click', function () {
  window.location.href = `../viagem/viagem-consultar.html`
});



// Excluir

const excluirviagem = () => {
  fetch("/viagem", {
    method: 'DELETE',
    body: JSON.stringify({
      id: idSelecionado
    }),
    headers: { "content-type": "application/json" }
  }).then(
    setTimeout(() => {
      window.location.href = `../viagem/viagem-consultar.html`
    }, "3000")).catch(err => console.log(err));
}

const excluir = document.querySelector('.btn-delete');
excluir.addEventListener('click', function () {
  $('#deleteModal').modal('show');
});

const confirmExcluir = document.querySelector('#btn-confirmDelete');
confirmExcluir.addEventListener('click', excluirviagem)
