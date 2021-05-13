const db = require('../models/Database')

module.exports = {
    async gravar(categoria) {
        const sql = "INSERT INTO categoria (cat_nome, cat_tipo) " +
            "VALUES (?, ?)";
        const valores = [
            categoria.getNome(), categoria.getTipo()
        ];
        await db.conecta();
        const result = await db.manipula(sql, valores);
        return result;
    },

    async alterar(categoria) {
        const sql = "UPDATE categoria SET cat_nome = ?, cat_tipo = ? WHERE cat_id = ?";
        const valores = [
            categoria.getNome(), categoria.getTipo(), categoria.getId()
        ];
        await db.conecta();
        const result = await db.manipula(sql, valores);
        return result;
    },

    async excluir(id) {
        const sql = "DELETE FROM categoria WHERE cat_id = ?";
        const valor = [id];
        await db.conecta();
        const result = await db.manipula(sql, valor);
        return result;
    },

    async listarCategorias(tipoCat) {
        var filtro = "";
        if (tipoCat !== 'null')
            filtro += " WHERE cat_tipo ='" + tipoCat + "'";
        const sql = "SELECT * FROM categoria " + filtro;
        await db.conecta();
        const categorias = await db.consulta(sql);
        return categorias.data;
    },

    async buscarCategoriaId(id) {
        var sql = "SELECT * FROM Categoria WHERE cat_id=" + id;
        await db.conecta();
        const categoria = await db.consulta(sql);
        return categoria.data;
    },

    async buscarCategoria(cat) {
        var sql = "SELECT * FROM Categoria WHERE cat_nome='" + cat.getNome + "' AND cat_tipo='" + cat.getTipo + "'";
        await db.conecta();
        const categorias = await db.consulta(sql);
        return categorias.data;
    }
}