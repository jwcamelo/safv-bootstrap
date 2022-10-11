jQuery(function ($) {

  // Definições de Máscaras
  $(".mascara-data").mask("99/99/9999");
  $(".mascara-cpf").mask("999.999.999-99");
  $(".mascara-cnpj").mask("99.999.999/9999-99");
  $(".mascara-telefone").mask("(99)9999-9999?9");
  $(".mascara-cep").mask("99.999-999");
  $(".mascara-rg").mask("9.999.999");



  // Visibilidade da sidebar e form de cadastro
  $('.sidebar ul li').on('click', function () {
    $('.sidebar ul li.active').removeClass('active');
    $(this).addClass('active');
  });

  $('.open-btn').on('click', function () {
    $('.sidebar').addClass('active');
  });

  $('.close-btn').on('click', function () {
    $('.sidebar').removeClass('active');
  });

});


// Funções de botões 

export function limparCampos(listaDeCampos) {
  if (listaDeCampos) {
    for (let campo of listaDeCampos) {
      campo.classList.remove('is-invalid');
      campo.classList.remove('is-valid');

      document.querySelector('#form').reset();
      document.querySelector('.page-2').classList.add('hidden');
      document.querySelector('.page-1').classList.remove('hidden');
    }
  }

}

export function btnContinuar(condicao) {
  if (condicao) {
    document.querySelector('.page-1').classList.add('hidden');
    document.querySelector('.page-2').classList.remove('hidden');
    document.querySelector('.alert-danger').classList.add('d-none');

  }
  else {
    console.log("condicao = " + condicao)
    document.querySelector('.alert-danger').classList.remove('d-none');
  }
}

export function btnVoltar() {
  document.querySelector('.page-2').classList.add('hidden');
  document.querySelector('.page-1').classList.remove('hidden');
}





