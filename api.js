const express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
const rotaUsuario=require('./router/usuario');
const rotaMeta=require('./router/meta');
const rotaTarefa=require('./router/tarefa');
const rotaGerarMeta=require('./controllers/gptController');

app.use(cors());
app.use('/usuarios',rotaUsuario);
app.use('/metas',rotaMeta);
app.use('/tarefas',rotaTarefa);
app.use('/gerarmeta', rotaGerarMeta);



module.exports=app;