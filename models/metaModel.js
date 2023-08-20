const sql = require('./sql');
class Meta { 
    constructor(id, usuario_id, titulo, descricao, concluido, prazo) { 
        this.id = id; 
        this.usuario_id = usuario_id; 
        this.titulo = titulo; 
        this.descricao = descricao; 
        this.concluido = concluido; 
        this.prazo = prazo; 
    }

    static listarMetasDoUsuario(usuarioId){
        let meta = sql.query(`SELECT * FROM Metas WHERE usuario_id = '${usuarioId}'`);
        return meta;
    }
    salvar(){
        let resp = sql.query(`INSERT INTO Metas (usuario_id, titulo, descricao, concluido, prazo) VALUES ('${this.usuario_id}', '${this.titulo}', '${this.descricao}', 0, '${this.prazo}')`);
        console.log(resp);
    }
    atualizar(){
        let resp = sql.query(`UPDATE Metas SET usuario_id = '${this.usuario_id}', titulo = '${this.titulo}', descricao = '${this.descricao}', concluido = '${this.concluido}', prazo ='${this.prazo}' WHERE id = '${this.id}'`);
        console.log(resp);
    }
    excluir(){
        let resp = sql.query(`DELETE FROM Metas WHERE id = '${this.id}'`);
        console.log(resp);
    }
} 
 
module.exports = Meta;