import { servidores } from "./servidor-consultar.js";
import { listaDeCampos, validaCamposContatoServidor, validaCamposDadosServidor } from "./servidor-fieldValidation.mjs";


// Matricula passada como parâmetro na url
const matriculaSelecionada = window.location.href.split('?')[1];

//Preencher campos

for (let servidor of servidores) {
  if (servidor.matricula == matriculaSelecionada) console.log(servidor);
  listaDeCampos[0].value = servidor.nome;
  listaDeCampos[1].value = servidor.sobrenome;
  listaDeCampos[2].value = servidor.cpf;
  listaDeCampos[3].value = servidor.rg;
  listaDeCampos[4].value = servidor.dataDeNascimento;
  [...document.getElementsByName('sexo')].find(option => option.value == servidor.sexo).setAttribute("checked", "true")
  listaDeCampos[5].value = servidor.matricula;
  listaDeCampos[6].value = servidor.funcao;
  listaDeCampos[7].value = [...listaDeCampos[7].options].findIndex(option => option.text === servidor.setor);
  listaDeCampos[8].value = servidor.logradouro;
  listaDeCampos[9].value = servidor.numero;
  listaDeCampos[10].value = servidor.cidade;
  listaDeCampos[11].value = [...listaDeCampos[11].options].findIndex(option => option.text === servidor.estado);
  listaDeCampos[12].value = servidor.cep;
  listaDeCampos[13].value = servidor.email;
  listaDeCampos[14].value = servidor.telefone;
}

validaCamposDadosServidor();
validaCamposContatoServidor();

//Ações

//Voltar
const voltar = document.querySelector('.btn-back');
voltar.addEventListener('click', function () {
  document.querySelector('.page-2').classList.add('hidden');
  document.querySelector('.page-1').classList.remove('hidden');
});

//Continuar
const continuar = document.querySelector('.btn-next');
continuar.addEventListener('click', function () {
  if (validaCamposDadosServidor()) {
    document.querySelector('.page-1').classList.add('hidden');
    document.querySelector('.page-2').classList.remove('hidden');
    document.querySelector('.alert-danger').classList.add('d-none');

  }
  else {
    console.log("condicao = " + validaCamposDadosServidor())
    document.querySelector('.alert-danger').classList.remove('d-none');
  }
})

//Sair
const sair = document.querySelectorAll('.btn-exit');
for (let button of sair) {
  button.addEventListener('click', function () {
    window.location.href = `../servidor-consultar.html`
  });
}

//Atualizar
const atualizar = document.querySelector('.btn-update');
atualizar.addEventListener('click', function (e) {
  if (!(validaCamposDadosServidor() && validaCamposContatoServidor())) {
    e.preventDefault();
    $('#saveModal').modal({ show: false });
    document.querySelector('#alert2').classList.remove('d-none');

  } else {
    $('#saveModal').modal('show');
    document.querySelector('#alert2').classList.add('d-none');
  }
});

const salvar = document.querySelector('#btn-saveChanges');
salvar.addEventListener('click', function () {
  for (let servidor of servidores) {
    if (servidor.matricula === matriculaSelecionada) {
      servidor.nome = listaDeCampos[0].value;
      servidor.sobrenome = listaDeCampos[1].value;
      servidor.cpf = listaDeCampos[2].value;
      servidor.rg = listaDeCampos[3].value;
      servidor.dataDeNascimento = listaDeCampos[4].value;
      servidor.sexo = document.querySelector('input[name="sexo"]:checked').value;
      servidor.matricula = listaDeCampos[5].value;
      servidor.funcao = listaDeCampos[6].value;
      servidor.setor = listaDeCampos[7].options[listaDeCampos[7].selectedIndex].text;
      servidor.logradouro = listaDeCampos[8].value;
      servidor.numero = listaDeCampos[9].value;
      servidor.cidade = listaDeCampos[10].value;
      servidor.estado = listaDeCampos[11].options[listaDeCampos[11].selectedIndex].text;
      servidor.cep = listaDeCampos[12].value;
      servidor.email = listaDeCampos[13].value;
      servidor.telefone = listaDeCampos[14].value;

      localStorage.setItem("servidores", JSON.stringify(servidores));

      document.querySelector('#alert2').classList.add('d-none');
      window.location.href = `../servidor-consultar.html`
    }
  }
});

// Excluir

const excluir = document.querySelector('.btn-delete');
excluir.addEventListener('click', function () {
  $('#deleteModal').modal('show');
});

const confirmExcluir = document.querySelector('#btn-confirmDelete');
confirmExcluir.addEventListener('click', function () {
  for (let servidor of servidores) {
    if (servidor.matricula === matriculaSelecionada) {
      const index = servidores.indexOf(servidor);
      servidores.splice(index, 1);
      localStorage.setItem("servidores", JSON.stringify(servidores));
      window.location.href = `../servidor-consultar.html`
    }
  }
});
