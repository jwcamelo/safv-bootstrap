import { sendHttpRequest } from "./xhr.js";

const url = "https://safvroma.herokuapp.com/funcionario";
const urlSetores = "https://safvroma.herokuapp.com/setor";
const urlFuncoes = "https://safvroma.herokuapp.com/funcao";


function get(url) {
  let request = new XMLHttpRequest();
  request.open('GET', url, false);
  request.send();
  return JSON.parse(request.responseText);
}

export let servidores = get(url);
export let setores = get(urlSetores);
export let funcoes = get(urlFuncoes);


window.addEventListener('load', function () {
  let tbody = document.querySelector('.tbody');

  for (let servidor of servidores) {
    if (tbody) {
      tbody.innerHTML += `
    <tr>
     
      <td>${servidor.nome}</td>
      <td>${servidor.sobrenome}</td>
      <td class="visible-md-block">${servidor.matricula}</td>
      <td class="visible-md-block">${servidor.funcao.nome}</td>
      <td class="visible-md-block">${servidor.setor.nome}</td>
      <td><div>
      <a href="servidor-editar.html?${servidor.matricula}">
      <i  class="fal fa-search"></i></a><a class="btn-delete" value="${servidor.matricula}"><i class="fal fa-trash"></a></div></td>
      
      </tr>
    `
    }
  }

  const btnDelete = document.getElementsByClassName('btn-delete');
  for (let btn of btnDelete) {
    btn.addEventListener('click', function () {
      let matriculaSelecionada = btn.getAttribute('value');
      $('#deleteModal').modal('show');
      const confirmExcluir = document.querySelector('#btn-confirmDelete');

      confirmExcluir.addEventListener('click', function () {
        sendHttpRequest('DELETE', `https://safvroma.herokuapp.com/funcionario/${matriculaSelecionada}`)
          .then(console.log("dados excluídos")).catch(err => console.log(err));

        setTimeout(() => {
          window.location.href = `../servidor-consultar.html`
        }, "2000");
      });
    });
  }
});






