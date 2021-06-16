const AssentoDAO = require('../DAO/AssentoDAO')
const Assento = require('../Entities/Assento');

module.exports = {

    async listarAssentos(request, response) {
        const result = await AssentoDAO.listar();
        return response.json(result);
    },
    //id numero fileira status
    async gravarAssento(request, response) {
        const { sal_id, ast_numero, ast_fileira } = request.body;
        const ass = Assento.SemId(sal_id, ast_numero, ast_fileira);
        const result = await AssentoDAO.gravar(ass);
        return response.json(result);
    },
    async alterarAssento(request, response) {
        const { sal_id, ast_id, ast_numero, ast_fileira } = request.body;
        const ast = new Assento(sal_id, ast_id, ast_numero, ast_fileira);
        const result = await AssentoDAO.alterar(ast);
        return response.json(result);
    },
    async excluirAssento(request, response) {
        const { ast_id } = request.params;
        const result = await AssentoDAO.excluir(ast_id);
        return response.json(result);
    },
    async excluirAssentosSala(request, response) {
        const { sal_id } = request.params;
        const result = await AssentoDAO.excluirPorSala(sal_id);
        return response.json(result);
    },
    async listarAssentosOcupados(request, response) {
        const { eve_id, ses_id } = request.params;
        const result = await AssentoDAO.listarAssentosOcupados(eve_id, ses_id);
        return response.json(result);
    },
    async listarAssentosFileira(request, response) {
        const { sal_id, ast_fileira } = request.params;
        const result = await AssentoDAO.listarAssentosFileira(sal_id, ast_fileira);
        return response.json(result);
    }
}