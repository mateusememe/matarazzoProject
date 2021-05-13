const CursoDAO = require('../DAO/CursoDAO');
const Curso = require('../Entities/Curso');

module.exports = {

    async listarCursos(request, response) {
        const cursos = CursoDAO.listarCursos();
        return response.json(cursos);
    },

    async listarCursosAtivos(request, response) {
        const cursos = CursoDAO.listarCursosAtivos();
        return response.json(cursos);
    },

    async buscarCurso(request, response) {
        const { cur_id } = request.params;
        const curso = CursoDAO.buscarCurso(cur_id);
        return response.json(curso);
    },

    async gravarCurso(request, response) {//ok
        const {
            cur_nome, cur_status, usu_id,
            cat_id, cur_valor, cur_img
        } = request.body;

        const curso = Curso.curso(cur_nome, cur_status, usu_id, cat_id, cur_valor, cur_img);

        const result = CursoDAO.gravar(curso);
        return response.json(result);
    },

    async alterarCurso(request, response) {//ok
        const { cur_nome, cur_status, usu_id,
            cat_id, cur_valor, cur_img, cur_id } = request.body;
        const curso = new Curso(cur_id, cur_nome, cur_status, usu_id, cat_id, cur_valor, cur_img);

        const result = CursoDAO.alterar(curso);
        return response.json(result);
    },

    async excluirCurso(request, response) {//ok
        const { cur_id } = request.params;
        const result = CursoDAO.excluir(cur_id);
        return response.json(result);
    },

}