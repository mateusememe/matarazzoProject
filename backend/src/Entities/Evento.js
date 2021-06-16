class Evento {
    constructor(id, nome, status, data, dataFim, horario, horarioFim, cat_id, img, usu_id, valor, descricao) {
        this.id = id;
        this.nome = nome;
        this.status = status;
        this.data = data;
        this.dataFim = dataFim;
        this.horario = horario;
        this.horarioFim = horarioFim;
        this.cat_id = cat_id;
        this.img = img;
        this.usu_id = usu_id;
        this.valor = valor;
        this.descricao = descricao;
    }
    /*eve_nome, eve_status, eve_data, eve_dataFim, eve_horario, eve_horarioFim,
        eve_categoria, eve_img, eve_adm, eve_valor, eve_desc*/
    static SemId(nome, status, data, dataFim, horario, horarioFim, cat_id, img, usu_id, valor, descricao) {
        return new Evento(0, nome, status, data, dataFim, horario, horarioFim, cat_id, img, usu_id, valor, descricao);
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

    getDataFim() {
        return this.dataFim;
    }
    setDataFim(dataFim) {
        this.dataFim = dataFim;
    }
    getHorario() {
        return this.horario;
    }
    setHorario(horario) {
        this.horario = horario;
    }
    getHorarioFim() {
        return this.horarioFim;
    }
    setHorarioFim(horarioFim) {
        this.horarioFim = horarioFim;
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

    getDesc() {
        return this.descricao;
    }
    setDesc(descricao) {
        this.descricao = descricao;
    }

}
module.exports = Evento;