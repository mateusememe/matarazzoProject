const db = require('../models/Database')

module.exports = {

  async gravarIngresso(ingresso) {
    const sql = "INSERT INTO ingresso VALUES (?, ?, ?, ?, ?, ?)";
    const valores = [ingresso.getId(), ingresso.getQrCode(), ingresso.getEveId(), ingresso.getSesId(), ingresso.getVenId(), ingresso.getAstId()];
    await db.conecta();
    return await db.manipula(sql, valores);
  },
  async listarIngressoVenda(ven_id) {
    var sql = "SELECT ing_qrCode FROM Ingresso WHERE ven_id=" + ven_id;
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
    console.log("ING: " + ingressos.data);
    return ingressos.data;
  }
}