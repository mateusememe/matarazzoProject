const { Router } = require('express');
const routes = Router();
const multer = require('multer');
const path = require('path');

const UsuCtrl = require('./Controllers/UsuarioCtrl');

routes.post('/usuarios/cadastro', UsuCtrl.gravarUsuario);
routes.get('/usuarios', UsuCtrl.listarUsuarios);
routes.put('/usuarios/alterar', UsuCtrl.alterarUsuario);
routes.delete('/usuarios/:usu_id', UsuCtrl.excluirUsuario);
routes.post('/usuarios/login', UsuCtrl.login);
routes.get('/usuarios/busca/:usu_email', UsuCtrl.buscarUsuario);//busca de um determinado usuário
routes.get('/usuarios/id/:id', UsuCtrl.buscarUsuarioId);

const VenCtrl = require('./Controllers/VendaCtrl');
routes.post('/venda/cadastro', VenCtrl.gravarVenda);
routes.get('/venda/:usu_id', VenCtrl.listarVendasUsuario);

const IngressoCtrl = require('./Controllers/IngressoCtrl');
routes.post('/ingresso/cadastro', IngressoCtrl.gravarIngresso);
routes.get('/ingresso/:ven_id', IngressoCtrl.listarIngressosVenda);
routes.get('/ingresso/usuario/:usu_id', IngressoCtrl.ingressosUsuario);
routes.get('/ingresso/qrCode/:ing_qrCode', IngressoCtrl.buscarIngressoQr);

const SesCtrl = require('./Controllers/SessaoCtrl');
routes.post('/sessoes', SesCtrl.gravar);
routes.get('/sessoes/datas/:eve_id', SesCtrl.listarSessoesEvento);
routes.get('/sessoes/salas_horarios/:eve_id/:data', SesCtrl.listarSalasHorarios);
routes.get('/sessoes/:ses_id', SesCtrl.buscarSessao);
routes.get('/sessoes/', SesCtrl.listarSessoes);
routes.delete('/sessoes/:id', SesCtrl.remover);
routes.put('/sessoes/incrementar_freq/:eve_id/:ses_id', SesCtrl.incrementarFreq);
routes.put('/sessoes/', SesCtrl.alterar);

const AssCtrl = require('./Controllers/AssentoCtrl');

routes.post('/assentos', AssCtrl.gravarAssento);
routes.get('/assentos', AssCtrl.listarAssentos);
routes.get('/assentos/:sal_id/:ast_fileira', AssCtrl.listarAssentosFileira);
routes.get('/assentosOcupados/:eve_id/:ses_id', AssCtrl.listarAssentosOcupados);
routes.put('/assentos', AssCtrl.alterarAssento);
routes.delete('/assentos/:ass_id', AssCtrl.excluirAssento);
routes.delete('/assentos/sala/:sal_id', AssCtrl.excluirAssentosSala);

//ROTAS PARA SALA
const SalCtrl = require('./Controllers/SalaCtrl');
routes.get('/sala/qtdeFileiras/:sal_id', SalCtrl.recuperaQtdeFileiras);
routes.get('/salas', SalCtrl.listarSalas);
routes.post('/salas', SalCtrl.gravar);
routes.put('/salas', SalCtrl.alterar);
routes.delete('/salas/:id', SalCtrl.remover);

const CatCtrl = require('./Controllers/CategoriaCtrl');

routes.post('/categorias', CatCtrl.gravarCategoria);
routes.get('/categorias/id/:id', CatCtrl.buscarCategoriaId);
routes.get('/categorias/tipo/:tipoCat', CatCtrl.listarCategorias);
routes.get('/categorias/:cat_nome/:cat_tipo', CatCtrl.buscarCategoria);
routes.put('/categorias', CatCtrl.alterarCategoria);
routes.delete('/categorias/:cat_id', CatCtrl.excluirCategoria);

const CurCtrl = require('./Controllers/CursoCtrl');

routes.get('/cursos', CurCtrl.listarCursos);
routes.get('/cursosAtivos', CurCtrl.listarCursosAtivos);
routes.post('/cursos', CurCtrl.gravarCurso);
routes.put('/cursos', CurCtrl.alterarCurso);
routes.delete('/cursos/:cur_id', CurCtrl.excluirCurso);
routes.get('/cursos/:cur_id', CurCtrl.buscarCurso);

const EveCtrl = require('./Controllers/EventoCtrl');

routes.get('/eventos', EveCtrl.listarEventos);
routes.get('/eventosAtivos', EveCtrl.listarEventosAtivo);
routes.post('/eventos', EveCtrl.gravarEvento);
routes.put('/eventos', EveCtrl.alterarEvento);
routes.delete('/eventos/:eve_id', EveCtrl.excluirEvento);
routes.get('/eventos/:eve_id', EveCtrl.buscarEventoId);

const NotCtrl = require('./Controllers/NoticiaCtrl');

routes.get('/noticias', NotCtrl.listarNoticia);
routes.post('/noticias', NotCtrl.gravarNoticia);
routes.put('/noticias', NotCtrl.alterarNoticia);
routes.delete('/noticias/:not_id', NotCtrl.excluirNoticia);
routes.get('/noticias/:not_id', NotCtrl.buscarNoticia);

//Controla upload
const storageEventos = multer.diskStorage({
    //fazer uma pasta dedicada
    destination: "../frontend/public/uploads/evento",
    filename: function (req, file, cb) {
        cb(null, "EVENTO-IMG-" + Date.now() + path.extname(file.originalname));
    }
});

const storageCursos = multer.diskStorage({
    //fazer uma pasta dedicada
    destination: "../frontend/public/uploads/curso",
    filename: function (req, file, cb) {
        cb(null, "CURSO-IMG-" + Date.now() + path.extname(file.originalname));
    }
});

const storageNoticias = multer.diskStorage({
    destination: "../frontend/public/uploads/noticia",
    filename: function (req, file, cb) {
        cb(null, "NOTICIA-IMG-" + Date.now() + path.extname(file.originalname));
    }
});

const uploadEventos = multer({
    storage: storageEventos,
}).single('eve_img');

const uploadCursos = multer({
    storage: storageCursos,
}).single('cur_img');

const uploadNoticias = multer({
    storage: storageNoticias,
}).single('not_img');

routes.post('/upload/eventos', function (req, res) {
    uploadEventos(req, res, function (err) {
        if (err) {
            console.log(JSON.stringify(err));
            res.status(400).send('upload da imagem falhou');
        } else
            res.send(res.req.file.filename);
    });
});

routes.post('/upload/cursos', function (req, res) {
    uploadCursos(req, res, function (err) {
        if (err) {
            console.log(JSON.stringify(err));
            res.status(400).send('upload da imagem falhou');
        } else
            res.send(res.req.file.filename);
    });
});
routes.post('/upload/noticias', function (req, res) {
    //console.log("Requisicao: " + req); //check
    uploadNoticias(req, res, function (err) {
        if (err) {
            console.log(JSON.stringify(err));
            res.status(400).send('upload da imagem falhou');
        }
        else
            res.send(res.req.file.filename);
    });
});

module.exports = routes;