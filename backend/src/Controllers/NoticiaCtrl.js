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
        return response.json(result);
    },

    async gravarNoticia(request, response) {
        const { not_titulo, not_descricao, not_data, not_dataFim, not_adm, not_categoria, not_img } = request.body;
        const not = Noticia.SemId(not_titulo, not_data, not_dataFim, not_adm, not_categoria, not_descricao, not_img);
        const result = await NoticiaDAO.gravar(not);
        return response.json(result);
    },

    async alterarNoticia(request, response) {
        const { not_titulo, not_descricao, not_data, not_dataFim, not_adm, not_categoria, not_img, not_id } = request.body;
        const not = new Noticia(not_id, not_titulo, not_data, not_dataFim, not_adm, not_categoria, not_descricao, not_img);
        const result = await NoticiaDAO.alterar(not);
        return response.json(result);
    },

    async excluirNoticia(request, response) {
        //fazer a parte de remover a imagem
        const { not_id } = request.params;
        const result = await NoticiaDAO.excluir(not_id);
        return response.json(result);
    },

}