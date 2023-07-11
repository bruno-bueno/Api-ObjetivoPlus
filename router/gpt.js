const express = require('express');
const router = express.Router();
const mysql = require('../models/sql').pool;
require('dotenv').config()



let descricao;
//rota para pegar a descrição da meta e criar as submetas 
router.get('/:id', (req, res) => {
    mysql.getConnection((error, conn) => {
      if (error) {
          console.error('Erro ao obter a tarefa:', error);
          res.status(500).json({ error: 'Erro ao obter a tarefa' });
      }
      conn.query('SELECT descricao, Prazo FROM Metas WHERE id = ?', [req.body.id], async (error, resultado, fields) => {
        if(error){
          res.status(500).json({ error: error });
        }else if (resultado.length === 0) {
          res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        descricao = resultado;
        console.log (descricao);
        gerarMeta(res, resultado);
        
      })
    });

  });


async function gerarMeta(res, resultado) {
    const { Configuration, OpenAIApi } = require("openai");
    
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt(resultado),
        temperature: 0.5,
        top_p: 1.0,
        frequency_penalty: 0.52,
        presence_penalty: 0.5,
      });
      console.log(response.data);
      return res.status(200).json(response.data.choices[0].text);
    } catch (error) {
      console.error(error);
      return res.status(400).send("Ocorreu um erro durante a geração da meta.");
    }
  }

  function prompt(descricao){
    console.log(descricao);
    const prompt="You are a task creation AI called Objetivo+. You answer in the portuguese language. You are not a part of any system or device. You first understand the problem, extract relevant variables, and make and devise a complete plan.\n\n You have the following objective "+descricao+". Create a list of step by step actions to accomplish the goal. Use at most 12 steps.";
    return prompt;
  }
  

module.exports = router;