const express = require('express');
var bodyParser = require('body-parser')

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
const rotaUsuario =require('./router/usuario');
const rotaTarefa =require('./router/tarefa');
const rotaSubTarefa =require('./router/subtarefa');

app.use('/usuarios',rotaUsuario);
app.use('/tarefas',rotaTarefa);
app.use('/subtarefas',rotaSubTarefa);

module.exports= app;