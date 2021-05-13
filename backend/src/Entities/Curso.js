class Curso {
    constructor(id, nome, status, usu_id, categoria, valor, img) {
        this.id = id;
        this.nome = nome;
        this.status = status;
        this.usu_id = usu_id;
        this.categoria = categoria;
        this.valor = valor;
        this.img = img;
    }
    static curso(nome, status, usu_id, categoria, valor, img) {
        return new Curso(0, nome, status, usu_id, categoria, valor, img);
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

    getUsuId() {
        return this.usu_id;
    }
    setUsuId(usu_id) {
        this.usu_id = usu_id;
    }

    getCatid() {
        return this.categoria;
    }
    setCatid(categoria) {
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
module.exports = Curso;