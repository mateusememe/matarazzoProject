const { Router } = require('express');
const routes = Router();

const UsuCtrl = require('./Controllers/UsuarioCtrl');

routes.post('/usuarios/cadastro', UsuCtrl.gravarUsuario);
routes.get('/usuarios', UsuCtrl.listarUsuarios);
routes.put('/usuarios', UsuCtrl.alterarUsuario);
routes.delete('/usuarios/:usu_id', UsuCtrl.excluirUsuario);
routes.post('/usuarios/login', UsuCtrl.login);

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


module.exports = routes;