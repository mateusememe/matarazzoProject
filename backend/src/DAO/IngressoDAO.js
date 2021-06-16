const db = require('../models/Database')

module.exports = {

  async gravarIngresso(ingresso) {
    const sql = "INSERT INTO ingresso VALUES (?, ?, ?, ?, ?, ?)";
    const valores = [ingresso.getId(), ingresso.getQrCode(), ingresso.getEveId(), ingresso.getSesId(), ingresso.getVenId(), ingresso.getAstId()];
    await db.conecta();
    return await db.manipula(sql, valores);
  },
  async listarIngressoVenda(ven_id) {
    var sql = "SELECT ing_qrCode, ast_num, eve_data, eve_horario, sal_nome FROM Ingresso i, Assento a, Evento e, Sala s WHERE i.ast_id = a.ast_id and i.eve_id = e.eve_id and a.sal_id = s.sal_id and ven_id=" + ven_id;
    await db.conecta();
    const ingressos = await db.consulta(sql);
    console.log(ingressos.data);
    return ingressos.data;
  },
  async buscarIngressoQr(ing_qrCode) {
    console.log("QRCode: " + ing_qrCode);
    const sql = "SELECT * FROM Ingresso WHERE ing_qrCode='" + ing_qrCode + "'";
    await db.conecta();
    const ingressos = await db.consulta(sql);
    return ingressos.data;
  },
  async buscarIngresso(usu_id) {
    const sql = "SELECT * FROM ingresso i, venda v WHERE usu_id='" + usu_id + "' AND i.ven_id = v.ven_id";
    await db.conecta();
    const ingressos = await db.consulta(sql);
    return ingressos.data;
  }
}