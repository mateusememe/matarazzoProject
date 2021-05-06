export class Usuario {
    constructor(id, nome, sobrenome, email, senha, nivel) {
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.senha = senha;
        this.nivel = nivel;
    }
    constructor(nome, sobrenome, email, senha, nivel) {
        this(0, nome, sobrenome, email, senha, nivel);
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

    getSobrenome() {
        return this.sobrenome;
    }

    setSobrenome(sobrenome) {
        this.sobrenome = sobrenome;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email) {
        this.email = email;
    }

    getSenha() {
        return this.senha;
    }

    setSenha(senha) {
        this.senha = senha;
    }

    getNivel() {
        return this.nivel;
    }

    setNivel(nivel) {
        this.nivel = nivel;
    }
}