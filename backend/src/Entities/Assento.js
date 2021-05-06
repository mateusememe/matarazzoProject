export class Assento {
    constructor(id, numero, fileira) {
        this.id = id;
        this.numero = numero;
        this.fileira = fileira;
    }
    constructor(numero, fileira) {
        this(0, numero, fileira);
    }
    constructor() {
        this(0, 0, 0);
    }
    getNumero() {
        return this.numero;
    }
    setNumero(numero) {
        this.numero = numero;
    }

    getFileira() {
        return this.fileira;
    }
    setFileira(fileira) {
        this.fileira = fileira;
    }

}