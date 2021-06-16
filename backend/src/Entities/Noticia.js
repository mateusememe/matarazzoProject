class Noticia {
    constructor(id, titulo, data, dataFim, usu_id, cat_id, descricao, imagem) {
        this.id = id;
        this.titulo = titulo;
        this.data = data;
        this.dataFim = dataFim;
        this.usu_id = usu_id;
        this.cat_id = cat_id;
        this.descricao = descricao;
        this.imagem = imagem;
    }
    static SemId(titulo, data, dataFim, usu_id, cat_id, descricao, imagem) {
        return new Noticia(0, titulo, data, dataFim, usu_id, cat_id, descricao, imagem);
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

    getImagem() {
        return this.imagem;
    }
    setImagem(imagem) {
        this.imagem = imagem;
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

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getExibe() {
        let text = "[" + this.id + "," + this.titulo + "," + this.data + "," + this.dataFim + "," + this.usu_id + "," + this.cat_id + "," + this.descricao + "," + this.imagem + "]"
        return text;
    }
}
module.exports = Noticia;