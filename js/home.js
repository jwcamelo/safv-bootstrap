const profile = document.querySelector('#link-usuarioLogado');
const logout = document.querySelector('#link-logout');

const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));

profile.innerHTML = `${usuarioLogado.nome} ${usuarioLogado.sobrenome}`
logout.addEventListener("click", () => {
  fetch("/logoff").then(() => {
    location.href = '../index.html';
  }
  );
})