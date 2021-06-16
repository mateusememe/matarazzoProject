const db = require('../models/Database')

module.exports = {

    async gravar(assento) {
        const sql = "INSERT INTO assento (sal_id, ast_num, ast_fileira) " +
            "VALUES (?, ?, ?)";
        const valores = [assento.getSalId(), assento.getNumero(), assento.getFileira()];
        await db.conecta();
        const result = await db.manipula(sql, valores);
        return result;
    },
    async alterar(assento) {
        const sql = "UPDATE assento SET ast_num = ?, ast_fileira = ? WHERE ast_id = ?";
        const valores = [assento.getNumero(), assento.getFileira(), assento.getId()];
        await db.conecta();
        const result = await db.manipula(sql, valores);
        return result;
    },
    async excluir(sal_id, ast_id) {
        const sql = "DELETE FROM assento WHERE sal_id = ? AND ast_id = ?";
        const valor = [sal_id, ast_id];
        await db.conecta();
        const result = await db.manipula(sql, valor);
        return result;
    },
    async excluirPorSala(sal_id) {
        const sql = "DELETE FROM assento WHERE sal_id = ?";
        const valor = [sal_id];
        await db.conecta();
        const result = await db.manipula(sql, valor);
        return result;
    },

    async listar() {
        const sql = "SELECT * FROM assento";
        await db.conecta();
        const result = await db.consulta(sql, valor);
        return result.data;
    },

    async listarAssentosFileira(sal_id, ast_fileira) {
        const sql = "SELECT * FROM Assento WHERE sal_id=? AND ast_fileira=? ORDER BY ast_num";
        const valores = [sal_id, ast_fileira];
        await db.conecta();
        const result = await db.consulta(sql, valores);
        return result.data;
    },

    async listarAssentosOcupados(eve_id, ses_id) {
        const sql = "select ast_id from ingresso where ingresso.eve_id=? AND ingresso.ses_id=?";
        const valores = [eve_id, ses_id];
        await db.conecta();
        const result = await db.consulta(sql, valores);
        return result.data;
    }
}
