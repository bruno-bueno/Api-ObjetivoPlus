const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

// Rota para obter todas as tarefas
router.get('/tarefas', (req, res) => {
    connection.query('SELECT * FROM Tarefas', (err, results) => {
      if (err) {
        console.error('Erro ao obter as tarefas:', err);
        res.status(500).json({ error: 'Erro ao obter as tarefas' });
      } else {
        res.json(results);
      }
    });
  });
  
  // Rota para obter uma tarefa pelo ID
  router.get('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM Tarefas WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error('Erro ao obter a tarefa:', err);
        res.status(500).json({ error: 'Erro ao obter a tarefa' });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'Tarefa não encontrada' });
      } else {
        res.json(results[0]);
      }
    });
  });
  
  // Rota para criar uma nova tarefa
  router.post('/tarefas', (req, res) => {
    const { usuario_id, titulo, descricao, concluido } = req.body;
    connection.query('INSERT INTO Tarefas (usuario_id, titulo, descricao, concluido) VALUES (?, ?, ?, ?)', [usuario_id, titulo, descricao, concluido], (err, result) => {
      if (err) {
        console.error('Erro ao criar a tarefa:', err);
        res.status(500).json({ error: 'Erro ao criar a tarefa' });
      } else {
        res.status(201).json({ message: 'Tarefa criada com sucesso', id: result.insertId });
      }
    });
  });
  
  // Rota para atualizar uma tarefa pelo ID
  router.put('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const { usuario_id, titulo, descricao, concluido } = req.body;
    connection.query('UPDATE Tarefas SET usuario_id = ?, titulo = ?, descricao = ?, concluido = ? WHERE id = ?', [usuario_id, titulo, descricao, concluido, id], err => {
      if (err) {
        console.error('Erro ao atualizar a tarefa:', err);
        res.status(500).json({ error: 'Erro ao atualizar a tarefa' });
      } else {
        res.json({ message: 'Tarefa atualizada com sucesso' });
      }
    });
  });
  
  // Rota para deletar uma tarefa pelo ID
  router.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM Tarefas WHERE id = ?', [id], err => {
      if (err) {
        console.error('Erro ao deletar a tarefa:', err);
        res.status(500).json({ error: 'Erro ao deletar a tarefa' });
      } else {
        res.json({ message: 'Tarefa deletada com sucesso' });
      }
    });
  });
  

module.exports = router;