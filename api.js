const express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
const usuarioController=require('./controllers/usuarioController');
const tarefaController=require('./controllers/tarefaController');
const gptController=require('./controllers/gptController');
const metaController=require('./controllers/metaController');

app.use(cors());

//rotas usuarios
app.post('/usuarios/cadastro',usuarioController.cadastrarUsuario);
app.post('/usuarios/login',usuarioController.loginUsuario);

//rotas metas
app.get('/metas/usuarios/:id',metaController.getMetas);
app.post('/metas',metaController.addMetas);
app.put('/metas/:id',metaController.putMetas);
app.delete('/metas/:id',metaController.delMetas)

//rotas tarefas
app.get('/tarefas/metas/:id',tarefaController.getTarefas);
app.post('/tarefas',tarefaController.addTarefas);
app.put('/tarefas/:id',tarefaController.putTarefas);
app.delete('/tarefas/:id',tarefaController.delTarefas);

//rotas gerarMeta
app.get('/gerarmeta/:id', gptController.getMetas);



module.exports=app;