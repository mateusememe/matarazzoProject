const SalaDAO = require('../DAO/SalaDAO')
const Sala = require('../Entities/Sala')

module.exports = {
  async recuperaQtdeFileiras(request, response) {
    const { sal_id } = request.params;
    const result = await SalaDAO.QtdeFileiras(sal_id);
    return response.json(result);
  },

  async listarSalas(request, response) {
    const result = await SalaDAO.listarSalas();
    return response.json(result);
  },

  async gravar(request, response) {
    const { sal_nome, sal_qtdeAssento, sal_qtdeFileira } = request.body;
    const sala = Sala.SemId(sal_nome, sal_qtdeAssento, sal_qtdeFileira);
    const result = await SalaDAO.gravar(sala);
    return response.json(result);
  },
  async alterar(request, response) {
    const { sal_id, sal_nome, sal_qtdeAssento, sal_qtdeFileira } = request.body;
    const sala = new Sala(sal_id, sal_nome, sal_qtdeAssento, sal_qtdeFileira);
    const result = await SalaDAO.alterar(sala);
    return response.json(result);
  },
  async remover(request, response) {
    const { id } = request.params;
    const result = await SalaDAO.remover(id);
    return response.json(result);
  }
}