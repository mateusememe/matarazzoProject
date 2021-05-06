export class Noticia {
    constructor(id, titulo, data, usu_id, cat_id) {
        this.id = id;
        this.titulo = titulo;
        this.data = data;
        this.usu_id = usu_id;
        this.cat_id = cat_id;
    }
    constructor(titulo, data, usu_id, cat_id) {
        this(0, titulo, data, usu_id, cat_id);
    }
    constructor() {
        this(0, 0, 0);
    }

    getTitulo() {
        return this.titulo;
    }
    setTitulo(titulo) {
        this.titulo = titulo;
    }

    getData() {
        return this.data;
    }
    setData(data) {
        this.data = data;
    }

    getUsu_id() {
        return this.usu_id;
    }
    setUsu_id(usu_id) {
        this.usu_id = usu_id;
    }

    getCat_id() {
        return this.cat_id;
    }
    setCat_id(cat_id) {
        this.cat_id = cat_id;
    }

}
/*
    not_titulo, not_data, not_adm, not_categoria

*/