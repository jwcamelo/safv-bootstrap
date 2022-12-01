import { sendHttpRequest } from "./xhr.js";

const url = "https://safvroma.herokuapp.com/motorista";



function get(url) {
  let request = new XMLHttpRequest();
  request.open('GET', url, false);
  request.send();
  return JSON.parse(request.responseText);
}

export let motoristas = get(url);


window.addEventListener('load', function () {
  let tbody = document.querySelector('.tbody');

  for (let motorista of motoristas) {
    if (tbody) {
      tbody.innerHTML += `
    <tr>
     
      <td>${motorista.nome}</td>
      <td>${motorista.sobrenome}</td>
      <td class="visible-md-block">${motorista.cnh}</td>
      <td class="visible-md-block">${motorista.email}</td>
      
      <td><div>
      <a href="motorista-editar.html?${motorista.cnh}">
      <i  class="fal fa-search"></i></a><a class="btn-delete" value="${motorista.cnh}"><i class="fal fa-trash"></a></div></td>
      
      </tr>
    `
    }
  }

  const btnDelete = document.getElementsByClassName('btn-delete');
  for (let btn of btnDelete) {
    btn.addEventListener('click', function () {
      let cnhSelecionada = btn.getAttribute('value');
      $('#deleteModal').modal('show');
      const confirmExcluir = document.querySelector('#btn-confirmDelete');

      confirmExcluir.addEventListener('click', function () {
        sendHttpRequest('DELETE', `https://safvroma.herokuapp.com/motorista/${cnhSelecionada}`)
          .then(console.log("dados excluídos")).catch(err => console.log(err));

        setTimeout(() => {
          window.location.href = `../motorista-consultar.html`
        }, "2000");
      });
    });
  }
});






