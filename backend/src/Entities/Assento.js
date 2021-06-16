class Assento {
    /*ast_id, sal_id, ast_num, ast_fileira*/
    constructor(salId, id, numero, fileira) {
        this.salId = salId;
        this.id = id;
        this.numero = numero;
        this.fileira = fileira;
    }

    static SemId(salId, numero, fileira) {
        return new Assento(salId, 0, numero, fileira);
    }

    getSalId() {
        return this.salId;
    }
    setSalId(salId) {
        this.salId = salId;
    }

    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
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
module.exports = Assento;