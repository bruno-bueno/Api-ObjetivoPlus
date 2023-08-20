const express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
const rotaUsuario=require('./router/usuario');
const rotaTarefa=require('./router/tarefa');

const gptController=require('./controllers/gptController');
const metaController=require('./controllers/metaController');

app.use(cors());

//rotas usuarios
app.use('/usuarios',rotaUsuario);

//rotas metas
app.get('/metas/usuarios/:id',metaController.getMetas);
app.post('/metas',metaController.addMetas);
app.put('/metas/:id',metaController.putMetas);
app.delete('/metas/:id',metaController.delMetas)

//rotas tarefas
app.use('/tarefas',rotaTarefa);

//rotas gerarMeta
app.use('/gerarmeta/:id', gptController.getMetas);



module.exports=app;