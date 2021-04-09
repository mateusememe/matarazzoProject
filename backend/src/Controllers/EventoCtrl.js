const db = require('../models/Database');

module.exports = {

    async listarEvento(request, response) {//f
        await db.conecta();
        const sql = "SELECT * FROM evento";
        const eventos = await db.consulta(sql);
        return response.json(eventos.data);
    },

    async gravarEvento(request, response) {//f
        const {
            eve_nome, eve_status, eve_data,
            eve_horario, eve_categoria, eve_img,
            eve_adm, eve_valor
        } = request.body;
        await db.conecta();
        const sql = "INSERT INTO evento (eve_nome, eve_status, eve_data," +
            "eve_horario, cat_id, eve_img," +
            "usu_id, eve_valor) VALUES" +
            "(?,?,?,?,?,?,?,?)";
        const valores = [
            eve_nome, eve_status, eve_data,
            eve_horario, eve_categoria, eve_img,
            eve_adm, eve_valor
        ];
        const result = await db.manipula(sql, valores);
        return response.json(result);
    },

    async alterarEvento(request, response) {//f
        const { 
            eve_nome, eve_status, eve_data,
            eve_horario, eve_categoria, eve_img,
            eve_adm, eve_valor 
        } = request.body;
        const con = await db.conecta();
        const sql = "UPDATE evento SET eve_nome = ?, eve_status = ?,"+
            "eve_data = ?, eve_horario = ?, cat_id = ?, eve_img = ?,"+
            "usu_id = ?, eve_valor = ? " +
            "WHERE eve_id = ?";
        const valores = [
            eve_nome, eve_status, eve_data,
            eve_horario, eve_categoria, eve_img,
            eve_adm, eve_valor
        ];
        const result = await db.manipula(sql, valores);
        return response.json(result);
    },

    async excluirEvento(request, response) {
        const { eve_id } = request.params;
        await db.conecta();
        const sql = "DELETE FROM Evento WHERE eve_id = ?";
        const valor = [eve_id];
        const result = await db.manipula(sql, valor);
        return response.json(result);
    },
}