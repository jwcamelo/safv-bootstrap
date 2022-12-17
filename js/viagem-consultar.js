let viagensCadastradas = []

window.addEventListener('load', function () {
  let tbody = document.querySelector('.tbody');

  if (tbody) {
    fetch("/viagens").then((res) => {
      res.json().then(veiagens => {
        veiagens.map(viagem => {
          viagensCadastradas.push(viagem);
          tbody.innerHTML += `
          <tr>
     
          <td class="visible-md-block">${viagem.id}</td>
          <td class="visible-md-block">${viagem.data}</td>
          <td>${viagem.localPartida}</td>
          <td>${viagem.localDestino}</td>
          <td class="visible-md-block">${viagem.hora}</td>
          
          <td><div>
          <a class="btn-delete" href="../viagem/viagem-editar.html?${viagem.id}">
          <i  class="fal fa-search"></i></a><a class="btn-delete" value="${viagem.id}"><i class="fal fa-trash"></a></div></td>
          
          </tr>
        `

          const btnDelete = document.getElementsByClassName('btn-delete');
          for (let btn of btnDelete) {
            btn.addEventListener('click', function () {
              let idSelecionado = btn.getAttribute('value');
              $('#deleteModal').modal('show');
              const confirmExcluir = document.querySelector('#btn-confirmDelete');

              confirmExcluir.addEventListener('click', function () {
                fetch("/viagem", {
                  method: 'DELETE',
                  body: JSON.stringify({
                    id: idSelecionado
                  }),
                  headers: { "content-type": "application/json" }
                }).then(
                  setTimeout(() => {
                    window.location.href = `../viagem/viagem-consultar.html`
                  }, "3000")).catch(err => console.log(err));
              });
            });
          }
        })


        this.sessionStorage.setItem("viagens", JSON.stringify(viagensCadastradas))

      })
    })
  }


})









