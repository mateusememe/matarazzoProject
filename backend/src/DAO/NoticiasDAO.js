const db = require('../models/Database')

module.exports = {
    async gravar(noticia) {
        const sql = "INSERT INTO noticia (not_titulo, not_descricao, not_data, not_dataFim, usu_id, cat_id) " +
            "VALUES (?, ?, ?, ?, ?, ?)";
        const valores = [
            noticia.getTitulo(), noticia.getDescricao(), noticio.getData(), noticia.getDataFim(), noticia.getUsuId(), noticia.getCatId()];
        await db.conecta();
        const result = await db.manipula(sql, valores);
        return result;
    },
    async alterar(noticia) {
        const sql = "UPDATE noticia SET not_titulo = ?, not_descricao = ?, not_data = ?, not_dataFim = ?, usu_id = ?, cat_id = ? " +
            "WHERE not_id = ?";
        const valores = [
            noticia.getTitulo(), noticia.getDescricao(), noticia.getData(), noticia.getDataFim(), noticia.getUsuId(), noticia.getCatId(), noticia.getId()
        ];
        await db.conecta();
        const result = await db.manipula(sql, valores);
        return result;
    },

    async excluir(id) {
        const sql = "DELETE FROM noticia WHERE not_id = ?";
        const valor = [id];
        await db.conecta();
        const result = await db.manipula(sql, valor);
        return result;
    },
    async listar() {
        const sql = "SELECT * FROM noticia";
        await db.consulta(sql);
        const noticias = await db.consulta(sql);
        return noticias.data;
    },
    async buscarId(id) {
        var sql = "SELECT * FROM noticia WHERE not_id=" + id;
        await db.conecta();
        const noticia = await db.consulta(sql);
        return noticia.data;
    }
}