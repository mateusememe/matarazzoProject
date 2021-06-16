const VendaDAO = require('../DAO/VendaDAO')
const Venda = require('../Entities/Venda')

module.exports = {
  async gravarVenda(request, response) {
    const { ven_data, ven_MetodoPgmt, usu_id, eve_id, ses_id } = request.body;
    const ven = Venda.SemId(ven_data, ven_MetodoPgmt, usu_id, eve_id, ses_id);
    const result = await VendaDAO.gravar(ven);
    return response.json(result);
  },
  async listarVendasUsuario(request, response) {
    const { usu_id } = request.params;
    const ven = await VendaDAO.listarVendasUsuario(usu_id);
    return response.json(ven);
  }
}