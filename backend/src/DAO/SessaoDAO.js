const db = require('../models/Database')

module.exports = {
  async listarSessoes() {
    const sql = "SELECT * FROM sessao ORDER BY eve_id";
    await db.conecta();
    const sessoes = await db.consulta(sql);
    return sessoes.data;
  },

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
  },

  async alterar(sessao) {
    const sql = "UPDATE sessao SET eve_id = ?, ses_horarioInicio = ?, " +
      "ses_qtdeIng = ?, ses_freq = ?, sal_id = ?, ses_data = ? " +
      "WHERE ses_id = ?";
    const valores = [
      sessao.getEveId(), sessao.getHorarioInicio(), sessao.getQtdeIng(),
      sessao.getFreq(), sessao.getSalId(), sessao.getData(), sessao.getId()
    ];
    await db.conecta();
    const result = await db.manipula(sql, valores);
    return result;
  },

  async incrementarFreq(eve_id, ses_id) {
    const sql = "UPDATE Sessao SET ses_freq = (ses_freq+1) WHERE eve_id=? AND ses_id=?";
    const valores = [
      eve_id, ses_id
    ];
    await db.conecta();
    const result = await db.manipula(sql, valores);
    return result;
  },

  async remover(id) {
    const sql = "DELETE FROM sessao WHERE ses_id = ?";
    const valor = [id];
    await db.conecta();
    return db.manipula(sql, valor);
  }

}