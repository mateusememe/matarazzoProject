const db = require('../models/Database');

module.exports = {

    async listarCursos(request, response) {//ok
        await db.conecta();
        const sql = "SELECT * FROM curso";
        const cursos = await db.consulta(sql);
        return response.json(cursos.data);
    },

    async listarCursosAtivos(request, response) {//ok
        await db.conecta();
        const sql = "SELECT * FROM curso WHERE cur_status = 'A'";
        const cursos = await db.consulta(sql);
        return response.json(cursos.data);
    },

    async gravarCurso(request, response) {//ok
        const {
            cur_nome, cur_status, cur_adm,
            cur_categoria, cur_valor, cur_img
        } = request.body;
        console.log(request.body);
        await db.conecta();
        const sql = "INSERT INTO curso (cur_nome, cur_status, usu_id, cat_id, cur_valor, cur_img) " +
            "VALUES (?, ?, ?, ?, ?, ?)";
        const valores = [
            cur_nome, cur_status, cur_adm,
            cur_categoria, cur_valor, cur_img
        ];
        const result = await db.manipula(sql, valores);
        return response.json(result);
    },

    async alterarCurso(request, response) {//ok
        const { cur_nome, cur_status, cur_adm, cur_categoria, cur_valor, cur_img} = request.body;
        await db.conecta();
        const sql = "UPDATE Curso SET cur_nome = ?, cur_status = ?, usu_id = ?, cur_valor = ?, cur_img = ?, cat_id = ? WHERE cur_id = ?";
        const valores = [
            cur_nome, cur_status, cur_adm,
            cur_categoria, cur_valor, cur_img, cur_id
        ];
        const result = await db.manipula(sql, valores);
        return response.json(result);
    },

    async excluirCurso(request, response) {//ok
        const { cur_id } = request.params;
        await db.conecta();
        const sql = "DELETE FROM Curso WHERE cur_id = ?";
        const valor = [cur_id];
        const result = await db.manipula(sql, valor);
        return response.json(result);
    },

}