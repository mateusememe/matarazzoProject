const db = require('../models/Database');

module.exports = {
    async login(email, senha) {
        await db.conecta();
        const sql = "SELECT * FROM Usuario WHERE usu_email = ? and usu_senha = ?";
        const valores = [email, senha];
        const result = await db.consulta(sql, valores);
        return result.data;
    },

    async gravar(usuario) {
        const sql = "INSERT INTO usuario (usu_nome, usu_sobrenome, usu_email, usu_senha, usu_nivel) " +
            "VALUES (?, ?, ?, ?, ?)";

        const valores = [
            usuario.getNome(), usuario.getSobrenome(),
            usuario.getEmail(), usuario.getSenha(),
            usuario.getNivel()
        ];

        await db.conecta();
        return db.manipula(sql, valores);
    },

    async alterar(usuario) {
        console.log("no alterar")
        const sql = "UPDATE usuario SET usu_nome = ?, usu_sobrenome = ?,"
            + " usu_email = ?, usu_senha = ?, usu_cpf = ?, usu_dtNasc = ?, usu_endereco = ?,"
            + " usu_cidade = ?, usu_cep = ?, usu_fone = ?, usu_sexo = ? WHERE usu_id = ?";
        const valores = [
            usuario.getNome(), usuario.getSobrenome(), usuario.getEmail(),
            usuario.getSenha(), usuario.getCpf(), usuario.getDtNasc(), usuario.getEndereco(),
            usuario.getCidade(), usuario.getCep(), usuario.getFone(), usuario.getSexo(), usuario.getId()
        ];
        console.log("sql: " + sql + " valores: " + valores);
        await db.conecta();
        return db.manipula(sql, valores);
    },

    async excluir(id) {
        const sql = "DELETE FROM usuario WHERE usu_id = ?";
        const valor = [id];
        await db.conecta();
        return db.manipula(sql, valor);
    },

    async listarUsuarios() {
        const sql = "SELECT * FROM usuario";
        await db.conecta();
        const usuarios = await db.consulta(sql);
        return usuarios.data;
    },
    async buscarUsuario(email) {
        await db.conecta();
        const sql = "SELECT usu_email FROM Usuario WHERE usu_email = ?";
        const value = [email];
        const usuarios = await db.consulta(sql, value);
        return usuarios.data;
    },

    async buscarUsuarioId(id) {
        await db.conecta();
        const sql = "SELECT * FROM Usuario WHERE usu_id = ?";
        const value = [id];
        const usuario = await db.consulta(sql, value);
        return usuario.data;
    }

}