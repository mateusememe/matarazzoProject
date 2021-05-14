const db = require('../models/Database')

module.exports = {
  async SessoesEvento(eve_id) {
    var sql = "SELECT DISTINCT ses_data FROM SESSAO WHERE ses_data>=CURRENT_DATE AND eve_id=" + eve_id + " ORDER BY ses_data";
    await db.conecta();
    const sessoes = await db.consulta(sql);
    return sessoes.data;
  },

  async BuscarSessao(ses_id) {
    var sql = "SELECT * FROM SESSAO WHERE ses_id=" + ses_id;
    await db.conecta();
    const sessao = await db.consulta(sql);
    return sessao.data;
  },

  async SalasSessao(eve_id, data) {
    var sql = "SELECT DISTINCT(sal_id) FROM SESSAO WHERE eve_id=? AND ses_data = ? ORDER BY sal_id";
    const valores = [eve_id, data];
    await db.conecta();
    const sessoes = await db.consulta(sql, valores);
    return sessoes.data;
  },

  async Horarios(eve_id, data, sala) {
    var sql = "SELECT ses_horarioInicio, ses_id FROM SESSAO WHERE eve_id=? AND ses_data = ? AND sal_id = ?";
    const valores = [eve_id, data, sala];
    await db.conecta();
    const horarios = await db.consulta(sql, valores);
    return horarios.data;
  },

  async gravar(sessao) {
    const sql = "INSERT INTO SESSAO (eve_id, ses_horarioInicio, ses_qtdeIng, ses_freq, ses_data, sal_id) " +
      "VALUES (?, ?, ?, ?, ?, ?)";

    const valores = [
      sessao.getEveId(), sessao.getHorarioInicio(), sessao.getQtdeIng(),
      sessao.getFreq(), sessao.getData(), sessao.getSalId()
    ];

    await db.conecta();
    const result = await db.manipula(sql, valores);
    return result;
  }
}