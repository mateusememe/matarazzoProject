const IngressoDAO = require('../DAO/IngressoDAO');
const Ingresso = require('../Entities/Ingresso');

module.exports = {
  async gravarIngresso(request, response) {
    const { ing_qrCode, eve_id, ses_id, ven_id, ast_id } = request.body;
    //console.log("to aqui" + ing_qrCode + " " + eve_id + " " + ses_id + " " + ven_id + " " + ast_id);
    const ing = Ingresso.SemId(ing_qrCode, eve_id, ses_id, ven_id, ast_id);
    const result = await IngressoDAO.gravarIngresso(ing);
    return response.json(result);
  },
  async listarIngressosVenda(request, response) {
    const { ven_id } = request.params;
    console.log("id da venda: " + ven_id);
    const result = await IngressoDAO.listarIngressoVenda(ven_id);
    console.log("result: " + result);
    return response.json(result);
  },

  async buscarIngressoQr(request, response) {
    const { ing_qrCode } = request.params;
    const result = await IngressoDAO.buscarIngressoQr(ing_qrCode);
    return response.json(result);
  }
}