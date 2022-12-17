const http = require('http');
const path = require('path');
const express = require('express');
const axios = require('axios');
let session = require('express-session');
const Crypt = require('./crypt');
const Mailer = require('./mailer')
const cors = require('cors');

const app = express()
const server = http.createServer(app)

app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*")
  app.use(cors());
  next();
});

app.use(express.urlencoded())
app.use(session({ secret: "abc" }))
app.set('port', process.env.PORT || 3000)

// Secção de login
app.use('/restrito/*', (req, res, next) => {
  if (req.session.email) {
    next();
  } else {
    res.redirect('../index.html')
  }
})

app.use(express.static(path.join(__dirname, '/')))

//Start server
server.listen(app.get('port'), () => {
  console.log('Running on port ', app.get('port'));
})


// Login 
app.post('/login', (req, res) => {
  let tipoUsuario = req.body.tipoUsuario;
  let email = req.body.email;

  const url = `https://safv-api-production.up.railway.app/${tipoUsuario}/email/${email}`

  //Request API getUserByEmail
  axios.get(url)
    .then(function (response) {
      if (req.body.senha === Crypt.Decrypt(response.data.senha)) {
        req.session.email = email;
        res.send(response.data);
      } else {
        res.send('autenticação falhou')
      }
    })
    .catch(function (error) {
      // handle error
      console.log("error= " + error);
      res.send('autenticação falhou');
    })
})


// Logoff
app.get("/logoff", (req, res) => {
  req.session.email = null;
  res.send("logff");
})


// Alteracao de senha
app.put("/alterarSenha", (req, res) => {
  const usuario = req.body.usuarioLogado;
  const tipoUsuario = req.body.tipoUsuario;

  if (tipoUsuario == 'motorista') {
    const {
      nome, sobrenome, cpf, dataDeNascimento, logradouro, numero, cep, complemento, email, sexo, primeiroAcesso,
      senha, cnh, categoria
    } = req.body.usuarioLogado;


    const assunto = "Alteracao de senha realizada no SAFV"
    const texto = `Nova senha: ${senhaAleatoria}`
    const recebedor = email;
    Mailer.sendEmail(assunto, texto, recebedor)

    //Request API update user
    axios.put(`https://safv-api-production.up.railway.app/motorista/${usuario.cnh}`, {
      nome, sobrenome, cpf, dataDeNascimento, logradouro, numero, cep, complemento, email, sexo, primeiroAcesso,
      senha, cnh, categoria
    })
      .then(function (response) {
        req.session.email = null;
        res.send(response.status)
      })
      .catch(function (error) {
        // handle error
        console.log("error= " + error);
        res.send(response.status)
      })
  }

  if (tipoUsuario == 'servidor') {
    const {
      nome, sobrenome, cpf, dataDeNascimento, logradouro, numero, cep, complemento, email, sexo, primeiroAcesso,
      senha, emailSes, matricula, admin
    } = req.body.usuarioLogado;

    const idSetor = usuario.setor.id;
    const idFuncao = usuario.funcao.id;

    //Request API update user
    axios.put(`https://safv-api-production.up.railway.app/servidor/${usuario.matricula}`, {
      nome, sobrenome, cpf, dataDeNascimento, logradouro, numero, cep, complemento, email, sexo, primeiroAcesso,
      senha, emailSes, matricula, admin, idSetor, idFuncao
    })
      .then(function (response) {
        req.session.email = null;
        res.send(response.status)
      })
      .catch(function (error) {
        // handle error
        console.log("error= " + error);
        res.send(response.status)
      })
  }

})

// GET FUNCAO
app.get('/funcao', (req, res) => {
  axios.get('https://safv-api-production.up.railway.app/funcao/')
    .then(response => {
      const data = response.data
      res.send(JSON.stringify(data));
    })
    .catch(error => console.log(error));
})


// GET SETOR
app.get('/setor', (req, res) => {
  axios.get('https://safv-api-production.up.railway.app/setor/')
    .then(response => {
      const data = response.data
      res.send(JSON.stringify(data));
    })
    .catch(error => console.log("error= " + error));
})


// MOTORISTA
// POST MOTORISTA
app.post('/motorista', (req, res) => {
  const {
    nome, sobrenome, cpf, dataDeNascimento,
    logradouro, numero, cep, complemento, email, cnh, categoria, sexo
  } = req.body;

  const primeiroAcesso = false;

  const senhaAleatoria = Math.random().toString(36).substring(0, 7);
  console.log(senhaAleatoria)

  const assunto = "Cadastro realizado no SAFV"
  const texto = `Seu cadastro foi realizado. Login: ${email} / Senha: ${senhaAleatoria}`
  const recebedor = email;
  Mailer.sendEmail(assunto, texto, recebedor)


  const senha = Crypt.Encrypt(senhaAleatoria).toString();
  console.log("senha = " + senha)

  // Request API create user
  axios.post(`https://safv-api-production.up.railway.app/motorista`, {
    nome, sobrenome, cpf, dataDeNascimento,
    logradouro, numero, cep, complemento, email, cnh, categoria, sexo, senha, primeiroAcesso
  })
    .then(function (response) {
      console.log(response.data)
      res.send(response.status)
    })
    .catch(function (error) {
      // handle error
      console.log("error= " + error);
      res.send(response.status)
    })

})

// PUT MOTORISTA
app.put('/motorista', (req, res) => {
  const {
    nome, sobrenome, cpf, dataDeNascimento,
    logradouro, numero, cep, complemento, email, cnh, categoria, sexo, senha
  } = req.body;

  const primeiroAcesso = false;

  // Request API update user
  axios.put(`https://safv-api-production.up.railway.app/motorista/${cnh}`, {
    nome, sobrenome, cpf, dataDeNascimento,
    logradouro, numero, cep, complemento, email, cnh, categoria, sexo, senha, primeiroAcesso
  })
    .then(function (response) {
      console.log(response.data)
      res.send(response.status)
    })
    .catch(function (error) {
      // handle error
      console.log("error= " + error);
      res.send(response.status)
    })

})

// GET ALL MOTORISTA
app.get('/motoristas', (req, res) => {
  axios.get('https://safv-api-production.up.railway.app/motorista/')
    .then(response => {
      const data = response.data
      res.send(JSON.stringify(data));
    })
    .catch(error => console.log(error));
})

// DELETE MOTORISTA
app.delete('/motorista', (req, res) => {
  const cnh = req.body.cnh
  axios.delete(`https://safv-api-production.up.railway.app/motorista/${cnh}`)
    .then(response => {
      const status = response.status
      res.send(status);
    })
    .catch(error => console.log(error));
})


//SERVIDOR
// POST SERVIDOR
app.post('/servidor', (req, res) => {
  const {
    nome, sobrenome, cpf, dataDeNascimento, emailSes,
    logradouro, numero, cep, complemento, email, matricula, sexo, idSetor, idFuncao
  } = req.body;

  const primeiroAcesso = false;
  const admin = true;

  const senhaAleatoria = Math.random().toString(36).substring(0, 7);
  console.log(senhaAleatoria)

  const senha = Crypt.Encrypt(senhaAleatoria).toString();
  console.log("senha = " + senha)

  // Request API create servidor
  axios.post(`https://safv-api-production.up.railway.app/servidor`, {
    nome, sobrenome, cpf, dataDeNascimento, emailSes, idFuncao, idSetor, senha,
    logradouro, numero, cep, complemento, email, matricula, sexo, primeiroAcesso, admin
  })
    .then(function (response) {
      console.log(response.data)
      res.send(response.status)
    })
    .catch(function (error) {
      // handle error
      console.log("error= " + error);
      res.send(response.status)
    })

})

// GET ALL SERVIDOR
app.get('/servidores', (req, res) => {
  axios.get('https://safv-api-production.up.railway.app/servidor/')
    .then(response => {
      const data = response.data
      res.send(JSON.stringify(data));
    })
    .catch(error => console.log(error));
})

// DELETE SERVIDOR
app.delete('/servidor', (req, res) => {
  const matricula = req.body.matricula
  console.log("matricula = " + matricula)
  axios.delete(`https://safv-api-production.up.railway.app/servidor/${matricula}`)
    .then(response => {
      const status = response.status
      res.send(status);
    })
    .catch(error => console.log(error));
})

// PUT SERVIDOR
app.put('/servidor', (req, res) => {

  const {
    nome, sobrenome, cpf, dataDeNascimento, emailSes, idSetor, idFuncao,
    logradouro, numero, cep, complemento, email, matricula, sexo, senha, admin
  } = req.body;

  const primeiroAcesso = false;

  // Request API update user
  axios.put(`https://safv-api-production.up.railway.app/servidor/${matricula}`, {
    nome, sobrenome, cpf, dataDeNascimento, emailSes, primeiroAcesso,
    logradouro, numero, cep, complemento, email, matricula, sexo, senha, admin, idSetor, idFuncao
  }).then(function (response) {
    console.log(response.data)
    res.send(response.status)
  }).catch(function (error) {
    // handle error
    console.log("error= " + error);
    res.send(response.status)
  })
})

//VEICULO
// POST VEICULO
app.post('/veiculo', (req, res) => {
  const {
    placa, fabricante, quilometragem, cor, ano, modelo, tipo
  } = req.body;

  // Request API create servidor
  axios.post(`https://safv-api-production.up.railway.app/veiculo`, {
    placa, fabricante, quilometragem, cor, ano, modelo, tipo
  })
    .then(function (response) {
      console.log(response.data)
      res.send(response.status)
    })
    .catch(function (error) {
      // handle error
      console.log("error= " + error);
      res.send(response.status)
    })
})

// GET ALL VEICULO
app.get('/veiculos', (req, res) => {
  axios.get('https://safv-api-production.up.railway.app/veiculo/')
    .then(response => {
      const data = response.data
      res.send(JSON.stringify(data));
    })
    .catch(error => console.log(error));
})

// DELETE VEICULO
app.delete('/veiculo', (req, res) => {
  const placa = req.body.placa
  console.log("placa = " + placa)
  axios.delete(`https://safv-api-production.up.railway.app/veiculo/${placa}`)
    .then(response => {
      const status = response.status
      res.send(status);
    })
    .catch(error => console.log(error));
})

// PUT VEICULO
app.put('/veiculo', (req, res) => {

  const {
    placa, fabricante, quilometragem, cor, ano, modelo, tipo
  } = req.body;

  // Request API create servidor
  axios.put(`https://safv-api-production.up.railway.app/veiculo/${placa}`, {
    placa, fabricante, quilometragem, cor, ano, modelo, tipo
  })
    .then(function (response) {
      console.log(response.data)
      res.send(response.status)
    })
    .catch(function (error) {
      // handle error
      console.log("error= " + error);
      res.send(response.status)
    })
})

//VIAGEM
// GET ALL VIAGENS
app.get('/viagens', (req, res) => {
  axios.get('https://safv-api-production.up.railway.app/viagem/')
    .then(response => {
      const data = response.data
      res.send(JSON.stringify(data));
    })
    .catch(error => console.log(error));
})

// DELETE VIAGEM
app.delete('/viagem', (req, res) => {
  const id = req.body.id
  console.log("id = " + id)
  axios.delete(`https://safv-api-production.up.railway.app/viagem/${id}`)
    .then(response => {
      const status = response.status
      res.send(status);
    })
    .catch(error => console.log(error));
})




