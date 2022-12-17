let motoristasCadastrados = []

window.addEventListener('load', function () {
  let tbody = document.querySelector('.tbody');

  if (tbody) {
    fetch("/motoristas").then((res) => {
      res.json().then(motoristas => {
        motoristas.map(motorista => {
          motoristasCadastrados.push(motorista);
          tbody.innerHTML += `
          <tr>
     
          <td>${motorista.nome}</td>
          <td>${motorista.sobrenome}</td>
          <td class="visible-md-block">${motorista.cnh}</td>
          <td class="visible-md-block">${motorista.categoria}</td>
          <td class="visible-md-block">${motorista.email}</td>
          
          <td><div>
          <a class="btn-delete" href="../motorista/motorista-editar.html?${motorista.cnh}">
          <i  class="fal fa-search"></i></a><a class="btn-delete" value="${motorista.cnh}"><i class="fal fa-trash"></a></div></td>
          
          </tr>
        `

          const btnDelete = document.getElementsByClassName('btn-delete');
          for (let btn of btnDelete) {
            btn.addEventListener('click', function () {
              let cnhSelecionada = btn.getAttribute('value');
              $('#deleteModal').modal('show');
              const confirmExcluir = document.querySelector('#btn-confirmDelete');

              confirmExcluir.addEventListener('click', function () {
                fetch("/motorista", {
                  method: 'DELETE',
                  body: JSON.stringify({
                    cnh: cnhSelecionada
                  }),
                  headers: { "content-type": "application/json" }
                }).then(
                  setTimeout(() => {
                    window.location.href = `../motorista/motorista-consultar.html`
                  }, "3000")).catch(err => console.log(err));
              });
            });
          }
        })


        this.sessionStorage.setItem("motoristas", JSON.stringify(motoristasCadastrados))

      })
    })
  }


})









