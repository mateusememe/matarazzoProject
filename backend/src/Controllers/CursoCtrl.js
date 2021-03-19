const db = require('../models/Database');

module.exports = {

    async listarCursos(request, response) {//f
        await db.conecta();
        const sql = "SELECT * FROM curso";
        const cursos = await db.consulta(sql);
        return response.json(cursos.data);
    },

    async gravarCurso(request, response){//f
        const {cur_nome, cur_status, usu_id, cat_id} = request.body;
        await db.conecta();
        const sql = "INSERT INTO curso (cur_nome, cur_status, usu_id, cat_id) "+
        "VALUES (?, ?, ?, ?)";
        const valores = [cur_nome, cur_status, usu_id, cat_id];
        const result = await db.manipula(sql, valores);
        return response.json(result);
    },

    async alterarCurso(request, response) {//f
        const {cur_id, cur_nome, cur_status, usu_id, cat_id} = request.body;
        await db.conecta();
        const sql = "UPDATE Curso SET cur_nome = ?, cur_status = ?, usu_id = ?, cat_id = ? WHERE cur_id = ?";
        const valores = [cur_nome, cur_status, usu_id, cat_id, cur_id];
        const result = await db.manipula(sql, valores);
        return response.json(result);
    },

    async excluirCurso(request, response) {
        const {cur_id} = request.params;
        await db.conecta();
        const sql = "DELETE FROM Curso WHERE cur_id = ?";
        const valor = [cur_id];
        const result = await db.manipula(sql, valor);
        return response.json(result);
    },

}