const express = require('express');
const router = express.Router();

// Rota para obter todas as subtarefas de uma tarefa
router.get('/tarefas/:id/subtarefas', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM Subtarefas WHERE tarefa_id = ?', [id], (err, results) => {
      if (err) {
        console.error('Erro ao obter as subtarefas:', err);
        res.status(500).json({ error: 'Erro ao obter as subtarefas' });
      } else {
        res.json(results);
      }
    });
  });
  
  // Rota para obter uma subtarefa pelo ID
  router.get('/subtarefas/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM Subtarefas WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error('Erro ao obter a subtarefa:', err);
        res.status(500).json({ error: 'Erro ao obter a subtarefa' });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'Subtarefa não encontrada' });
      } else {
        res.json(results[0]);
      }
    });
  });
  
  // Rota para criar uma nova subtarefa
  router.post('/tarefas/:id/subtarefas', (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, concluido, ordem } = req.body;
    connection.query('INSERT INTO Subtarefas (tarefa_id, titulo, descricao, concluido, ordem) VALUES (?, ?, ?, ?, ?)', [id, titulo, descricao, concluido, ordem], (err, result) => {
      if (err) {
        console.error('Erro ao criar a subtarefa:', err);
        res.status(500).json({ error: 'Erro ao criar a subtarefa' });
      } else {
        res.status(201).json({ message: 'Subtarefa criada com sucesso', id: result.insertId });
      }
    });
  });
  
  // Rota para atualizar uma subtarefa pelo ID
  router.put('/subtarefas/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, concluido, ordem } = req.body;
    connection.query('UPDATE Subtarefas SET titulo = ?, descricao = ?, concluido = ?, ordem = ? WHERE id = ?', [titulo, descricao, concluido, ordem, id], err => {
      if (err) {
        console.error('Erro ao atualizar a subtarefa:', err);
        res.status(500).json({ error: 'Erro ao atualizar a subtarefa' });
      } else {
        res.json({ message: 'Subtarefa atualizada com sucesso' });
      }
    });
  });
  
  // Rota para deletar uma subtarefa pelo ID
  router.delete('/subtarefas/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM Subtarefas WHERE id = ?', [id], err => {
      if (err) {
        console.error('Erro ao deletar a subtarefa:', err);
        res.status(500).json({ error: 'Erro ao deletar a subtarefa' });
      } else {
        res.json({ message: 'Subtarefa deletada com sucesso' });
      }
    });
  });

module.exports = router;