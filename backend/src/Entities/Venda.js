class Venda {
  constructor(id, data, MetodoPgmt, usu_id, eve_id, ses_id) {
    this.id = id;
    this.data = data;
    this.MetodoPgmt = MetodoPgmt;
    this.usu_id = usu_id;
    this.eve_id = eve_id;
    this.ses_id = ses_id;
  }

  static semId(data, MetodoPgmt, usu_id, eve_id, ses_id) {
    return new Venda(0, data, MetodoPgmt, usu_id, eve_id, ses_id);
  }

  getId() {
    return this.id;
  }
  getData() {
    return this.data;
  }
  getMetodoPgmt() {
    return this.MetodoPgmt;
  }
  getUsu_id() {
    return this.usu_id;
  }
  getEve_id() {
    return this.eve_id;
  }
  getSes_id() {
    return this.ses_id;
  }


  setId(id) {
    this.id = id;
  }
  setData(data) {
    this.data = data;
  }
  setMetodoPgmt(MetodoPgmt) {
    this.MetodoPgmt = MetodoPgmt;
  }
  setUsu_id(usu_id) {
    this.usu_id = usu_id;
  }
  setEve_id(eve_id) {
    this.eve_id = eve_id;
  }
  setSes_id(ses_id) {
    this.ses_id = ses_id;
  }
}
module.exports = Venda;