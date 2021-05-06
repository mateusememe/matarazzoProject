const db = require('../models/database.js')
const Usuario = require('../Entities/Usuario');
const UsuarioDAO = require('../DAO/UsuarioDAO');

module.exports = {
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
    }

}
