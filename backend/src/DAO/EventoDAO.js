const db = require('../models/Database')
const fs = require('fs');

module.exports = {
    async gravar(evento) {
        const sql = "INSERT INTO evento (eve_nome, eve_status, eve_data, eve_dataFim, cat_id, eve_img, usu_id, eve_valor, eve_descricao, eve_horario, eve_horarioFim) VALUES" +
            "(?,?,?,?,?,?,?,?,?,?,?)";

        const valores = [
            evento.getNome(), evento.getStatus(), evento.getData(),
            evento.getDataFim(), evento.getCatId(), evento.getImg(),
            evento.getUsuId(), evento.getValor(), evento.getDesc(),
            evento.getHorario(), evento.getHorarioFim()
        ];
        await db.conecta();
        const result = await db.manipula(sql, valores);
        return result;
    },

    async alterar(evento) {
        const sql = "UPDATE evento SET eve_nome = ?, eve_status = ?," +
            "eve_data = ?, eve_dataFim = ?, eve_horario = ?, eve_horarioFim = ?, cat_id = ?, eve_img = ?," +
            "usu_id = ?, eve_valor = ?, eve_descricao = ? " +
            "WHERE eve_id = ?";
        const valores = [
            evento.getNome(), evento.getStatus(), evento.getData(),
            evento.getDataFim(), evento.getHorario(), evento.getHorarioFim(), evento.getCatId(), evento.getImg(),
            evento.getUsuId(), evento.getValor(), evento.getDesc(),
            evento.getId()
        ];
        await db.conecta();
        const result = await db.manipula(sql, valores);
        return result;
    },

    async excluir(id) {
        let eventoImg = await this.buscarEventoIMG(id);
        const sql = "DELETE FROM Evento WHERE eve_id = ?";
        const valor = [id];
        await db.conecta();
        const result = await db.manipula(sql, valor);
        if (result.status) {
            if (eventoImg != "")
                fs.unlink("../frontend/public/uploads/" + eventoImg, (err => {
                    if (err) console.log(err);
                }));
        }
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

    async buscarEventoIMG(eve_id) {
        await db.conecta();
        const sql = "SELECT eve_img FROM Evento WHERE eve_id = ?";
        const value = [eve_id];
        const evento = await db.consulta(sql, value);
        return evento.data[0].eve_img;
    },

    async buscarEvento(eve_id) {
        const sql = "SELECT * FROM Evento WHERE eve_id = ?";
        const value = [eve_id];
        await db.conecta();
        const evento = await db.consulta(sql, value);
        return evento.data;
    }
}