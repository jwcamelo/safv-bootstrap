const nome = document.querySelector('#nome');
const sobrenome = document.querySelector('#sobrenome');
const cpf = document.querySelector('#cpf');
const dataNasc = document.querySelector('#dataNascimento');
const logradouro = document.querySelector('#logradouro');
const numero = document.querySelector('#numero');
const cep = document.querySelector('#cep');
const complemento = document.querySelector('#complemento');
const matricula = document.querySelector('#matricula');
const funcao = document.querySelector('#funcao');
const setor = document.querySelector('#setor');
const emailSes = document.querySelector('#emailses');
const email = document.querySelector('#email');
const telefone = document.querySelector('#telefone');
const cnh = document.querySelector("#cnh");
const categoria = document.querySelector("#categoria");
const camposServidor = document.querySelector("#campos-servidor");
const camposMotorista = document.querySelector("#campos-motorista");
const senhaAtual = document.querySelector("#senhaAtual");
const novaSenha = document.querySelector('#novaSenha');
const confirmNovaSenha = document.querySelector('#confirmNovaSenha');
const btnAlterarSenha = document.querySelector('#enviarAlteracaoSenha');

const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
console.log(usuarioLogado)
const tipoUsuario = sessionStorage.getItem("tipoUsuario");

// PRENCHIMENTO DO FORMULARIO READONLY
nome.value = usuarioLogado.nome;
sobrenome.value = usuarioLogado.sobrenome;
dataNasc.value = usuarioLogado.dataDeNascimento;
cpf.value = usuarioLogado.cpf;
logradouro.value = usuarioLogado.logradouro;
numero.value = usuarioLogado.numero;
complemento.value = usuarioLogado.complemento;
cep.value = usuarioLogado.cep;
email.value = usuarioLogado.email;

if (usuarioLogado.emailSes) {
  camposMotorista.classList.add("d-none");
  camposServidor.classList.remove("d-none");

  emailSes.value = usuarioLogado.emailSes;
  setor.value = usuarioLogado.setor.nome;
  funcao.value = usuarioLogado.funcao.nome;
  matricula.value = usuarioLogado.matricula;

} else {
  camposServidor.classList.add("d-none");
  camposMotorista.classList.remove("d-none");

  cnh.value = usuarioLogado.cnh;
  categoria.value = usuarioLogado.categoria;
}

//ALTERAR SENHA

function validaCampoSenha() {
  if (senhaAtual.value === usuarioLogado.senha) {
    senhaAtual.classList.remove('is-invalid');
    senhaAtual.classList.add('is-valid');
    return true;
  } else {
    senhaAtual.classList.remove('is-valid');
    senhaAtual.classList.add('is-invalid');
    return false;
  }
}

function validaCampoNovaSenha() {
  if (novaSenha.value.length > 4 && novaSenha.value.length < 16 && novaSenha.value != senhaAtual.value) {
    novaSenha.classList.remove('is-invalid');
    novaSenha.classList.add('is-valid');
    return true;
  } else {
    novaSenha.classList.remove('is-valid');
    novaSenha.classList.add('is-invalid');
    return false;
  }
}

function validaConfirmSenha(senha) {
  if (confirmNovaSenha.value.length > 4 && senha.value === confirmNovaSenha.value) {
    confirmNovaSenha.classList.remove('is-invalid');
    confirmNovaSenha.classList.add('is-valid');
    return true;
  } else {
    confirmNovaSenha.classList.remove('is-valid');
    confirmNovaSenha.classList.add('is-invalid');
    return false;
  }
}

senhaAtual.addEventListener("keyup", validaCampoSenha);
novaSenha.addEventListener("keyup", validaCampoNovaSenha);
confirmNovaSenha.addEventListener("keyup", () => { validaConfirmSenha(novaSenha) });

btnAlterarSenha.addEventListener("click", () => {
  if (validaCampoSenha() && validaCampoNovaSenha() && validaConfirmSenha(novaSenha)) {
    usuarioLogado.senha = novaSenha.value;
    fetch("/alterarSenha", {
      method: 'PUT',
      body: JSON.stringify({
        usuarioLogado,
        tipoUsuario: tipoUsuario
      }),
      headers: { "content-type": "application/json" }
    }).then(async (resp) => {
      const response = await resp.text();
      if (response == "OK") {
        document.querySelector(".senhaAlteradaAlert").classList.remove("d-none");
        setTimeout(() => {
          location.href = '../index.html'
        }, 4000)
      }
      else {
        document.querySelector(".senhaNaoAlteradaAlert").classList.remove("d-none");
      }
    })
  }

})

document.querySelector('.btn-exit').addEventListener("click", function () {
  location.href = './home.html'
})


