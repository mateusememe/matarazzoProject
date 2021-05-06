//const usuario = require('../Entities/Usuario');
const db = require('../models/Database')
module.exports = {
    gravar(usuario) {
        const sql = "INSERT INTO Usuario (usu_nome, usu_sobrenome," +
            "usu_email, usu_senha, usu_nivel) " +
            "VALUES (?, ?, ?, ?, ?)";

        const valores = [
            usuario.getNome(), usuario.getSobrenome(),
            usuario.getEmail(), usuario.getSenha(),
            usuario.getNivel()
        ];

        await db.conecta();
        const result = await db.manipula(sql, valores);
        return result;
    }
}