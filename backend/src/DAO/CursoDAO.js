const db = require('../models/Database')

module.exports = {
    gravar(Curso) {


    },

    alterar(Curso) {

    },

    excluir(id) {
        db.conecta();
        return db.manipula("DELETE FROM Curso WHERE cur_id = ?", id);
    },

    listarCursos() {
        db.conecta();
        return db.consulta("SELECT * FROM curso").data;
    },

    listarCursosAtivos() {
        db.conecta();
        return db.consulta("SELECT * FROM curso WHERE cur_status = 'A'").data;
    }
}