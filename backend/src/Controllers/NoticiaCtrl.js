const NoticiaDAO = require('../DAO/NoticiasDAO')
const Noticia = require('../Entities/Noticia')

module.exports = {

    async listarNoticia(request, response) {
        const result = await NoticiaDAO.listar();
        return response.json(result);
    },

    async buscarNoticia(request, response) {
        const { not_id } = request.params;
        const result = await NoticiaDAO.buscarId(not_id);
        return response.json(result.data);
    },

    async gravarNoticia(request, response) {
        const { not_titulo, not_descricao, not_data, not_dataFim, usu_id, cat_id } = request.body;
        const not = Noticia.SemId(not_titulo, not_data, not_dataFim, usu_id, cat_id, not_descricao);
        const result = await NoticiaDAO.gravar(not);
        return response.json(result);
    },

    async alterarNoticia(request, response) {
        const { not_titulo, not_descricao, not_data, not_dataFim, usu_id, cat_id, not_id } = request.body;
        const not = new Categoria(not_id, not_titulo, not_data, not_dataFim, usu_id, cat_id, not_descricao);
        const result = await NoticiaDAO.alterar(not);
        return response.json(result);
    },

    async excluirNoticia(request, response) {
        const { not_id } = request.params;
        const result = await NoticiaDAO.excluir(not_id);
        return response.json(result);
    },

}