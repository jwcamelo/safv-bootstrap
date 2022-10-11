export let servidores = JSON.parse(localStorage.getItem('servidores'));

window.addEventListener('load', function () {
  let tbody = document.querySelector('.tbody');

  for (let servidor of servidores) {
    if (tbody) {


      tbody.innerHTML += `
    <tr>
      <th scope="row">${servidores.indexOf(servidor)}</th>
      <td>${servidor.nome}</td>
      <td>${servidor.sobrenome}</td>
      <td class="visible-md-block">${servidor.matricula}</td>
      <td class="visible-md-block">${servidor.funcao}</td>
      <td class="visible-md-block">${servidor.setor}</td>
      <td><div>
      <a href="servidor-detalhes.html?${servidor.matricula}">
      <i  class="fal fa-search"></i></a><i class="fal fa-trash"></div></td>
      
      </tr>
    `
    }
  }
})

