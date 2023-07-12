const express = require('express');
const router = express.Router();
const mysql = require('../models/sql').pool;
require('dotenv').config()
const { gerarMeta } = require('../controllers/gptController');

//rota para pegar a descrição da meta e criar as submetas 
router.get('/:id', async (req, res) => {
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
        let json=resultado[0]
        const descricao = json.descricao;
        const prazo = json.Prazo;
        console.log(descricao); // "quero me tornar programador"
        console.log(prazo); // "1 ano"
        
        const metaId=req.body.id;
        salvarTarefas(metaId,descricao,prazo,res);
      })
    });

  });

  async function salvarTarefas( metaId,descricao,prazo,res){
    try {
      const metas = await gerarMeta(res, descricao, prazo);
      metas.forEach((meta) => {
        const partes = meta.split(' | ');
        const titulo = partes[0];
        const descricao = partes[1];
        const ordem = parseInt(partes[2]);

        mysql.getConnection((error, conn) => {
          conn.query('INSERT INTO Tarefas (meta_id, titulo, descricao, concluido, ordem) VALUES (?, ?, ?, ?, ?)', [metaId, titulo, descricao, 0,ordem], (error, resultado, field) => {
            conn.release();
            if (error) {
              console.error('Erro ao criar a tarefa:', error);
              res.status(500).json({ error: 'Erro ao criar a tarefa' });
            } else {
              res.status(201).json({ message: 'tarefa criada com sucesso', id: resultado.insertId });
            }
          });
        })
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar a tarefa' });
    }

      

  }
  

module.exports = router;