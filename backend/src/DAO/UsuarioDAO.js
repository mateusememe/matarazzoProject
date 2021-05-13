const db = require('../models/Database');

module.exports = {
    async gravar(usuario) {
        const sql = "INSERT INTO usuario (usu_nome, usu_sobrenome, usu_email, usu_senha, usu_nivel) " +
            "VALUES (?, ?, ?, ?, ?)";

        const valores = [
            usuario.getNome(), usuario.getSobrenome(),
            usuario.getEmail(), usuario.getSenha(),
            usuario.getNivel()
        ];

        await db.conecta();
        const result = await db.manipula(sql, valores);
        return result;
    },

    async alterar(usuario) {
        const sql = "UPDATE usuario SET usu_nome = ?, usu_sobrenome = ?,"
            + " usu_email = ?, usu_senha = ?, usu_cpf = ?, usu_dtNasc = ?, usu_endereco = ?,"
            + " usu_cidade = ?, usu_cep = ?, usu_fone = ?, usu_sexo = ? WHERE usu_id = ?";
        const valores = [
            usuario.getNome(), usuario.getSobrenome(), usuario.getEmail(),
            usuario.getSenha(), usuario.getCpf(), usuario.getDtNasc(), usuario.getEndereco(),
            usuario.getCidade(), usuario.getCep(), usuario.getFone(), usuario.getSexo(), usuario.getId()
        ];
        await db.conecta();
        const result = await db.manipula(sql, valores);
        return result;
    },

    async excluir(id) {
        const sql = "DELETE FROM usuario WHERE usu_id = ?";
        const valor = [id];
        await db.conecta();
        const result = await db.manipula(sql, valor);
        return result;
    },

    async listarUsuarios() {
        const sql = "SELECT * FROM usuario";
        await db.conecta();
        const usuarios = await db.consulta(sql);
        return usuarios.data;
    }

}