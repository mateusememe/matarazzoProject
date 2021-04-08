const db = require('../models/Database');

module.exports = {

    async listarAssentos(request, response) {
        const con = await db.conecta();
        const sql = "SELECT * FROM assento";
        const assentos = await db.consulta(sql);
        return response.json(assentos.data);
    },
    //id numero fileira status
    async gravarAssento(request, response){
        const {ass_numero, ass_fileira} = request.body;
        const con = await db.conecta();
        const sql = "INSERT INTO assento (ass_numero, ass_fileira) "+
        "VALUES (?, ?)";
        const valores = [ass_numero, ass_fileira];
        const result = await db.manipula(sql, valores);
        return response.json(result);
    },
    async alterarAssento(request, response) {
        const {ass_id, ass_numero, ass_fileira} = request.body;
        const con = await db.conecta();
        const sql = "UPDATE assento SET ass_numero = ?, ass_fileira = ? WHERE ass_id = ?";
        const valores = [ass_numero, ass_fileira, ass_id];
        const result = await db.manipula(sql, valores);
        return response.json(result);
    },
    async excluirAssento(request, response) {
        const {ass_id} = request.params;
        const con = await db.conecta();
        const sql = "DELETE FROM assento WHERE ass_id = ?";
        const valor = [ass_id];
        const result = await db.manipula(sql, valor);
        console.log(result);
        return response.json(result);
    },

}