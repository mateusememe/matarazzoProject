const db = require('../models/Database')
const fs = require('fs');

module.exports = {
    async gravar(noticia) {
        const sql = "INSERT INTO noticia (not_titulo, not_data, not_dataFim, usu_id, cat_id, not_descricao, not_img) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?)";
        const valores = [
            noticia.getTitulo(), noticia.getData(), noticia.getDataFim(),
            noticia.getUsuId(), noticia.getCatId(), noticia.getDescricao(),
            noticia.getImagem()
        ];
        await db.conecta();
        const result = await db.manipula(sql, valores);
        console.log("Noticia:{ \n\tValores na DAO: " + valores + "\n\tresult status: " + result.data + "\n}");
        return result;
    },
    async alterar(noticia) {
        const sql = "UPDATE noticia SET not_titulo = ?, not_descricao = ?, not_data = ?, not_dataFim = ?, usu_id = ?, cat_id = ?, not_img = ? " +
            "WHERE not_id = ?";
        const valores = [
            noticia.getTitulo(), noticia.getDescricao(),
            noticia.getData(), noticia.getDataFim(),
            noticia.getUsuId(), noticia.getCatId(),
            noticia.getImagem(), noticia.getId()
        ];
        console.log(noticia.getTitulo(), noticia.getDescricao(),
            noticia.getData(), noticia.getDataFim(),
            noticia.getUsuId(), noticia.getCatId(),
            noticia.getImagem(), noticia.getId());
        await db.conecta();
        const result = await db.manipula(sql, valores);
        return result;
    },

    async excluir(id) {
        let noticiaImg = await this.buscarNoticiaIMG(id);
        const sql = "DELETE FROM noticia WHERE not_id = ?";
        const valor = [id];
        await db.conecta();
        const result = await db.manipula(sql, valor);
        if (result.status) {
            if (noticiaImg != "")
                fs.unlink("../frontend/public/uploads/noticia/" + noticiaImg, (err => {
                    if (err) console.log("Error ao excluir Noticia: [" + err + "]");
                }));
        }
        return result;
    },

    async buscarNoticiaIMG(not_id) {
        await db.conecta();
        const sql = "SELECT not_img FROM Noticia WHERE not_id = ?";
        const value = [not_id];
        const noticia = await db.consulta(sql, value);
        return noticia.data[0].not_img;
    },
    async listar() {
        await db.conecta();
        const sql = "SELECT * FROM noticia";
        await db.consulta(sql);
        const noticias = await db.consulta(sql);
        return noticias.data;
    },
    async buscarId(id) {
        const sql = "SELECT * FROM noticia WHERE not_id=" + id;
        await db.conecta();
        const noticia = await db.consulta(sql);
        return noticia.data;
    }
}