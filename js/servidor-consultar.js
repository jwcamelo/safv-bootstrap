let servidoresCadastrados = []
let funcoesCadastradas = []
let setoresCadastrados = []

fetch("/funcao").then((res) => {
  res.json().then(funcoes => {
    funcoes.map(funcao => {
      funcoesCadastradas.push(funcao)
    })
  })
})

fetch("/setor").then((res) => {
  res.json().then(setores => {
    setores.map(setor => {
      setoresCadastrados.push(setor)
    })
  })
})

window.addEventListener('load', function () {

  let tbody = document.querySelector('.tbody');

  if (tbody) {
    fetch("/servidores").then((res) => {
      res.json().then(servidores => {
        servidores.map(servidor => {
          servidoresCadastrados.push(servidor);
          tbody.innerHTML += `
            <tr>
            
              <td>${servidor.nome}</td>
              <td>${servidor.sobrenome}</td>
              <td class="visible-md-block">${servidor.matricula}</td>
              <td class="visible-md-block">${servidor.funcao.nome}</td>
              <td class="visible-md-block">${servidor.setor.nome}</td>
              <td><div>
              <a href="../servidor/servidor-editar.html?${servidor.matricula}">
              <i  class="fal fa-search"></i></a><a class="btn-delete" value="${servidor.matricula}"><i class="fal fa-trash"></a></div></td>
              
              </tr>
          `
          const btnDelete = document.getElementsByClassName('btn-delete');
          for (let btn of btnDelete) {
            btn.addEventListener('click', function () {
              let matriculaSelecionada = btn.getAttribute('value');
              $('#deleteModal').modal('show');
              const confirmExcluir = document.querySelector('#btn-confirmDelete');

              confirmExcluir.addEventListener('click', function () {
                fetch("/servidor", {
                  method: 'DELETE',
                  body: JSON.stringify({
                    matricula: matriculaSelecionada
                  }),
                  headers: { "content-type": "application/json" }
                }).then(
                  setTimeout(() => {
                    window.location.href = `../servidor/servidor-consultar.html`
                  }, "3000")).catch(err => console.log(err));
              });
            });
          }
        });

        this.sessionStorage.setItem("servidores", JSON.stringify(servidoresCadastrados))
        this.sessionStorage.setItem("funcoes", JSON.stringify(funcoesCadastradas))
        this.sessionStorage.setItem("setores", JSON.stringify(setoresCadastrados))
      });
    });
  }
});


