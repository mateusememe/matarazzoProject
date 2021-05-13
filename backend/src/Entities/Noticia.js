class Noticia {
    constructor(id, titulo, data, dataFim, usu_id, cat_id, descricao) {
        this.id = id;
        this.titulo = titulo;
        this.data = data;
        this.dataFim = dataFim;
        this.usu_id = usu_id;
        this.cat_id = cat_id;
        this.descricao = descricao;
    }
    static SemId(titulo, data, dataFim, usu_id, cat_id, descricao) {
        return new Categoria(0, titulo, data, dataFim, usu_id, cat_id, descricao);
    }

    getTitulo() {
        return this.titulo;
    }
    setTitulo(titulo) {
        this.titulo = titulo;
    }

    getDescricao() {
        return this.descricao;
    }
    setDescricao(descricao) {
        this.descricao = descricao;
    }

    getData() {
        return this.data;
    }
    setData(data) {
        this.data = data;
    }

    getDataFim() {
        return this.dataFim;
    }
    setDataFim(dataFim) {
        this.dataFim = dataFim;
    }


    getUsuId() {
        return this.usu_id;
    }
    setUsuId(usu_id) {
        this.usu_id = usu_id;
    }

    getCatId() {
        return this.cat_id;
    }
    setCatId(cat_id) {
        this.cat_id = cat_id;
    }
}
module.exports = Noticia;