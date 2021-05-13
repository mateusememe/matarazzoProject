const SalaDAO = require('../DAO/SalaDAO')
const Sala = require('../Entities/Sala')

module.exports = {
  async recuperaQtdeFileiras(request, response) {
    const { sal_id } = request.params;
    const result = await SalaDAO.QtdeFileiras(sal_id);
    return response.json(result);
  }
}