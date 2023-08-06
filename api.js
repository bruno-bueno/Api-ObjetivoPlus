const express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
const rotaUsuario=require('./router/usuario');
const rotaTarefa=require('./router/meta');
const rotaSubTarefa=require('./router/tarefa');
const rotaGerarMeta=require('./router/gpt');

app.use(cors());
app.use('/usuarios',rotaUsuario);
app.use('/metas',rotaTarefa);
app.use('/tarefas',rotaSubTarefa);
app.use('/gerarmeta', rotaGerarMeta);



module.exports=app;