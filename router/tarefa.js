const express = require('express');
const router = express.Router();
const mysql = require('../models/sql').pool;

// Rota para obter todas as subtarefas de uma tarefa
router.get('/metas/:id', (req, res) => {

  mysql.getConnection((error, conn) => {
    if(error){
        console.error('Erro ao obter as tarefas:', error);
        res.status(500).json({ error: error });
    }
    conn.query('SELECT * FROM Tarefas WHERE meta_id = ?', [req.params.id], (error, resultado, fields) => {
    if(error){
        res.status(500).json({ error: error });
    }
    return res.status(200).send(resultado)
  })
  });
});
  
  // Rota para obter uma subtarefa pelo ID
  router.get('/:id', (req, res) => {
    mysql.getConnection((error, conn) => {
      if (error) {
          console.error('Erro ao obter a subtarefa:', error);
          res.status(500).json({ error: 'Erro ao obter a subtarefa' });
      }
      conn.query('SELECT * FROM Tarefas WHERE id = ?', [req.params.id], (error, resultado, fields) => {
        if(error){
          res.status(500).json({ error: error });
        }else if (resultado.length === 0) {
          res.status(404).json({ error: 'Subtarefa não encontrada' });
        }
        return res.status(200).send(resultado)
      })
    });
  });
  
  // Rota para criar uma nova subtarefa
  router.post('/', (req, res) => {

    mysql.getConnection((error, conn) => {
      conn.query('INSERT INTO Tarefas (meta_id, titulo, descricao, concluido, ordem) VALUES (?, ?, ?, ?, ?)', [req.body.meta_id, req.body.titulo, req.body.descricao, req.body.concluido,req.body.ordem], (error, resultado, field) => {
        conn.release();
        if (error) {
          console.error('Erro ao criar a subtarefa:', error);
          res.status(500).json({ error: 'Erro ao criar a subtarefa' });
        } else {
          res.status(201).json({ message: 'subtarefa criada com sucesso', id: resultado.insertId });
        }
      });
    })
  });
  
  // Rota para atualizar uma subtarefa pelo ID
  router.put('/:id', (req, res) => {

    mysql.getConnection((error, conn) => {
      conn.query('UPDATE Tarefas SET titulo = ?, descricao = ?, concluido = ?, ordem = ? WHERE id = ?', [ req.body.titulo, req.body.descricao, req.body.concluido,req.body.ordem,req.body.id], (error, resultado, field) => {
          conn.release();
      if (error) {
          console.error('Erro ao atualizar a subtarefa:', error);
          res.status(500).json({ error: 'Erro ao atualizar a subtarefa' });
      } else {
          res.status(201).json({ message: 'Subtarefa atualizada com sucesso', id: resultado.insertId });
      }
    });
    })

  });
  
  // Rota para deletar uma subtarefa pelo ID
  router.delete('/:id', (req, res) => {

    mysql.getConnection((error, conn) => {
      conn.query('DELETE FROM Tarefas WHERE id = ?', [req.body.id], (error, resultado, field) => {
        conn.release();
        if (error) {
          console.error('Erro ao deletar a subtarefa:', error);
          res.status(500).json({ error: 'Erro ao deletar a subtarefa' });
        } else {
          res.status(201).json({ message: 'Subtarefa deletada com sucesso', id: resultado.insertId });
        }
      });
    });
  });

module.exports = router;