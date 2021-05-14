const db = require('../models/Database')

module.exports = {
    async gravar(evento) {
        const sql = "INSERT INTO evento (eve_nome, eve_status, eve_dataInicio, eve_dataFim, cat_id, eve_img, usu_id, eve_valor) VALUES" +
            "(?,?,?,?,?,?,?,?)";

        const valores = [
            evento.getNome(), evento.getStatus(), evento.getDataIncio(),
            evento.getDataFim(), evento.getCatId(), evento.getImg(),
            evento.getUsuId(), evento.getValor()
        ];
        await db.conecta();
        const result = await db.manipula(sql, valores);
        return result;
    },

    async alterar(evento) {
        const sql = "UPDATE evento SET eve_nome = ?, eve_status = ?," +
            "eve_data = ?, eve_horario = ?, cat_id = ?, eve_img = ?," +
            "usu_id = ?, eve_valor = ? " +
            "WHERE eve_id = ?";
        const valores = [
            evento.getNome(), evento.getStatus(), evento.getData(),
            evento.getHorario(), evento.getCatId(), evento.getImg(),
            evento.getUsuId(), evento.getValor(), evento.getId()
        ];
        await db.conecta();
        const result = await db.manipula(sql, valores);
        return result;
    },

    async excluir(id) {
        const sql = "DELETE FROM Evento WHERE eve_id = ?";
        const valor = [id];
        await db.conecta();
        const result = await db.manipula(sql, valor);
        return result;
    },

    async listarEventos() {
        const sql = "SELECT * FROM evento";
        await db.conecta();
        const eventos = await db.consulta(sql);
        return eventos.data;
    },

    async listarEventosAtivo() {
        const sql = "SELECT * FROM evento WHERE eve_status = 'A'";
        await db.conecta();
        const eventos = await db.consulta(sql);
        return eventos.data;
    },

    async buscarEvento(eve_id) {
        const sql = "SELECT * FROM Evento WHERE eve_id = ?";
        const value = [eve_id];
        await db.conecta();
        const evento = await db.consulta(sql, value);
        return evento.data;
    }
}