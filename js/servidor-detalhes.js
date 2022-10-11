import { servidores } from "./servidor-consultar.js";
import { listaDeCampos, validaCamposContatoServidor, validaCamposDadosServidor } from "./servidor-fieldValidation.mjs";
import { limparCampos } from "./util.js";

// Matricula passada como parâmetro na 
const matriculaSelecionada = window.location.href.split('?')[1];

for (let servidor of servidores) {
  if (servidor.matricula == matriculaSelecionada) console.log(servidor);
  listaDeCampos[0].value = servidor.nome;
  listaDeCampos[1].value = servidor.sobrenome;
  listaDeCampos[2].value = servidor.cpf;
  listaDeCampos[3].value = servidor.rg;
  listaDeCampos[4].value = servidor.dataDeNascimento;
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

//Limpar
const limpar = document.querySelectorAll('.btn-clear')
for (let button of limpar) {
  button.addEventListener('click', function () {
    limparCampos();
    document.querySelector('.alert').classList.add('hidden');
  });
}

//Atualizar
const atualizar = document.querySelector('.btn-update');
atualizar.addEventListener('click', function () {
  if (validaCamposDadosServidor() && validaCamposContatoServidor()) {
    for (let servidor of servidores) {
      if (servidor.matricula == matriculaSelecionada) {
        servidor.nome = listaDeCampos[0].value;
        servidor.sobrenome = listaDeCampos[1].value;
        servidor.cpf = listaDeCampos[2].value;
        servidor.rg = listaDeCampos[3].value;
        servidor.dataDeNascimento = listaDeCampos[4].value;
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

        alert("dados salvos")
        limparCampos(listaDeCampos);
        document.querySelector('#alert2').classList.add('d-none');
        window.location.href = `../servidor-consultar.html`

      }
    }


  } else {
    document.querySelector('#alert2').classList.remove('d-none');
  }
})

