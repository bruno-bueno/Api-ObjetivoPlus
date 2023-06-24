const express = require('express');
const app = express();

const rotaUsuario =require('./router/usuario');
const rotaTarefa =require('./router/tarefa');
const rotaSubTarefa =require('./router/tarefa');

app.use('/usuarios',rotaUsuario);
app.use('/tarefas',rotaTarefa);
app.use('/subtarefas',rotaSubTarefa);

module.exports= app;