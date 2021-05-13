class Usuario {
    constructor(id, nome, sobrenome, email, senha, nivel) {
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.senha = senha;
        this.nivel = nivel;
    }

    static SemId(nome, sobrenome, email, senha, nivel) {
        this(0, nome, sobrenome, email, senha, nivel);
    }


    static DadosCompra(id, nome, sobrenome, email, senha, cpf, dtNasc, endereco, cidade, cep, fone, sexo, nivel) {
        this(id, nome, sobrenome, email, senha, nivel);
        this.cpf = cpf;
        this.dtNasc = dtNasc;
        this.endereco = endereco;
        this.cidade = cidade;
        this.cep = cep;
        this.fone = fone;
        this.sexo = sexo;
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

    getCpf() {
        return this.cpf;
    }
    setCpf(cpf) {
        this.cpf = cpf;
    }

    getDtNasc() {
        return this.dtNasc;
    }
    setDtNasc(dtNasc) {
        this.dtNasc = dtNasc;
    }

    getEndereco() {
        return this.endereco;
    }
    setEndereco(endereco) {
        this.endereco = endereco;
    }

    getCidade() {
        return this.cidade;
    }
    setCidade(cidade) {
        this.cidade = cidade;
    }

    getCep() {
        return this.cep;
    }
    setCep(cep) {
        this.cep = cep;
    }

    getFone() {
        return this.fone;
    }
    setFone(fone) {
        this.fone = fone;
    }

    getSexo() {
        return this.sexo;
    }
    setSexo(sexo) {
        this.sexo = sexo;
    }
}

module.exports = Usuario;