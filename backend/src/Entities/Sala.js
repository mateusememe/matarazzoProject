class Sala {
  constructor(id, nome, qtdeAssento, qtdeFileira) {
    this.id = id;
    this.nome = nome;
    this.qtdeAssento = qtdeAssento;
    this.qtdeFileira = qtdeFileira;
    //sal_id, sal_nome, sal_qtdeAssento, sal_qtdeFileira
  }
  static SemId(id, nome, qtdeAssento, qtdeFileira) {
    return new Sala(0, id, nome, qtdeAssento, qtdeFileira);
  }
  getId() {
    return this.id;
  }
  getNome() {
    return this.nome;
  }
  getQtdeAssento() {
    return this.qtdeAssento;
  }
  getQtdeFileira() {
    return this.qtdeFileira;
  }
  setId(id) {
    this.id = id;
  }
  setNome(nome) {
    this.nome = nome;
  }
  setQtdeAssento(qtdeAssento) {
    this.qtdeAssento = qtdeAssento;
  }
  setQtdeFileira(qtdeFileira) {
    this.qtdeFileira = qtdeFileira;
  }

}
module.exports = Sala;