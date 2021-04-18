const db = require('../models/Database');

module.exports = {

    async listarCategorias(request, response) {
        const {tipoCat} = request.params;
        const con = await db.conecta();
        var sql = "SELECT * FROM Categoria";
        if(tipoCat !== 'null')
            sql += " WHERE cat_tipo ='"+tipoCat+"'";
        const categorias = await db.consulta(sql);
        return response.json(categorias.data);
    },
    async buscarCategoria(request, response) {
        const {cat_nome, cat_tipo} = request.params;
        const con = await db.conecta();
        var sql = "SELECT * FROM Categoria WHERE cat_nome='"+cat_nome+"' AND cat_tipo='"+cat_tipo+"'";            
        const categorias = await db.consulta(sql);
        console.log(sql);
        return response.json(categorias.data);
    },
    //id numero fileira status
    async gravarCategoria(request, response){
        const {cat_nome, cat_tipo} = request.body;
        const con = await db.conecta();
        const sql = "INSERT INTO Categoria (cat_nome, cat_tipo) "+
        "VALUES (?,?)";
        const valores = [cat_nome, cat_tipo];
        const result = await db.manipula(sql, valores);
        return response.json(result);
    },
    async alterarCategoria(request, response) {
        const {cat_id, cat_nome, cat_tipo} = request.body;
        const con = await db.conecta();
        const sql = "UPDATE Categoria SET cat_nome = ?, cat_tipo = ? WHERE cat_id = ?";
        const valores = [cat_nome, cat_id, cat_tipo];
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