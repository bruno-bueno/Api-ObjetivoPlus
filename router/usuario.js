const express = require('express');
const router = express.Router();
const mysql = require('../models/sql').pool;

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
  router.get('/:id', (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            console.error('Erro ao obter o usuário:', error);
            res.status(500).json({ error: 'Erro ao obter o usuário' });
        }
    conn.query('SELECT * FROM Usuarios WHERE id = ?', [req.body.id], (error, resultado, fields) => {
        if(error){
            res.status(500).json({ error: error });
        }else if (resultado.length === 0) {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    return res.status(200).send(resultado)
    })
  });
  });
  
  // Rota para criar um novo usuário
  router.post('/', (req, res) => {
   //const { username, password } = req.body;


    mysql.getConnection((error, conn) => {
        conn.query('INSERT INTO Usuarios (username, password) VALUES (?, ?)', [req.body.username, req.body.password], (error, resultado, field) => {
            conn.release();
        if (error) {
            console.error('Erro ao criar o usuário:', error);
            res.status(500).json({ error: 'Erro ao criar o usuário' });
        } else {
            res.status(201).json({ message: 'Usuário criado com sucesso', id: resultado.insertId });
        }
    });
    })
  });

    

  
  // Rota para atualizar um usuário pelo ID
  router.put('/:id', (req, res) => {
    //const { id } = req.params;
    
    mysql.getConnection((error, conn) => {
      conn.query('UPDATE Usuarios SET username = ?, password = ? WHERE id = ?', [req.body.username, req.body.password,req.body.id], (error, resultado, field) => {
          conn.release();
      if (error) {
          console.error('Erro ao atualizar o usuário:', error);
          res.status(500).json({ error: 'Erro ao atualizar o usuário' });
      } else {
          res.status(201).json({ message: 'Usuário atualizado com sucesso', id: resultado.insertId });
      }
    });
    })
    
  });
  
  // Rota para deletar um usuário pelo ID
  router.delete('/:id', (req, res) => {
    //const { id } = req.params;

    mysql.getConnection((error, conn) => {
      conn.query('DELETE FROM Usuarios WHERE id = ?', [req.body.id], (error, resultado, field) => {
          conn.release();
      if (error) {
          console.error('Erro ao deletar o usuário:', error);
          res.status(500).json({ error: 'Erro ao deletar o usuário' });
      } else {
          res.status(201).json({ message: 'Usuário deletado com sucesso', id: resultado.insertId });
      }
    });
    })

  });

  module.exports = router;