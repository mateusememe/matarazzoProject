const SessaoDAO = require('../DAO/SessaoDAO')
const Sessao = require('../Entities/Sessao')

module.exports = {
  async listarSessoes(request, response) {
    const result = await SessaoDAO.listarSessoes();
    return response.json(result);
  },

  async listarSessoesEvento(request, response) {
    const { eve_id } = request.params;
    const result = await SessaoDAO.SessoesEvento(eve_id);
    return response.json(result);
  },
  async buscarSessao(request, response) {
    const { ses_id } = request.params;
    const result = await SessaoDAO.BuscarSessao(ses_id);
    return response.json(result);
  },
  async listarSalasHorarios(request, response) {
    const { eve_id, data } = request.params;
    const result = await SessaoDAO.SalasSessao(eve_id, data);
    const salas = [];
    for (let pos of result) {
      salas.push({
        sala: pos.sal_id,
        horario: await SessaoDAO.Horarios(eve_id, data, pos.sal_id)
      });
    }
    return response.json(salas);
  },

  async gravar(request, response) {
    const {
      ses_horarioInicio, ses_qtdIng,
      ses_data, sal_id, eve_id
    } = request.body;
    const sessao = Sessao.SemId(eve_id, ses_horarioInicio, ses_qtdIng, 0, sal_id, ses_data);
    const result = await SessaoDAO.gravar(sessao);
    console.log(result);
    return response.json(result);
  },

  async alterar(request, response) {
    const {
      ses_horarioInicio, ses_qtdIng,
      ses_data, sal_id, eve_id, ses_id
    } = request.body;
    const sessao = new Sessao(eve_id, ses_id, ses_horarioInicio, ses_qtdIng, 0, sal_id, ses_data);
    const result = await SessaoDAO.alterar(sessao);
    console.log(result);
    return response.json(result);
  },

  async incrementarFreq(request, response) {
    const { eve_id, ses_id } = request.params;
    const result = await SessaoDAO.incrementarFreq(eve_id, ses_id);
    return response.json(result);
  },

  async remover(request, response) {
    const { id } = request.params;
    const result = await SessaoDAO.remover(id);
    return response.json(result);
  }
}