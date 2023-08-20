const express = require('express');
const router = express.Router();
require('dotenv').config()
const { gerarMeta } = require('./gptGenerateController');
const Tarefa = require('../models/tarefaModel');
const Meta = require('../models/metaModel');

async function getMetas(req,res){
  const { id } = req.params;
  const meta = new Meta(id);
  meta.listarMetaPeloId(res);
  //const descricao = meta[0].descricao;
  //const prazo = meta[0].Prazo;
  //console.log(descricao); 
  //console.log(prazo); 
  
  // const metas = await gerarMeta(res, descricao, prazo);
  // const metaId=req.params.id;
  // salvarTarefas(metaId,metas,res);
  console.log("chegou"+meta);
  return res.status(200).send(meta);
}

async function salvarTarefas(metaId,metas,res){
  const connection = await mysql.promise();

  try {
    for (const meta of metas) {
      const partes = meta.split('|');
      let titulo = partes[0];
      let descricao = partes[1];
      let ordem = parseInt(partes[2]);

      await connection.execute('INSERT INTO Tarefas (meta_id, titulo, descricao, concluido, ordem) VALUES (?, ?, ?, ?, ?)', [metaId, titulo, descricao, 0, ordem]);
    }

    connection.end();
    //res.status(201).json({ message: 'Tarefas criadas com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar as tarefas' });
  }
}  

module.exports = {getMetas};