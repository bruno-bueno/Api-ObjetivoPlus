const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const mysql = require('../sql').pool;

// Rota para obter todas as tarefas
router.get('/usuarios/:id', (req, res) => {
  mysql.getConnection((error, conn) => {
    if(error){
        console.error('Erro ao obter as tarefas:', error);
        res.status(500).json({ error: error });
    }
    conn.query('SELECT * FROM Tarefas WHERE usuario_id = ?', [req.body.usuario_id], (error, resultado, fields) => {
    if(error){
        res.status(500).json({ error: error });
    }
    return res.status(200).send(resultado)
  })
  });
  });
  
  // Rota para obter uma tarefa pelo ID
  router.get('/:id', (req, res) => {
    mysql.getConnection((error, conn) => {
      if (error) {
          console.error('Erro ao obter a tarefa:', error);
          res.status(500).json({ error: 'Erro ao obter a tarefa' });
      }
      conn.query('SELECT * FROM Tarefas WHERE id = ?', [req.body.id], (error, resultado, fields) => {
        if(error){
          res.status(500).json({ error: error });
        }else if (resultado.length === 0) {
          res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        return res.status(200).send(resultado)
      })
    });

  });
  
  // Rota para criar uma nova tarefa
  router.post('/', (req, res) => {
    
    mysql.getConnection((error, conn) => {
      conn.query('INSERT INTO Tarefas (usuario_id, titulo, descricao, concluido, prazo) VALUES (?, ?, ?, ?, ?)', [req.body.usuario_id, req.body.titulo, req.body.descricao, req.body.concluido, req.body.prazo], (error, resultado, field) => {
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
  
  // Rota para atualizar uma tarefa pelo ID
  router.put('/:id', (req, res) => {

    mysql.getConnection((error, conn) => {
      conn.query('UPDATE Tarefas SET usuario_id = ?, titulo = ?, descricao = ?, concluido = ?, prazo =? WHERE id = ?', [req.body.usuario_id, req.body.titulo, req.body.descricao, req.body.concluido, req.body.prazo, req.body.id], (error, resultado, field) => {
          conn.release();
      if (error) {
          console.error('Erro ao atualizar a tarefa:', error);
          res.status(500).json({ error: 'Erro ao atualizar a tarefa' });
      } else {
          res.status(201).json({ message: 'Tarefa atualizada com sucesso', id: resultado.insertId });
      }
    });
    })
  });
  
  // Rota para deletar uma tarefa pelo ID
  router.delete('/:id', (req, res) => {

    mysql.getConnection((error, conn) => {
      conn.query('DELETE FROM Tarefas WHERE id = ?', [req.body.id], (error, resultado, field) => {
          conn.release();
      if (error) {
          console.error('Erro ao deletar a tarefa:', error);
          res.status(500).json({ error: 'Erro ao deletar a tarefa' });
      } else {
          res.status(201).json({ message: 'Tarefa deletada com sucesso', id: resultado.insertId });
      }
    });
    })

  });
  

module.exports = router;