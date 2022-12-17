import { sendHttpRequest } from "./xhr.js";
import { validaCampoMatricula } from "./validation.js";
import { campos, validaViagem } from "./viagem-fieldValidation.mjs";

let tbodyMotoristas = document.querySelector(".tbody-motoristas");
let tbodyServidores = document.querySelector(".tbody-servidores");
let tbodyVeiculos = document.querySelector(".tbody-veiculos");
let tipo = document.querySelector('#tipo');
let viagemsNaDataSelecionada = []
let veiculosDoTipoSelecionado = []
let veiculosDisponiveis = []
let motoristasDaCategoriaSelecionada = []
let motoristasDisponiveis = []
let servidoresDisponiveis = []

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

              // VERIFICA EXISTEM ENTIDADES COMPATÍVES DISPONÍVEIS NO DIA DA VIAGEM
              for (let veiculoDisponivel of veiculosDoTipoSelecionado) {
                for (let viagem of viagemsNaDataSelecionada) {
                  for (let veiculo of viagem.veiculos) {
                    if (veiculoDisponivel.placa == veiculo.placa) {
                      const index = veiculosDoTipoSelecionado.indexOf(veiculoDisponivel);
                      veiculosDoTipoSelecionado.splice(index, 1);
                    }
                  }
                }
              }

              // VERIFICA SE EXISTEM VEICULOS DISPONIVES
              if (veiculosDoTipoSelecionado.length > 0) {
                veiculosDisponiveis.push(veiculosDoTipoSelecionado[0])
              } else {
                $('#addVeiculoModal').modal('hide');
                $('#veiculoNotAvailable').modal('show');
                setTimeout(() => {
                  $('#veiculoNotAvailable').modal('hide');
                }, 5000)
              }
            }).then(data => {
              console.log(data);
              const categoria = tipo.value == 'microonibus' ? 'D' : 'AB';
              sendHttpRequest('get', `https://safv-api-production.up.railway.app/motorista/categoria?categoria=${categoria}`)
                .then(data => {
                  motoristasDaCategoriaSelecionada = data

                  //VERIFICA SE EXISTEM MOTORISTAS DISPONIVEIS PARA ESTA DATA
                  // VERIFICA EXISTEM ENTIDADES COMPATÍVES DISPONÍVEIS NO DIA DA VIAGEM
                  for (let motoristaDisponivel of motoristasDaCategoriaSelecionada) {
                    for (let viagem of viagemsNaDataSelecionada) {
                      for (let motorista of viagem.motoristas) {
                        if (motoristaDisponivel.cnh == motorista.cnh) {
                          const index = motoristasDaCategoriaSelecionada.indexOf(motoristaDisponivel);
                          motoristasDaCategoriaSelecionada.splice(index, 1);
                        }
                      }
                    }
                  }

                  //VERIFICA SE EXISTEM MOTORISTAS DISPONIVEIS
                  if (motoristasDaCategoriaSelecionada.length > 0) {
                    motoristasDisponiveis.push(motoristasDaCategoriaSelecionada[0])

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
                    $('#addVeiculoModal').modal('hide');
                    document.querySelector('#btn-add-veiculo').classList.add('d-none');
                    document.querySelector('#btn-excluir-veiculo').classList.remove('d-none');
                    document.querySelector('.table-container-servidor').classList.remove('d-none');
                  }

                })

            })
        })

    } else {
      tipo.classList.add('is-invalid');
    }
  }
}

function adicionarServidor() {
  if (validaViagem() && validaCampoMatricula()) {
    let matricula = document.querySelector('#matricula').value;
    let matriculasComViagem = []
    for (let viagem of viagemsNaDataSelecionada) {
      for (let servidor of viagem.servidores) {
        matriculasComViagem.push(servidor.matricula);
      }
    }
    if (matriculasComViagem.includes(matricula)) {
      document.querySelector('#servidor-indisponivel-alert').classList.remove('d-none');
    } else {
      document.querySelector('#servidor-indisponivel-alert').classList.add('d-none');
      sendHttpRequest('get', `https://safv-api-production.up.railway.app/servidor/${matricula}`)
        .then(data => {
          console.log(data)
          if (data) {
            servidoresDisponiveis.push(data);
            $('#addServidorModal').modal('hide');


            tbodyServidores.innerHTML = ""

            for (let servidor of servidoresDisponiveis) {
              tbodyServidores.innerHTML += `
              <tr>
                  <td>${servidor.nome}</td>
                  <td>${servidor.sobrenome}</td>
                  <td class="visible-md-block">${servidor.matricula}</td>
                  <td class="visible-md-block">${servidor.funcao.nome}</td>
                  
              </tr>
              
              `
            }

            document.querySelector('#tb-servidor').classList.remove('d-none');


          }
          else {
            $('#addServidorModal').modal('hide')
            $('#servidorNotFoundModal').modal('show')
          }
        })
    }
  }
}

function solicitarViagem() {
  if (validaViagem() && servidoresDisponiveis.length > 0 && veiculosDisponiveis.length > 0
    && motoristasDisponiveis.length > 0) {
    console.log(veiculosDisponiveis)
    console.log(motoristasDisponiveis)
    console.log(servidoresDisponiveis)
    let placaVeiculos = []
    let cnhMotoristas = []
    let matriculaServidores = []
    for (let veiculo of veiculosDisponiveis) {
      placaVeiculos.push(veiculo.placa)
    }
    for (let motorista of motoristasDisponiveis) {
      cnhMotoristas.push(motorista.cnh)
    }
    for (let servidor of servidoresDisponiveis) {
      matriculaServidores.push(servidor.matricula)
    }


    document.querySelector('#servidor-indisponivel-alert').classList.add('d-none');
    sendHttpRequest('post', `https://safv-api-production.up.railway.app/viagem`, {
      data: campos.data.value,
      hora: campos.hora.value,
      localPartida: campos.localPartida.value,
      localDestino: campos.localDestino.value,
      placaVeiculos: placaVeiculos,
      cnhMotoristas: cnhMotoristas,
      matriculaServidores: matriculaServidores
    }).then(data => {
      console.log(data)
      $('#viagemSolicitadaModal').modal('show');
      setTimeout(() => {
        window.location.href = `home.html`
      }, 5000)
    })

  } else {
    document.querySelector('#form-alert').classList.remove('d-none')
  }


}



window.document.addEventListener("click", showTable)
document.querySelector('#btn-confirmAddVeiculo').addEventListener("click", adicionarVeiculo);
document.querySelector('#matricula').addEventListener("keyup", validaCampoMatricula);
document.querySelector('#btn-confirmAddServidor').addEventListener("click", adicionarServidor);
document.querySelector('.btn-save').addEventListener('click', solicitarViagem)
document.querySelector('.btn-exit').addEventListener("click", function () {
  window.location.href = `../viagem/viagem-consultar.html`
})



