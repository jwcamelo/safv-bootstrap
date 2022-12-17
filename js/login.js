import { validacaoEmail, validacaoCPF } from "./validation.js";

const email = document.querySelector('#email');
const senha = document.querySelector('#senha');
const emailRecuperar = document.querySelector('#emailRecuperarSenha');
const cpfRecuperar = document.querySelector('#cpfRecuperarSenha');

sessionStorage.removeItem("usuarioLogado");



function validaCampoEmailRecuperar() {
  if (validacaoEmail(emailRecuperar.value)) {
    emailRecuperar.classList.remove('is-invalid');
    emailRecuperar.classList.add('is-valid');
    return true;
  } else {
    emailRecuperar.classList.remove('is-valid');
    emailRecuperar.classList.add('is-invalid');
    return false;
  }
}

function validaCampoEmail() {
  if (validacaoEmail(email.value)) {
    email.classList.remove('is-invalid');
    email.classList.add('is-valid');
    return true;
  } else {
    email.classList.remove('is-valid');
    email.classList.add('is-invalid');
    return false;
  }
}

function validaCampoCpf() {
  if (validacaoCPF(cpfRecuperar.value)) {
    cpfRecuperar.classList.remove('is-invalid');
    cpfRecuperar.classList.add('is-valid');
    return true;
  } else {
    cpfRecuperar.classList.remove('is-valid');
    cpfRecuperar.classList.add('is-invalid');
    return false;
  }
}

function validaCampoSenha() {
  if (senha.value.length > 4 && senha.value.length < 16) {
    senha.classList.remove('is-invalid');
    senha.classList.add('is-valid');
    return true;
  } else {
    senha.classList.remove('is-valid');
    senha.classList.add('is-invalid');
    return false;
  }
}

emailRecuperar.addEventListener("keyup", validaCampoEmailRecuperar);
cpfRecuperar.addEventListener("keyup", validaCampoCpf);
email.addEventListener("keyup", validaCampoEmail);
senha.addEventListener("keyup", validaCampoSenha);

const entrar = document.querySelector('#btn-entrar');

entrar.addEventListener('click', logar);

function logar(e) {
  e.preventDefault();
  if (validaCampoEmail() && validaCampoSenha()) {
    const servidor = document.querySelector("#servidor");
    const tipoUsuario = servidor.checked ? "servidor" : "motorista";

    fetch("/login", {
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
        senha: senha.value,
        tipoUsuario: tipoUsuario
      }),
      headers: { "content-type": "application/json" }
    }).then(async (resp) => {
      const response = await resp.text();
      if (response !== 'autenticação falhou') {
        location.href = '/restrito/home.html';
        document.querySelector('.alert-incorrect-pwd').classList.add('d-none');
        sessionStorage.setItem("usuarioLogado", response);
        sessionStorage.setItem("tipoUsuario", tipoUsuario);
      } else {
        document.querySelector('.alert-incorrect-pwd').classList.remove('d-none');
        senha.classList.remove('is-valid');
        email.classList.remove('is-valid');
      }
    })
  }
}
