const express = require('express');
const router = express.Router();
const mysql = require('../sql').pool;

// Rota para obter todos os usuários
router.get('/', (req, res) => {
    mysql.getConnection((error, conn) => {
        if(error){
            console.error('Erro ao obter os usuários:', error);
            res.status(500).json({ error: error });
    }
    conn.query('SELECT * FROM Usuarios;', (error, resultado, fields) => {
        if(error){
            res.status(500).json({ error: error });
    }
    return res.status(200).send(resultado)
    })
  });
});
  // Rota para obter um usuário pelo ID
  router.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM Usuarios WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error('Erro ao obter o usuário:', err);
        res.status(500).json({ error: 'Erro ao obter o usuário' });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'Usuário não encontrado' });
      } else {
        res.json(results[0]);
      }
    });
  });
  
  // Rota para criar um novo usuário
  router.post('/usuarios', (req, res) => {
    const { username, password } = req.body;
    connection.query('INSERT INTO Usuarios (username, password) VALUES (?, ?)', [username, password], (err, result) => {
      if (err) {
        console.error('Erro ao criar o usuário:', err);
        res.status(500).json({ error: 'Erro ao criar o usuário' });
      } else {
        res.status(201).json({ message: 'Usuário criado com sucesso', id: result.insertId });
      }
    });
  });
  
  // Rota para atualizar um usuário pelo ID
  router.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    connection.query('UPDATE Usuarios SET username = ?, password = ? WHERE id = ?', [username, password, id], err => {
      if (err) {
        console.error('Erro ao atualizar o usuário:', err);
        res.status(500).json({ error: 'Erro ao atualizar o usuário' });
      } else {
        res.json({ message: 'Usuário atualizado com sucesso' });
      }
    });
  });
  
  // Rota para deletar um usuário pelo ID
  router.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM Usuarios WHERE id = ?', [id], err => {
      if (err) {
        console.error('Erro ao deletar o usuário:', err);
        res.status(500).json({ error: 'Erro ao deletar o usuário' });
      } else {
        res.json({ message: 'Usuário deletado com sucesso' });
      }
    });
  });

  module.exports = router;