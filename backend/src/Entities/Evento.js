class Evento {
    constructor(id, nome, status, dataInicio, dataFim, cat_id, img, usu_id, valor) {
        this.id = id;
        this.nome = nome;
        this.status = status;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.cat_id = cat_id;
        this.img = img;
        this.usu_id = usu_id;
        this.valor = valor;
    }

    static SemId(nome, status, dataInicio, dataFim, cat_id, img, usu_id, valor) {
        return new Evento(0, nome, status, dataInicio, dataFim, cat_id, img, usu_id, valor);
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }

    getNome() {
        return this.nome;
    }
    setNome(nome) {
        this.nome = nome;
    }

    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }

    getDataInicio() {
        return this.data;
    }
    setDataInicio(data) {
        this.data = data;
    }

    getDataFim() {
        return this.dataFim;
    }
    setDataFim() {
        this.dataFim = dataFim;
    }

    getCatId() {
        return this.cat_id;
    }
    setCatId(cat_id) {
        this.cat_id = cat_id;
    }

    getImg() {
        return this.img;
    }
    setImg(img) {
        this.img = img;
    }

    getUsuId() {
        return this.usu_id;
    }
    setUsuId(usu_id) {
        this.usu_id = usu_id;
    }

    getValor() {
        return this.valor;
    }
    setValor(valor) {
        this.valor = valor;
    }

}
module.exports = Evento;