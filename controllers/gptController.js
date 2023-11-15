const express = require('express');
const router = express.Router();
require('dotenv').config()
const { criaMetas, criaPerguntas } = require('./gptGenerateController');
const Tarefa = require('../models/tarefaModel');
const Meta = require('../models/metaModel');

async function getMetas(req,res){
  const { id } = req.params;
  const token=req.headers.authorization.split(' ')[1];
  const meta = await Meta.listarMetaPeloId(id,token);

  const dados=meta[0];
  const descricao = dados[0].descricao;
  const prazo = dados[0].Prazo;

  let tarefas = await criaMetas(descricao, prazo,res);
  try{
    tarefas = await JSON.parse(tarefas);
  }catch(error){
    tarefas = await criaMetas(descricao, prazo,res);
    tarefas = await JSON.parse(tarefas);
  }
  
  await salvarTarefas(id,tarefas.AtividadesMensais);
  return res.status(200).json(tarefas.AtividadesMensais);
}

async function verificaMeta(req, res){
  const { id } = req.params;
  const tarefa = await Tarefa.listarPeloId(id);
  let verf;
    try{
      verf = await criaPerguntas(tarefa[0][0].titulo, tarefa[0][0].descricao,res)
      verf = JSON.parse(verf);
    }catch(error){
      verf = await criaPerguntas(tarefa[0][0].titulo, tarefa[0][0].descricao,res)
      verf = JSON.parse(verf);
    }
    res.status(200).json(verf)
  
}

async function salvarTarefas(metaId,meta){
  for(let tarefa of meta){
    const titulo = tarefa.Titulo;
    const descricao = tarefa.Descricao;
    const ordem = tarefa.Ordem
    tarefa = new Tarefa(0, metaId, titulo, descricao, 0, ordem);
    await tarefa.salvar();
  }  
}  

module.exports = {getMetas, verificaMeta};