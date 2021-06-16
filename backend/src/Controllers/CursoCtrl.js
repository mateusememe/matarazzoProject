const CursoDAO = require('../DAO/CursoDAO');
const Curso = require('../Entities/Curso');

module.exports = {
    async listarCursos(request, response) {
        const cursos = await CursoDAO.listarCursos();
        return response.json(cursos);
    },

    async buscarCurso(request, response) {
        const { cur_id } = request.params;
        const curso = await CursoDAO.buscarCurso(cur_id);
        return response.json(curso);
    },

    async listarCursosAtivos(request, response) {
        const cursos = await CursoDAO.listarCursosAtivos();
        return response.json(cursos);
    },

    async gravarCurso(request, response) {
        const {
            cur_nome, cur_status, cur_adm, cur_valor,
            cur_img, cur_categoria
        } = request.body;

        const curso = Curso.curso(cur_nome, cur_status, cur_adm, cur_categoria, cur_valor, cur_img);
        const result = await CursoDAO.gravar(curso);
        return response.json(result);
    },

    async alterarCurso(request, response) {//ok
        const { cur_nome, cur_status, cur_adm,
            cur_valor, cur_img,
            cur_categoria, cur_id } = request.body;
        const curso = new Curso(cur_id, cur_nome, cur_status, cur_adm, cur_categoria, cur_valor, cur_img);

        const result = await CursoDAO.alterar(curso);
        return response.json(result);
    },

    async excluirCurso(request, response) {
        const { cur_id } = request.params;
        const result = await CursoDAO.excluir(cur_id);
        return response.json(result);
    },

}