const express = require('express');
var bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
const rotaUsuario=require('./router/usuario');
const rotaTarefa=require('./router/meta');
const rotaSubTarefa=require('./router/tarefa');

app.use('/usuarios',rotaUsuario);
app.use('/metas',rotaTarefa);
app.use('/tarefas',rotaSubTarefa);

module.exports= app;