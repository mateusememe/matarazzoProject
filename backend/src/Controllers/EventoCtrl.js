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
        const { id } = request.params;
        const result = await EventoDAO.buscarEvento(id);
        return response.json(result);
    },

    async gravarEvento(request, response) {

        const { eve_nome, eve_status, eve_dataInicio, eve_dataFim, cat_id, eve_img, usu_id, eve_valor } = request.body;
        const evento = Evento.SemId(eve_nome, eve_status, eve_dataInicio, eve_dataFim, cat_id, eve_img, usu_id, eve_valor);
        const result = await EventoDAO.gravar(evento);
        return response.json(result);
    },

    async alterarEvento(request, response) {//f

        const { eve_id, eve_nome, eve_status, eve_dataInicio, eve_dataFim, cat_id, eve_img, usu_id, eve_valor } = request.body;
        const evento = new Evento(eve_id, eve_nome, eve_status, eve_dataInicio, eve_dataFim, cat_id, eve_img, usu_id, eve_valor);
        const result = await EventoDAO.alterar(evento);
        return response.json(result);
    },

    async excluirEvento(request, response) {
        const { eve_id } = request.params;
        const result = await EventoDAO.excluir(eve_id);
        return response.json(result);
    },
}