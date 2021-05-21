const db = require('../models/Database');
const UsuarioDAO = require('../DAO/UsuarioDAO');
module.exports = {
    //cadastros básicos e login
    async login(request, response) {
        const { usu_email, usu_senha } = request.body;
        const result = await UsuarioDAO.login(usu_email, usu_senha);
        return response.json(result);
    },

    async listarUsuarios(request, response) {
        return response.json(UsuarioDAO.listarUsuarios());
    },

    async buscarUsuario(request, response) {
        const { usu_email } = request.params;
        const resp = await UsuarioDAO.buscarUsuario(usu_email);
        return response.json(resp);
    },

    async buscarUsuarioId(request, response) {
        const { id } = request.params;
        const result = await UsuarioDAO.buscarUsuarioId(id);
        return response.json(result);
    },

    async gravarUsuario(req, resp) {
        const {
            usu_nome, usu_sobrenome, usu_email,
            usu_senha, usu_nivel
        } = req.body;

        const usu = new Usuario(
            usu_nome, usu_sobrenome, usu_email,
            usu_senha, usu_nivel
        );

        const retorno = await UsuarioDAO.gravar(usu);

        return resp.json(retorno);
    },

    async alterarUsuario(request, response) {
        const {
            usu_nome, usu_sobrenome, usu_email,
            usu_senha, usu_cpf, usu_dtNasc, usu_endereco,
            usu_cidade, usu_cep, usu_fone, usu_sexo, usu_id
        } = request.body;

        const usu = new Usuario(usu_id, usu_nome, usu_sobrenome, usu_email,
            usu_senha, usu_cpf, usu_dtNasc, usu_endereco,
            usu_cidade, usu_cep, usu_fone, usu_sexo);

        const retorno = await UsuarioDAO.alterar(usu);
        return response.json(retorno);
    },

    async excluirUsuario(request, response) {
        const { usu_id } = request.params;
        const retorno = UsuarioDAO.excluir(usu_id);
        return response.json(retorno);
    }
}