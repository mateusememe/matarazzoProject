const db = require('../models/Database')
const fs = require('fs');

module.exports = {
    async gravar(curso) {
        const sql = "INSERT INTO curso (cur_nome, cur_status, usu_id, cat_id, cur_valor, cur_img) " +
            "VALUES (?,?,?,?,?,?)";
        const valores = [
            curso.getNome(), curso.getStatus(), curso.getUsuId(), curso.getCatId(),
            curso.getValor(), curso.getImg()
        ];
        console.log(curso.getNome(), curso.getStatus(), curso.getUsuId(), curso.getCatId(),
            curso.getValor(), curso.getImg());
        await db.conecta();
        const result = await db.manipula(sql, valores);
        return result;
    },
    async alterar(curso) {
        const sql = "UPDATE Curso SET cur_nome = ?, cur_status = ?, usu_id = ?, cur_valor = ?, cur_img = ?, cat_id = ? WHERE cur_id = ?";
        const values = [curso.getNome(), curso.getStatus(), curso.getUsuId(),
        curso.getValor(), curso.getImg(), curso.getCatId(), curso.getId()];
        console.log(curso.getNome(), curso.getStatus(), curso.getUsuId(),
            curso.getValor(), curso.getImg(), curso.getCatId(), curso.getId());
        const result = await db.manipula(sql, values);
        return result;
    },

    async excluir(id) {
        let cursoImg = await this.buscarCursoIMG(id);
        await db.conecta();
        const sql = "DELETE FROM Curso WHERE cur_id = ?";
        const key = [id];
        const result = await db.manipula(sql, key);
        if (result.status) {
            if (cursoImg != "")
                fs.unlink("../frontend/public/uploads/" + cursoImg, (err => {
                    if (err) console.log(err);
                }));
        }
        return result;
    },

    async buscarCursoIMG(cur_id) {
        await db.conecta();
        const sql = "SELECT cur_img FROM Curso WHERE cur_id = ?";
        const value = [cur_id];
        const curso = await db.consulta(sql, value);
        return curso.data[0].cur_img;
    },

    async buscarCurso(id) {
        await db.conecta();
        const sql = "SELECT * FROM Curso WHERE cur_id = " + id;
        const curso = await db.consulta(sql);
        return curso.data;
    },

    async listarCursos() {
        const sql = "SELECT * FROM curso";
        await db.conecta();
        const cursos = await db.consulta(sql)
        return cursos.data;
    },

    async listarCursosAtivos() {
        const sql = "SELECT * FROM curso WHERE cur_status = 'A'";
        await db.conecta();
        const cursos = await db.consulta(sql)
        return cursos.data;
    }
}

