var hissatsuModel = require("../models/hissatsuModel");

function buscarHissatsuPorPersonagem(req, res) {
  var idPersonagem = req.params.idPersonagem;

  hissatsuModel.buscarHissatsuPorPersonagem(idPersonagem).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}


function cadastrar(req, res) {
  var nome = req.body.nome;
  var tipo = req.body.tipo;
  var idPersonagem = req.body.idPersonagem;

  if (tipo == undefined) {
    res.status(400).send("descricao está undefined!");
  } else if (idPersonagem == undefined) {
    res.status(400).send("idUsuario está undefined!");
  } else if (nome == undefined) {
    res.status(400).send("nome está undefined!");
  } else {


    hissatsuModel.cadastrar(tipo, idPersonagem, nome)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  buscarHissatsuPorPersonagem,
  cadastrar
}