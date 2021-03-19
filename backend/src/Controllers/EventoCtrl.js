const db = require('../models/Database');

module.exports = {

    async listarEvento(request, response) {//f
        await db.conecta();
        const sql = "SELECT * FROM evento";
        const eventos = await db.consulta(sql);
        return response.json(eventos.data);
    },

    async gravarEvento(request, response){//f
        const {eve_nome,eve_data,eve_status,eve_valor,usu_id,cat_id} = request.body;
        await db.conecta();
        const sql = "INSERT INTO evento (eve_nome,eve_data,eve_status,eve_valor,usu_id,cat_id) VALUES"+
        "(?,?,?,?,?,?)";
        const valores = [eve_nome,eve_data,eve_status,eve_valor,usu_id,cat_id];
        const result = await db.manipula(sql, valores);
        return response.json(result);
    },
 /* json:
    {
        "eve_nome":"Musical 2021",
        "eve_data":"12/12/2021",
        "eve_status":"a",
        "eve_valor":200,
        "usu_id":1,
        "cat_id":1
    }
 */


    async alterarEvento(request, response) {//f
        const {eve_id,eve_nome,eve_data,eve_status,eve_valor,usu_id,cat_id} = request.body;
        const con = await db.conecta();
        const sql = "UPDATE evento SET eve_nome = ?, eve_data = ?, eve_status = ?, eve_valor = ?, usu_id = ?, cat_id = ? WHERE eve_id = ?";
        const valores = [eve_nome,eve_data,eve_status,eve_valor,usu_id,cat_id,eve_id];
        const result = await db.manipula(sql, valores);
        return response.json(result);
    },

    async excluirEvento(request, response) {
        const {eve_id} = request.params;
        await db.conecta();
        const sql = "DELETE FROM Evento WHERE eve_id = ?";
        const valor = [eve_id];
        const result = await db.manipula(sql, valor);
        return response.json(result);
    },
}