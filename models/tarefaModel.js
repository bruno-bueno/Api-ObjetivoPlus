const sql = require('./sql');
const jwt=require('jsonwebtoken');

class Tarefa { 
    constructor(id, meta_id, titulo, descricao, concluido, ordem) { 
        this.id = id; 
        this.meta_id = meta_id; 
        this.titulo = titulo; 
        this.descricao = descricao; 
        this.concluido = concluido; 
        this.ordem = ordem; 
    }

    static async listarTarefasPelaMeta(metaId,token){
        const decode=jwt.verify(token,process.env.JWT_KEY);
        const idToken=decode.id;
        let tarefas = await sql.query(`SELECT * FROM metas JOIN tarefas ON tarefas.meta_id = metas.id WHERE metas.usuario_id = ${idToken} AND metas.id = ${metaId};`);
        return tarefas;
    }
    salvar(){
        let resp = sql.query(`INSERT INTO tarefas (meta_id, titulo, descricao, concluido, ordem) VALUES (${this.meta_id}, '${this.titulo}', '${this.descricao}', 0, '${this.ordem}')`);
        console.log(resp);
    }
    atualizar(){
        let resp = sql.query(`UPDATE tarefas SET titulo = '${this.titulo}', descricao = '${this.descricao}', concluido = '${this.concluido}', ordem = '${this.ordem}' WHERE id = '${this.id}'`);
        console.log(resp);
    }
    static async concluido(concluido, id){
        let tarefas = await sql.query(`UPDATE tarefas set concluido = ${concluido} WHERE id = ${id}`);
        return tarefas;
    }
    excluir(){
        let resp = sql.query(`DELETE FROM tarefas WHERE id = '${this.id}'`);
        console.log(resp);
    }
} 

module.exports = Tarefa;