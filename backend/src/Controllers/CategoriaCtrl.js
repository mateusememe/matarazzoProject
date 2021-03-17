const db = require('../models/Database');

module.exports = {

    async listarCategorias(request, response) {
        const con = await db.conecta();
        const sql = "SELECT * FROM Categoria";
        const categorias = await db.consulta(sql);
        return response.json(categorias.data);
    },
    //id numero fileira status
    async gravarCategoria(request, response){
        const {cat_nome} = request.body;
        const con = await db.conecta();
        const sql = "INSERT INTO Categoria (cat_nome) "+
        "VALUES (?)";
        const valores = [cat_nome];
        const result = await db.manipula(sql, valores);
        return response.json(result);
    },
    async alterarCategoria(request, response) {
        const {cat_id, cat_nome} = request.body;
        const con = await db.conecta();
        const sql = "UPDATE Categoria SET cat_nome = ? WHERE cat_id = ?";
        const valores = [cat_nome, cat_id];
        const result = await db.manipula(sql, valores);
        return response.json(result);
    },
    async excluirCategoria(request, response) {
        const {cat_id} = request.params;
        const con = await db.conecta();
        const sql = "DELETE FROM Categoria WHERE cat_id = ?";
        const valor = [cat_id];
        const result = await db.manipula(sql, valor);
        return response.json(result);
    },

}