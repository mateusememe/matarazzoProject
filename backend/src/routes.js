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

const AssCtrl = require('./Controllers/AssentoCtrl');

routes.post('/assentos', AssCtrl.gravarAssento);
routes.get('/assentos', AssCtrl.listarAssentos);
routes.put('/assentos', AssCtrl.alterarAssento);
routes.delete('/assentos/:ass_id', AssCtrl.excluirAssento);

const CatCtrl = require('./Controllers/CategoriaCtrl');

routes.post('/categorias', CatCtrl.gravarCategoria);
routes.get('/categorias', CatCtrl.listarCategorias);
routes.put('/categorias', CatCtrl.alterarCategoria);
routes.delete('/categorias/:cat_id', CatCtrl.excluirCategoria);

const CurCtrl = require('./Controllers/CursoCtrl');

routes.get('/cursos',CurCtrl.listarCursos);
routes.post('/cursos',CurCtrl.gravarCurso);
routes.put('/cursos',CurCtrl.alterarCurso);
routes.delete('/cursos/:cur_id', CurCtrl.excluirCurso);

const EveCtrl = require('./Controllers/EventoCtrl');

routes.get('/eventos',EveCtrl.listarEvento);
routes.post('/eventos',EveCtrl.gravarEvento);
routes.put('/eventos',EveCtrl.alterarEvento);
routes.delete('/eventos/:eve_id', EveCtrl.excluirEvento);

const NotCtrl = require('./Controllers/NoticiaCtrl');

routes.get('/noticias',NotCtrl.listarNoticia);
routes.post('/noticias',NotCtrl.gravarNoticia);
routes.put('/noticias',NotCtrl.alterarNoticia);
routes.delete('/noticias/:not_id', NotCtrl.excluirNoticia);

//Controla upload
const storageEventos = multer.diskStorage({
    destination: "../frontend/public/uploads",
    filename: function (req, file, cb) {
        cb(null, "EVENTO-IMG-" + Date.now() + path.extname(file.originalname));
    }
});

const storageCursos = multer.diskStorage({
    destination: "../frontend/public/uploads",
    filename: function (req, file, cb) {
        cb(null, "CURSO-IMG-" + Date.now() + path.extname(file.originalname));
    }
});

const uploadEventos = multer({
    storage: storageEventos,
    limits: { fileSize: 900000 },
}).single('eve_img');

const uploadCursos = multer({
    storage: storageCursos,
    limits: { fileSize: 900000 },
}).single('cur_img');

routes.post('/upload/eventos', function (req, res) {
    uploadEventos(req, res, function (err) {
        if (err){
            console.log(JSON.stringify(err));
            res.status(400).send('upload da imagem falhou');
        } else 
            res.send(res.req.file.filename);
    });
});

routes.post('/upload/cursos', function (req, res) {
    uploadCursos(req, res, function (err) {
        if (err){
            console.log(JSON.stringify(err));
            res.status(400).send('upload da imagem falhou');
        } else 
            res.send(res.req.file.filename);
    });
});

module.exports = routes;