const db = require('../models/Database');
const UsuarioDAO = require('../DAO/UsuarioDAO');
const Usuario = require('../Entities/Usuario')
module.exports = {
    async login(request, response) {
        const { usu_email, usu_senha } = request.body;
        const result = await UsuarioDAO.login(usu_email, usu_senha);
        return response.json(result);
    },

    async listarUsuarios(request, response) {
        return response.json(await UsuarioDAO.listarUsuarios());
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

        const usu = Usuario.SemId(
            usu_nome, usu_sobrenome, usu_email,
            usu_senha, usu_nivel
        );

        const retorno = await UsuarioDAO.gravar(usu);

        return resp.json(retorno);
    },

    async alterarUsuario(request, response) {
        console.log("controller do alterar")
        const {
            usu_nome, usu_sobrenome, usu_email,
            usu_senha, usu_cpf, usu_dtNasc, usu_endereco,
            usu_cidade, usu_cep, usu_fone, usu_sexo, usu_id, usu_nivel
        } = request.body;
        console.log(usu_nome, usu_sobrenome, usu_email, usu_senha, usu_cpf, usu_dtNasc, usu_endereco, usu_cidade, usu_cep, usu_fone, usu_sexo, usu_id, usu_nivel);
        const usu = new Usuario(usu_id, usu_nome, usu_sobrenome, usu_email, usu_senha, usu_nivel);
        usu.setCpf(usu_cpf);
        usu.setDtNasc(usu_dtNasc);
        usu.setEndereco(usu_endereco);
        usu.setCidade(usu_cidade);
        usu.setCep(usu_cep);
        usu.setFone(usu_fone);
        usu.setSexo(usu_sexo);
        const retorno = await UsuarioDAO.alterar(usu);
        return response.json(retorno);
    },

    async excluirUsuario(request, response) {
        const { usu_id } = request.params;
        const retorno = await UsuarioDAO.excluir(usu_id);
        return response.json(retorno);
    }
}