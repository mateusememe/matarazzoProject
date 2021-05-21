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

}