let veiculosCadastrados = []

window.addEventListener('load', function () {
  let tbody = document.querySelector('.tbody');

  if (tbody) {
    fetch("/veiculos").then((res) => {
      res.json().then(veiculos => {
        veiculos.map(veiculo => {
          veiculosCadastrados.push(veiculo);
          tbody.innerHTML += `
          <tr>
     
          <td>${veiculo.placa}</td>
          <td>${veiculo.modelo}</td>
          <td class="visible-md-block">${veiculo.ano}</td>
          <td class="visible-md-block">${veiculo.tipo}</td>
          
          
          <td><div>
          <a class="btn-delete" href="../veiculo/veiculo-editar.html?${veiculo.placa}">
          <i  class="fal fa-search"></i></a><a class="btn-delete" value="${veiculo.placa}"><i class="fal fa-trash"></a></div></td>
          
          </tr>
        `

          const btnDelete = document.getElementsByClassName('btn-delete');
          for (let btn of btnDelete) {
            btn.addEventListener('click', function () {
              let placaSelecionada = btn.getAttribute('value');
              $('#deleteModal').modal('show');
              const confirmExcluir = document.querySelector('#btn-confirmDelete');

              confirmExcluir.addEventListener('click', function () {
                fetch("/veiculo", {
                  method: 'DELETE',
                  body: JSON.stringify({
                    placa: placaSelecionada
                  }),
                  headers: { "content-type": "application/json" }
                }).then(
                  setTimeout(() => {
                    window.location.href = `../veiculo/veiculo-consultar.html`
                  }, "3000")).catch(err => console.log(err));
              });
            });
          }
        })


        this.sessionStorage.setItem("veiculos", JSON.stringify(veiculosCadastrados))

      })
    })
  }


})









