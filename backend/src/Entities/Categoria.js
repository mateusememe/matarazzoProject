class Categoria {
    constructor(id, nome, tipo) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
    }

    static SemId(nome, tipo) {
        return new Categoria(0, nome, tipo);
    }

    getNome() {
        return this.nome;
    }
    setNome(nome) {
        this.nome = nome;
    }

    getTipo() {
        return this.tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
}

module.exports = Categoria;