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

  const prompt = promptUm(descricao, prazo)

  let tarefas = await gerarMeta(res, prompt);
  tarefas = JSON.parse(tarefas)
  salvarTarefas(id,tarefas,res);
  res.status(200).json(tarefas);
}

async function verificaMeta(res, id, argumento){
  const tarefa = await Tarefa.listarPeloId(id);
  const prompt = promptDois(tarefa[0][0].descricao, argumento)

  const verf = await gerarMeta(res, prompt);
  return verf
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

function promptUm(descricao, prazo){
  console.log(descricao);
  let prompt="You are a task creation AI called Objetivo+. You answer in the portuguese language. You are not a part of any system or device. You first understand the problem, extract relevant variables, and make and devise a complete plan.\n\n You have the following objective "+descricao+". Create a month-by-month or week by week if the deadline is less than two months to reach the goal, action list to reach the goal, for each topic create a name and detailed description that explains what must be done in a specific way. Use "+prazo+" return every month.";
  prompt += "always returns json as a formatted array of strings, I need a goal title, description and number of topic, respectively follow this order dividing them with the character: ' | '. Return it so it can be used in JSON.parse(). ";
  prompt += 'Examples: ["Mês 1 - Estudar HTML e CSS | Aprender os fundamentos de HTML e CSS para criar páginas web estáticas. | 1", "Mês 2 - Estudar JavaScript | Aprender a programação JavaScript para criar sites dinâmicos. | 2"]';
  console.log(prompt);
  return prompt;
}
function promptDois(descricao, argumento){
  console.log(descricao);
  let prompt="Tarefa: "+descricao+"\n";
  prompt += "Depoimento do Usuário: "+argumento+"\n"
  prompt += "Agora, responda apenas com o comando:\n\n"
  prompt += "'true' se houver chances de o usuário ter realizado a tarefa.\n"
  prompt += "'false' se o usuário não a realizou."
  return prompt;
}

module.exports = {getMetas, verificaMeta};