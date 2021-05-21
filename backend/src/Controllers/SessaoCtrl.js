const SessaoDAO = require('../DAO/SessaoDAO')
const Sessao = require('../Entities/Sessao')

module.exports = {
  async listarSessoesEvento(request, response) {
    const { eve_id } = request.params;
    const result = await SessaoDAO.SessoesEvento(eve_id);
    return response.json(result);
  },
  async buscarSessao(request, response) {
    const { ses_id } = request.params;
    console.log("id da sessao" + ses_id);
    const result = await SessaoDAO.BuscarSessao(ses_id);
    return response.json(result);
  },
  async listarSalasHorarios(request, response) {
    const { eve_id, data } = request.params;
    const result = await SessaoDAO.SalasSessao(eve_id, data);
    const salas = [];
    for (let i = 0; i < result.length; i++) {
      salas.push({
        sala: result[i].sal_id,
        horario: await SessaoDAO.Horarios(eve_id, data, result[i].sal_id)
      });
    }
    return response.json(salas);
  },

  async gravar(request, response) {
    const { eve_id, ses_id, ses_horarioInicio, ses_qtdeIng, ses_freq, ses_data, sal_id } = request.body;
    const sessao = Sessoa.SemId(eve_id, ses_horarioInicio, ses_qtdeIng, ses_freq, sal_id, ses_data);
    const result = await SessaoDAO.gravar(sessao);
    return response.json(result);
  },

  async incrementarFreq(request, response) {
    const { eve_id, ses_id } = request.params;
    const result = await SessaoDAO.incrementarFreq(eve_id, ses_id);
    return response.json(result);
  }
}