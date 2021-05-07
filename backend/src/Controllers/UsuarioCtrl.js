const db = require('../models/Database');
const UsuarioDAO = require('../DAO/UsuarioDAO');
module.exports = {
    //cadastros básicos e login
    async login(request, response) {
        const { usu_email, usu_senha } = request.body;
        await db.conecta();
        const sql = "SELECT * FROM Usuario WHERE usu_email = ? and usu_senha = ?";
        const valores = [usu_email, usu_senha];
        const result = await db.consulta(sql, valores);
        return response.json(result.data);
    },

    async listarUsuarios(request, response) {
        return response.json(UsuarioDAO.listarUsuarios());
    },

    async buscarUsuario(request, response) {
        const { usu_email } = request.params;
        await db.conecta();
        const sql = "SELECT usu_email FROM Usuario WHERE usu_email = ?";
        const value = [usu_email];
        const usuarios = await db.consulta(sql, value);
        return response.json(usuarios.data);
    },

    async buscarUsuarioId(request, response) {
        const { id } = request.params;
        await db.conecta();
        const sql = "SELECT * FROM Usuario WHERE usu_id = ?";
        const value = [id];
        const usuarios = await db.consulta(sql, value);
        return response.json(usuarios.data);
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

        var retorno = UsuarioDAO.gravar(usu);

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

        const retorno = UsuarioDAO.alterar(usu);
        return response.json(retorno);
    },

    async excluirUsuario(request, response) {
        const { usu_id } = request.params;
        const retorno = UsuarioDAO.excluir(usu_id);
        return response.json(retorno);
    }
}