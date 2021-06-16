const EventoDAO = require('../DAO/EventoDAO')
const Evento = require('../Entities/Evento')

module.exports = {

    async listarEventos(request, response) {
        const result = await EventoDAO.listarEventos();
        return response.json(result);
    },

    async listarEventosAtivo(request, response) {
        const result = await EventoDAO.listarEventosAtivo();
        return response.json(result);
    },

    async buscarEventoId(request, response) {
        const { eve_id } = request.params;
        const result = await EventoDAO.buscarEvento(eve_id);
        return response.json(result);
    },

    async gravarEvento(request, response) {
        const {
            eve_nome, eve_status, eve_data, eve_dataFim, eve_horario, eve_horarioFim,
            eve_categoria, eve_img, eve_adm, eve_valor, eve_desc
        } = request.body;
        //(nome, status, dataInicio, dataFim, cat_id, img, usu_id, valor, descricao
        const evento = Evento.SemId(eve_nome, eve_status, eve_data, eve_dataFim, eve_horario,
            eve_horarioFim, eve_categoria, eve_img, eve_adm, eve_valor, eve_desc
        );
        const result = await EventoDAO.gravar(evento);
        return response.json(result);
    },

    async alterarEvento(request, response) {//f
        const { eve_nome, eve_status, eve_data, eve_dataFim, eve_horario, eve_horarioFim, eve_categoria, eve_img, eve_adm, eve_valor, eve_desc, eve_id } = request.body;
        const evento = new Evento(eve_id, eve_nome, eve_status, eve_data, eve_dataFim, eve_horario, eve_horarioFim,
            eve_categoria, eve_img, eve_adm, eve_valor, eve_desc);
        const result = await EventoDAO.alterar(evento);
        return response.json(result);
    },

    async excluirEvento(request, response) {
        const { eve_id } = request.params;
        const result = await EventoDAO.excluir(eve_id);
        return response.json(result);
    },
}