const db = require('../models/Database');

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
        await db.conecta();
        const sql = "SELECT * FROM Usuario";
        const usuarios = await db.consulta(sql);
        return response.json(usuarios.data);
    },

    async buscarUsuario(request, response) {
        const { usu_id } = request.params;
        await db.conecta();
        const sql = "SELECT * FROM Usuario WHERE usu_id = "+usu_id;
        const usuarios = await db.consulta(sql);
        return response.json(usuarios.data);
    },

    async gravarUsuario(request, response) {
        const usu_nivel = 'U';
        const {
            usu_nome, usu_sobrenome, usu_email,
            usu_senha
        } = request.body;
        await db.conecta();
        const sql = "INSERT INTO Usuario (usu_nome, usu_sobrenome," +
            "usu_email, usu_senha, usu_nivel) " +
            "VALUES (?, ?, ?, ?, ?)";
        
        const valores = [
            usu_nome, usu_sobrenome, usu_email,
            usu_senha, usu_nivel
        ];
        const result = await db.manipula(sql, valores);
        return response.json(result);
    },

    async alterarUsuario(request, response) {
        const {
            usu_nome, usu_sobrenome, usu_email,
            usu_senha, usu_cpf, usu_dtNasc, usu_endereco,
            usu_cidade, usu_cep, usu_fone, usu_sexo, usu_id
        } = request.body;
        await db.conecta();
        const sql = "UPDATE Usuario SET usu_nome = ?, usu_sobrenome = ?,"
       +" usu_email = ?, usu_senha = ?, usu_cpf = ?, usu_dtNasc = ?, usu_endereco = ?,"
       +" usu_cidade = ?, usu_cep = ?, usu_fone = ?, usu_sexo = ? WHERE usu_id = ?";
        const valores = [
            usu_nome, usu_sobrenome, usu_email,
            usu_senha, usu_cpf, usu_dtNasc, usu_endereco,
            usu_cidade, usu_cep,usu_fone, usu_sexo, usu_id
        ];
        const result = await db.manipula(sql, valores);
        return response.json(result);
    },

    async excluirUsuario(request, response) {
        const { usu_id } = request.params;
        await db.conecta();
        const sql = "DELETE FROM Usuario WHERE usu_id = ?";
        const valor = [usu_id];
        const result = await db.manipula(sql, valor);
        console.log(result);
        return response.json(result);
    }
}