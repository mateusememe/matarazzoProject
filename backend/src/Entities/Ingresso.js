class Ingresso {
  constructor(ing_id, ing_qrCode, eve_id, ses_id, ven_id, ast_id) {
    this.ing_id = ing_id;
    this.ing_qrCode = ing_qrCode;
    this.eve_id = eve_id;
    this.ses_id = ses_id;
    this.ven_id = ven_id;
    this.ast_id = ast_id;
  }
  static SemId(ing_qrCode, eve_id, ses_id, ven_id, ast_id) {
    return new Ingresso(0, ing_qrCode, eve_id, ses_id, ven_id, ast_id);
  }

  getId() {
    return this.ing_id;
  }

  getQrCode() {
    return this.ing_qrCode;
  }

  getEveId() {
    return this.eve_id;
  }

  getSesId() {
    return this.ses_id;
  }

  getVenId() {
    return this.ven_id;
  }

  getAstId() {
    return this.ast_id;
  }

  setIngId(ing_id) {
    this.ing_id = ing_id;
  }

  setQrCode(qrCode) {
    this.ing_qrCode = qrCode;
  }

  setEveId(eve_id) {
    this.eve_id = eve_id;
  }

  setSesId(ses_id) {
    this.ses_id = ses_id;
  }

  setVenId(venId) {
    this.ven_id = ven_id;
  }

  setAstId(ast_id) {
    this.ast_id = ast_id;
  }
}

module.exports = Ingresso;