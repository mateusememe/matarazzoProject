const IngressoDAO = require('../DAO/IngressoDAO');
const Ingresso = require('../Entities/Ingresso');

module.exports = {
  async gravarIngresso(request, response) {
    const { ing_qrCode, eve_id, ses_id, ven_id, ast_id } = request.body;
    const ing = Ingresso.SemId(ing_qrCode, eve_id, ses_id, ven_id, ast_id);
    const result = await IngressoDAO.gravarIngresso(ing);
    return response.json(result);
  },
  async listarIngressosVenda(request, response) {
    const { ven_id } = request.params;
    const result = await IngressoDAO.listarIngressoVenda(ven_id);
    return response.json(result);
  },

  async buscarIngressoQr(request, response) {
    const { ing_qrCode } = request.params;
    const result = await IngressoDAO.buscarIngressoQr(ing_qrCode);
    return response.json(result);
  },

  async ingressosUsuario(request, response) {
    const { usu_id } = request.params;
    const result = await IngressoDAO.buscarIngresso(usu_id);
    return response.json(result);
  },

}