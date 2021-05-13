const db = require('../models/Database')

module.exports = {
  async QtdeFileiras(sal_id) {
    const sql = "SELECT sal_qtdeFileira FROM sala WHERE sal_id=" + sal_id;
    db.conecta();
    const fileiras = await db.consulta(sql);
    console.log(fileiras.data);
    return fileiras.data;
  }
}
