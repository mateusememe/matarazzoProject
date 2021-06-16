const db = require('../models/Database')

module.exports = {
  async gravar(ven) {
    const sql = "INSERT INTO venda (ven_data, ven_MetodoPgmt, usu_id, eve_id, ses_id) " +
      "VALUES (?, ?, ?, ?, ?)";
    const valores = [
      ven.getData(), ven.getMetodoPgmt(), ven.getUsu_id(), ven.getEve_id(),
      ven.getSes_id()
    ];
    await db.conecta();
    const result = await db.manipula(sql, valores);
    console.log(result);
    return result;
  },
  async listarVendasUsuario(usu_id) {
    var sql = "select v.ven_id as id, v.eve_id, v.ses_id, eve_nome, eve_valor, COUNT(*) as qtdeIngressosEve, SUM(eve_valor) as total from ingresso i, evento e, venda v where v.ven_id = i.ven_id and v.eve_id = e.eve_id and v.usu_id = " + usu_id + " group by v.eve_id, v.ses_id";
    await db.conecta();
    const vendas = await db.consulta(sql);
    return vendas.data;
  },
}