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
const autenticacao=require('./middleware/login');

app.use(cors({
    origin: '*'
}));
//rotas usuarios
app.post('/usuarios/cadastro',usuarioController.cadastrarUsuario);
app.post('/usuarios/login',usuarioController.loginUsuario);

//rotas metas
app.get('/metas/usuarios', autenticacao, metaController.getMetasUsuario);
app.get('/metas/usuarios/concluido', autenticacao, metaController.getMetasUsuarioConcluida);
app.get('/metas/:id',autenticacao, metaController.getMetaId)
app.post('/metas', autenticacao, metaController.addMetas);
app.put('/metas/concluir/:id', autenticacao, metaController.concluirMetas);
app.delete('/metas/:id', autenticacao, metaController.delMetas)

//rotas tarefas
app.get('/tarefas/metas/:id', autenticacao,tarefaController.getTarefas);
app.post('/tarefas', autenticacao, tarefaController.addTarefas);
app.put('/tarefas/:id', autenticacao, tarefaController.putTarefas);
app.put('/tarefas/concluido/:id', autenticacao, tarefaController.concluirTarefa);
app.get('/tarefas/verifica/:id', autenticacao, gptController.verificaMeta)

//rotas gerarMeta
app.get('/gerarmeta/:id', autenticacao, gptController.getMetas);

//rotas trofeus
app.get('/trofeusmetas/:id', autenticacao, trofeuController.listarTrofeusDaMeta);

module.exports=app;