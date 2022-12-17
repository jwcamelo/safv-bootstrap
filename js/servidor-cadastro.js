
import { limparCampos } from './util.js'
import { campos, validaServidor } from "./servidor-fieldValidation.mjs";


//Preenchimento dropdown
function preencherFuncao() {
  fetch("/funcao").then((res) => {
    res.json().then(funcoes => {
      funcoes.map(funcao => {
        campos.funcao.innerHTML += `
     <option value="${funcao.id}">${funcao.nome}</option>
   `
      })
    })
  })
}

function preencherSetor() {
  fetch("/setor").then((res) => {
    res.json().then(setores => {
      setores.map(setor => {
        campos.setor.innerHTML += `
       <option value="${setor.id}">${setor.nome}</option>
     `
      })
    })
  })
}

preencherFuncao();
preencherSetor();
validaServidor()

//Ações

//Limpar
const limpar = document.querySelectorAll('.btn-clear')
for (let button of limpar) {
  button.addEventListener('click', function () {
    limparCampos(campos);
    document.querySelector('.alert').classList.add('hidden');
  });
}

//Sair
const sair = document.querySelector('.btn-exit');
sair.addEventListener('click', function () {
  window.location.href = `../servidor/servidor-consultar.html`
});

//Salvar
let btnSalvar = document.querySelector('.btn-save');
btnSalvar.addEventListener('click', function (e) {
  if (!validaServidor()) {
    e.preventDefault();
    $('#saveModal').modal({ show: false });
    document.querySelector('.alert').classList.remove('d-none');

  } else {
    $('#saveModal').modal('show');
    document.querySelector('.alert').classList.add('d-none');
  }
});


function salvar() {
  fetch("/servidor", {
    method: 'POST',
    body: JSON.stringify({
      matricula: campos.matricula.value,
      idFuncao: parseInt(campos.funcao.value),
      idSetor: parseInt(campos.setor.value),
      nome: campos.nome.value,
      sobrenome: campos.sobrenome.value,
      cpf: campos.cpf.value.replaceAll(".", "").replace("-", ""),
      dataDeNascimento: campos.dataNasc.value,
      logradouro: campos.logradouro.value,
      numero: parseInt(campos.numero.value),
      cep: parseInt(campos.cep.value.replace('.', "").replace('-', "")),
      complemento: campos.complemento.value,
      emailSes: campos.emailses.value,
      email: campos.email.value,
      sexo: campos.sexo.value

    }),
    headers: { "content-type": "application/json" }
  }).then(async (resp) => {
    const status = await resp.status;
    console.log(status);
    if (status == 201) {
      setTimeout(() => {
        window.location.href = `../servidor/servidor-consultar.html`
      }, "2000")
    } else {
      alert('não foi possível salvar')
    }
  })
}

const confirmSalvar = document.querySelector('#btn-saveChanges');
confirmSalvar.addEventListener('click', salvar);







