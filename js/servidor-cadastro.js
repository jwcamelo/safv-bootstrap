
import { limparCampos } from './util.js'
import { validaCamposContatoServidor, validaCamposDadosServidor, listaDeCampos } from './servidor-fieldValidation.mjs';

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
    limparCampos(listaDeCampos);
    document.querySelector('.alert').classList.add('hidden');
  });
}


//Salvar
let salvar = document.querySelector('.btn-save');

salvar.addEventListener('click', function () {
  if (validaCamposContatoServidor()) {
    let servidores = JSON.parse(localStorage.getItem('servidores')) || [];
    const servidor = {
      nome: listaDeCampos[0].value,
      sobrenome: listaDeCampos[1].value,
      cpf: listaDeCampos[2].value,
      rg: listaDeCampos[3].value,
      dataDeNascimento: listaDeCampos[4].value,
      matricula: listaDeCampos[5].value,
      funcao: listaDeCampos[6].value,
      setor: listaDeCampos[7].options[listaDeCampos[7].selectedIndex].text,
      logradouro: listaDeCampos[8].value,
      numero: listaDeCampos[9].value,
      cidade: listaDeCampos[10].value,
      estado: listaDeCampos[11].options[listaDeCampos[11].selectedIndex].text,
      cep: listaDeCampos[12].value,
      email: listaDeCampos[13].value,
      telefone: listaDeCampos[14].value
    }

    const servidoresAtualizado = [...servidores, servidor];
    localStorage.setItem('servidores', JSON.stringify(servidoresAtualizado));
    alert("dados salvos")
    limparCampos(listaDeCampos);
    document.querySelector('#alert2').classList.add('d-none');

  } else {
    document.querySelector('#alert2').classList.remove('d-none');
  }
})









