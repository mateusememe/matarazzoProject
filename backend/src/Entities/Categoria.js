export class Categoria {
    cosntructor(id, nome, tipo) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
    }
    constructor(nome, tipo) {
        this(0, nome, tipo);
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

    getTipo() {
        return this.tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }

}