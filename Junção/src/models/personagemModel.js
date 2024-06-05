var database = require("../database/config");

function listar() {
  var instrucaoSql = `SELECT * FROM personagem`;

  return database.executar(instrucaoSql);
}


module.exports = { listar };
