const express = require('express');
const router = express.Router();
require('dotenv').config()
const { gerarMeta } = require('./gptGenerateController');
const Tarefa = require('../models/tarefaModel');
const Meta = require('../models/metaModel');

async function getMetas(req,res){
  const { id } = req.params;
  const token=req.headers.authorization.split(' ')[1];
  const meta = await Meta.listarMetaPeloId(id,token);

  const dados=meta[0];
  const descricao = dados[0].descricao;
  const prazo = dados[0].Prazo;

  console.log("dados");
  console.log(dados);

  const tarefas = await gerarMeta(res, descricao, prazo);
  salvarTarefas(id,tarefas,res);
}

async function salvarTarefas(metaId,metas,res){
  try {
    for (const meta of metas) {
      const partes = meta.split('|');
      let titulo = partes[0];
      let descricao = partes[1];
      let ordem = parseInt(partes[2]);
      
      const tarefa = new Tarefa(0, metaId, titulo, descricao, 0, ordem);
      await tarefa.salvar();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar as tarefas' });
  }
}  

module.exports = {getMetas};