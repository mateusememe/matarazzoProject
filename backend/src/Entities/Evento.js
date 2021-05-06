export class Evento {
    constructor(id, nome, status, data, horario, cat_id, img, usu_id, valor) {
        this.id = id;
        this.nome = nome;
        this.status = status;
        this.data = data;
        this.horario = horario;
        this.cat_id = cat_id;
        this.img = img;
        this.usu_id = usu_id;
        this.valor = valor;
    }
    constructor(nome, status, data, horario, cat_id, img, usu_id, valor) {
        this(0, nome, status, data, horario, cat_id, img, usu_id, valor);
    }
    constructor() {
        this(0, 0, 0);
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

    getData() {
        return this.data;
    }
    setData(data) {
        this.data = data;
    }

    getHorario() {
        return this.horario;
    }
    setHorario() {
        this.horario = horario;
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