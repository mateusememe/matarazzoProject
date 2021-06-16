const db = require('../models/Database')

module.exports = {
  async QtdeFileiras(sal_id) {
    const sql = "SELECT sal_qtdeFileira FROM sala WHERE sal_id=" + sal_id;
    db.conecta();
    const fileiras = await db.consulta(sql);
    return fileiras.data;
  },

  async listarSalas() {
    const sql = "SELECT * FROM sala";
    db.conecta();
    const salas = await db.consulta(sql);
    return salas.data;
  },

  async gravar(sala) {
    const sql = "INSERT INTO sala (sal_nome,sal_qtdeAssento,sal_qtdeFileira) VALUES (?, ?, ?)";
    const valores = [
      sala.getNome(), sala.getQtdeAssento(), sala.getQtdeFileira()
    ];
    await db.conecta();
    const result = await db.manipula(sql, valores);
    return result;
  },
  async alterar(sala) {
    const sql = "UPDATE sala SET sal_nome = ?, sal_qtdeAssento = ?, sal_qtdeFileira = ? WHERE sal_id = ?";
    const valores = [
      sala.getNome(), sala.getQtdeAssento(), sala.getQtdeFileira(), sala.getId()
    ];
    await db.conecta();
    const result = await db.manipula(sql, valores);
    return result;
  },
  async remover(id) {
    const sql = "DELETE FROM sala WHERE sal_id = ?";
    const valor = [id];
    await db.conecta();
    console.log("sql: " + sql + " valor: " + valor);
    return db.manipula(sql, valor);
  }
}
