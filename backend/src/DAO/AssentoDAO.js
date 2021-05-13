const db = require('../models/Database')

module.exports = {

    async gravar(assento) {
        const sql = "INSERT INTO assento (sal_id, ast_numero, ast_fileira) " +
            "VALUES (?, ?, ?)";
        const valores = [asssento.getSalId(), assento.getNome(), assento.getFileira()];
        await db.conecta();
        const result = await db.manipula(sql, valores);
        return result;
    },
    async alterar(assento) {
        const sql = "UPDATE assento SET ast_numero = ?, ast_fileira = ? WHERE ast_id = ?";
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

    async listar() {
        const sql = "SELECT * FROM assento";
        await db.conecta();
        const result = await db.manipula(sql, valor);
        return result.data;
    },

    async listarAssentosFileira(sal_id, ast_fileira) {
        const sql = "SELECT * FROM Assento WHERE sal_id= AND ast_fileira=? ORDER BY ast_num";
        const valores = [sal_id, ast_fileira];
        await db.conecta();
        const result = await db.manipula(sql, valores);
        return result.data;
    },

    async listarAssentosOcupados(eve_id, ses_id) {
        const sql = "SELECT * FROM assento, ingresso, sessao, evento " +
            "WHERE ingresso.ses_id=sessao.ses_id AND ingresso.eve_id=sessao.eve_id" +
            "AND ingresso.ast_id=assento.ast_id AND sessao.eve_id  = ? AND sessao.ses_id = ?";
        const valores = [eve_id, ses_id];
        await db.conecta();
        const result = await db.manipula(sql, valores);
        return result.data;
    }
}