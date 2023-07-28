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
        
        const metas = await gerarMeta(res, descricao, prazo);
        const metaId=req.body.id;
        salvarTarefas(metaId,metas,res);
      })
    });

  });

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

module.exports = router;