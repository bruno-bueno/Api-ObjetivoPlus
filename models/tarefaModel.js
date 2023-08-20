const sql = require('./sql');

class Tarefa { 
    constructor(id, meta_id, titulo, descricao, concluido, ordem) { 
        this.id = id; 
        this.meta_id = meta_id; 
        this.titulo = titulo; 
        this.descricao = descricao; 
        this.concluido = concluido; 
        this.ordem = ordem; 
    }

    static listarTarefasPelaMeta(metaId){
        let tarefas = sql.query("SELECT * FROM Tarefas WHERE meta_id = ?" [metaId]);
        return tarefas;
    }
    salvar(){
        let resp = sql.query(`INSERT INTO Tarefas (meta_id, titulo, descricao, concluido, ordem) VALUES ('${this.meta_id}', '${this.titulo}', '${this.descricao}', 0, '${this.ordem}')`);
        console.log(resp);
    }
    atualizar(){
        let resp = sql.query(`UPDATE Tarefas SET titulo = '${this.titulo}', descricao = '${this.descricao}', concluido = '${this.concluido}', ordem = '${this.ordem}' WHERE id = '${this.id}'`);
        console.log(resp);
    }
    excluir(){
        let resp = sql.query(`DELETE FROM Tarefas WHERE id = '${this.id}'`);
        console.log(resp);
    }
} 
 
module.exports = Tarefa;