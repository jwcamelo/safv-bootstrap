import { sendHttpRequest } from "./xhr.js";

// sendHttpRequest('get', "https://safv-api-production.up.railway.app/setor/1").then(
//   data => console.log(data)
// )

import { campos, validaViagem } from "./viagem-fieldValidation.mjs";
let tbodyMotoristas = document.querySelector(".tbody-motoristas");
let tbodyServidores = document.querySelector(".tbody-servidores");
let tbodyVeiculos = document.querySelector(".tbody-veiculos");
let tipo = document.querySelector('#tipo');
let addVeiculo = document.querySelector('#btn-confirmAddVeiculo');
let viagemsNaDataSelecionada = []
let veiculosDoTipoSelecionado = []
let veiculosDisponiveis = []
let motoristasDaCategoriaSelecionada = []
let motoristasDisponiveis = []

validaViagem();

function showTable() {
  if (validaViagem()) {
    document.querySelector('.table-container').classList.remove('d-none');
  } else {
    document.querySelector('.table-container').classList.add('d-none');
  }
}

function adicionarVeiculo() {
  if (validaViagem()) {
    if (tipo.selectedIndex > 0) {
      tipo.classList.remove('is-invalid');

      // BUSCA AS ENTIDADES SELECIONADAS
      sendHttpRequest('get', `https://safv-api-production.up.railway.app/viagem/data?data=${campos.data.value}`)
        .then(data => {
          viagemsNaDataSelecionada = data
          console.log("viagens adicionadas")
          sendHttpRequest('get', `https://safv-api-production.up.railway.app/veiculo/tipo?tipo=${tipo.value}`)
            .then(data => {
              console.log(data)
              veiculosDoTipoSelecionado = data
              console.log("veiculos do tipo selecionado req ")
              for (let veiculo of veiculosDoTipoSelecionado) {
                console.log(veiculo.placa)
              }

              // VERIFICA EXISTEM ENTIDADES COMPATÍVES DISPONÍVEIS NO DIA DA VIAGEM
              for (let veiculoDisponivel of veiculosDoTipoSelecionado) {
                for (let viagem of viagemsNaDataSelecionada) {
                  console.log("id viagem " + viagem.id);
                  for (let veiculo of viagem.veiculos) {
                    console.log("placa veiculos " + veiculo.placa)
                    if (veiculoDisponivel.placa == veiculo.placa) {
                      const index = veiculosDoTipoSelecionado.indexOf(veiculoDisponivel);
                      veiculosDoTipoSelecionado.splice(index, 1);
                    }
                  }
                }
              }

              console.log("veiculos do tipo selecionado filtro ")
              for (let veiculo of veiculosDoTipoSelecionado) {
                console.log(veiculo.placa)
              }


              console.log("veiculos filtrados")
              if (veiculosDoTipoSelecionado.length > 0) {
                veiculosDisponiveis.push(veiculosDoTipoSelecionado[0])
                console.log("veiculos disponivels placa ");
                for (let veiculo of veiculosDisponiveis) console.log(veiculo.placa)
              } else {
                alert("Não há veículo disponível para esta data")
              }
            }).then(data => {
              console.log(data);
              const categoria = tipo.value == 'microonibus' ? 'D' : 'AB';
              sendHttpRequest('get', `https://safv-api-production.up.railway.app/motorista/categoria?categoria=${categoria}`)
                .then(data => {
                  motoristasDaCategoriaSelecionada = data

                  console.log("motoristas do tipo selecionado req ")
                  for (let motorista of motoristasDaCategoriaSelecionada) {
                    console.log(motorista.cnh)
                  }

                  //VERIFICA SE EXISTEM MOTORISTAS DISPONIVEIS PARA ESTA DATA
                  // VERIFICA EXISTEM ENTIDADES COMPATÍVES DISPONÍVEIS NO DIA DA VIAGEM
                  for (let motoristaDisponivel of motoristasDaCategoriaSelecionada) {
                    for (let viagem of viagemsNaDataSelecionada) {
                      console.log("id viagem " + viagem.id);
                      for (let motorista of viagem.motoristas) {
                        console.log("cnh motoristas " + motorista.cnh)
                        if (motoristaDisponivel.cnh == motorista.cnh) {
                          const index = motoristasDaCategoriaSelecionada.indexOf(motoristaDisponivel);
                          motoristasDaCategoriaSelecionada.splice(index, 1);
                        }
                      }
                    }
                  }

                  console.log("motoristas do tipo selecionado filtro ")
                  for (let motorista of motoristasDaCategoriaSelecionada) {
                    console.log(motorista.cnh)
                  }

                  if (motoristasDaCategoriaSelecionada.length > 0) {
                    motoristasDisponiveis.push(motoristasDaCategoriaSelecionada[0])
                    console.log("veiculos disponivels placa ");
                    for (let veiculo of veiculosDisponiveis) console.log(veiculo.placa)
                  } else {
                    alert("Não há motorista disponível para esta data")
                  }

                  if (motoristasDisponiveis.length == veiculosDisponiveis.length) {

                    for (let veiculo of veiculosDisponiveis) {
                      tbodyVeiculos.innerHTML += `
                      <tr>
       
                          <td>${veiculo.placa}</td>
                          <td>${veiculo.modelo}</td>
                          <td class="visible-md-block">${veiculo.ano}</td>
                          <td class="visible-md-block">${veiculo.tipo}</td>
                          
                      </tr>
                      
                      `
                    }

                    for (let motorista of motoristasDisponiveis) {
                      tbodyMotoristas.innerHTML += `
                      <tr>
                          <td>${motorista.nome}</td>
                          <td>${motorista.sobrenome}</td>
                          <td class="visible-md-block">${motorista.cnh}</td>
                          <td class="visible-md-block">${motorista.categoria}</td>
                          
                      </tr>
                      
                      `
                    }

                    document.querySelector('#tb-veiculo').classList.remove('d-none');
                    document.querySelector('#tb-motorista').classList.remove('d-none');
                  } else {
                    "algo de errado nao esta certo"
                  }

                })

            })
        })

    } else {
      tipo.classList.add('is-invalid');
    }
  }
}


window.document.addEventListener("click", showTable)

addVeiculo.addEventListener("click", adicionarVeiculo);

