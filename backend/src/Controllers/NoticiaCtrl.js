const db = require('../models/Database');

module.exports = {

    async listarNoticia(request, response) {
        const con = await db.conecta();
        const sql = "SELECT * FROM Noticia";
        const news = await db.consulta(sql);
        return response.json(news.data);
    },

    async gravarNoticia(request, response){
        const {not_titulo, not_data, usu_id, cat_id} = request.body;
        await db.conecta();
        const sql = "INSERT INTO Noticia (not_titulo, not_data, usu_id, cat_id) "+
        "VALUES (?, ?, ?, ?)";
        const valores = [not_titulo, not_data, usu_id, cat_id];
        const result = await db.manipula(sql, valores);
        return response.json(result);
    },

    async alterarNoticia(request, response) {
        const {not_titulo, not_data, usu_id, cat_id,not_id} = request.body;
        await db.conecta();
        const sql = "UPDATE Noticia SET not_titulo = ?, not_data = ?, usu_id = ?, cat_id = ? WHERE not_id = ?";
        const valores = [not_titulo, not_data, usu_id, cat_id,not_id];
        const result = await db.manipula(sql, valores);
        return response.json(result);
    },
    async excluirNoticia(request, response) {
        const {not_id} = request.params;
        await db.conecta();
        const sql = "DELETE FROM Noticia WHERE not_id = ?";
        const valor = [not_id];
        const result = await db.manipula(sql, valor);
        return response.json(result);
    },

}