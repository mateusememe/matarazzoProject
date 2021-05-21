const CategoriaDAO = require('../DAO/CategoriaDAO')
const Categoria = require('../Entities/Categoria')

module.exports = {
    async listarCategorias(request, response) {
        const { tipoCat } = request.params;
        console.log(tipoCat);
        const result = await CategoriaDAO.listarCategorias(tipoCat);
        return response.json(result);
    },

    async buscarCategoriaId(request, response) {
        const { id } = request.params;
        const result = await CategoriaDAO.buscarCategoriaId(id);
        return response.json(result);
    },

    async buscarCategoria(request, response) {
        const { cat_nome, cat_tipo } = request.params;
        const cat = Categoria.SemId(cat_nome, cat_tipo);
        const result = await CategoriaDAO.buscarCategoria(cat);
        return response.json(result);
    },

    async gravarCategoria(request, response) {
        const { cat_nome, cat_tipo } = request.body;
        const cat = Categoria.SemId(cat_nome, cat_tipo);
        const result = await CategoriaDAO.gravar(cat);
        return response.json(result);
    },

    async alterarCategoria(request, response) {
        const { cat_id, cat_nome, cat_tipo } = request.body;
        const cat = new Categoria(cat_id, cat_nome, cat_tipo);
        const result = await CategoriaDAO.alterar(cat);
        return response.json(result);
    },

    async excluirCategoria(request, response) {
        const { cat_id } = request.params;
        const result = await CategoriaDAO.excluir(cat_id);
        return response.json(result);
    }
}