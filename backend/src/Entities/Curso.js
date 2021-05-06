export class Curso {
    constructor(id, nome, status, adm, categoria, valor, img) {
        this.id = id;
        this.nome = nome;
        this.status = status;
        this.adm = adm;
        this.categoria = categoria;
        this.valor = valor;
        this.img = img;
    }
    constructor(nome, status, adm, categoria, valor, img) {
        this(0, nome, status, adm, categoria, valor, img);
    }
    constructor() {
        this(0, 0, 0);
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

    getAdm() {
        return this.adm;
    }
    setAdm(adm) {
        this.adm = adm;
    }

    getCategoria() {
        return this.categoria;
    }
    setCategoria(categoria) {
        this.categoria = categoria;
    }

    getValor() {
        return this.valor;
    }
    setValor(valor) {
        this.valor = valor;
    }

    getImg() {
        return this.img;
    }
    setImg(img) {
        this.img = img;
    }

}