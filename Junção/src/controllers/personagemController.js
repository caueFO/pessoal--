var personagemModel = require("../models/personagemModel");

function buscarPorNome(req, res) {
  var nome = req.query.nome;

  personagemModel.buscarPorNome(nome).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  personagemModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var idPersonagem = req.params.idPersonagem;

  personagemModel.buscarPorId(idPersonagem).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var nome = req.body.nome;
  var times = req.body.times;

  personagemModel.buscarPorNome(nome).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `O personagem com o nome ${nome} já existe` });
    } else {
      personagemModel.cadastrar(nome, times).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}

module.exports = {
  buscarPorNome,
  buscarPorId,
  cadastrar,
  listar,
};
