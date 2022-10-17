export let servidores = JSON.parse(localStorage.getItem('servidores'));

function teste(string) {
  console.log(string);
}

window.addEventListener('load', function () {
  let tbody = document.querySelector('.tbody');
  function teste(string) {
    console.log(string);
  }

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
        for (let servidor of servidores) {
          if (servidor.matricula === matriculaSelecionada) {
            const index = servidores.indexOf(servidor);
            servidores.splice(index, 1);
            localStorage.setItem("servidores", JSON.stringify(servidores));
            window.location.href = `../servidor-consultar.html`
          }
        }
      })
    }
    );
  }
});






