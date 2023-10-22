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
const trofeuController=require('./controllers/trofeuController');
const autenticação=require('./middleware/login');

app.use(cors({
    origin: '*'
}));
//rotas usuarios
app.post('/usuarios/cadastro',usuarioController.cadastrarUsuario);
app.post('/usuarios/login',usuarioController.loginUsuario);

//rotas metas
app.get('/metas/usuarios', autenticação, metaController.getMetasUsuario);
app.get('/metas/:id',autenticação, metaController.getMetaId)
app.post('/metas', autenticação, metaController.addMetas);
app.put('/metas/:id', autenticação, metaController.putMetas);
app.delete('/metas/:id', autenticação, metaController.delMetas)

//rotas tarefas
app.get('/tarefas/metas/:id', autenticação,tarefaController.getTarefas);
app.post('/tarefas', autenticação, tarefaController.addTarefas);
app.put('/tarefas/:id', autenticação, tarefaController.putTarefas);
app.put('/tarefas/concluido/:id', autenticação, tarefaController.concluirTarefa);
app.delete('/tarefas/:id', autenticação, tarefaController.delTarefas);

//rotas gerarMeta
app.get('/gerarmeta/:id', autenticação, gptController.getMetas);


module.exports=app;