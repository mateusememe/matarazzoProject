const db = require('../models/Database');

module.exports = {
//cadastros básicos e login
    async login(request, response) {
        const {email, senha} = request.query;
        const con = await db.conecta();
        const sql = "SELECT * FROM Usuario WHERE usu_email = ? and usu_senha = ?";
        const valores = [email, senha];
        const result = await db.consulta(sql, valores);
        return response.json(result);
    },
    async listarUsuarios(request, response) {
        const con = await db.conecta();
        const sql = "SELECT * FROM Usuario";
        const usuarios = await db.consulta(sql);
        return response.json(usuarios.data);
    },
    async gravarUsuario(request, response){
        const {usu_email, usu_senha, usu_nome, usu_dtNasc, usu_fone, usu_cpf, usu_sexo} = request.body;
        const con = await db.conecta();
        const sql = "INSERT INTO Usuario (usu_email, usu_senha, usu_nome, usu_dtNasc, usu_fone, usu_cpf, usu_sexo) "+
        "VALUES (?, ?, ?, ?, ?, ?, ?)";
        const valores = [usu_email, usu_senha, usu_nome, usu_dtNasc, usu_fone, usu_cpf, usu_sexo];
        const result = await db.manipula(sql, valores);
        return response.json(result);
    },
    async alterarUsuario(request, response) {
        const {usu_id, usu_email, usu_senha, usu_nome, usu_dtNasc, usu_fone, usu_cpf, usu_sexo} = request.body;
        const con = await db.conecta();
        const sql = "UPDATE Usuario SET usu_email = ?, usu_senha = ?, usu_nome = ?, usu_dtNasc = ?, usu_fone = ?, usu_cpf = ?, usu_sexo = ? WHERE usu_id = ?";
        const valores = [usu_email, usu_senha, usu_nome, usu_dtNasc, usu_fone, usu_cpf, usu_sexo, usu_id];
        const result = await db.manipula(sql, valores);
        return response.json(result);
    },
    async excluirUsuario(request, response) {
        const {usu_id} = request.params;
        const con = await db.conecta();
        const sql = "DELETE FROM Usuario WHERE usu_id = ?";
        const valor = [usu_id];
        const result = await db.manipula(sql, valor);
        console.log(result);
        return response.json(result);
    },

}