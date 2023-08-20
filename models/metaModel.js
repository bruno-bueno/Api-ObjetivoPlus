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

    static async listarMetasDoUsuario(usuarioId){
        let meta = await sql.query(`SELECT * FROM Metas WHERE usuario_id = '${usuarioId}'`);
        return meta;
    }
    async listarMetaPeloId(res){
        let resp = sql.query(`SELECT * FROM Metas WHERE id = ${this.id}`);
        console.log(resp);
  
    }
    salvar(res){
        let resp = sql.query(`INSERT INTO Metas (usuario_id, titulo, descricao, concluido, prazo) VALUES ('${this.usuario_id}', '${this.titulo}', '${this.descricao}', 0, '${this.prazo}')`);
        console.log(resp);
        res.status(201).json({ message: 'tarefa criada com sucesso'})
    }
    atualizar(res){
        let resp = sql.query(`UPDATE Metas SET usuario_id = '${this.usuario_id}', titulo = '${this.titulo}', descricao = '${this.descricao}', concluido = '${this.concluido}', prazo ='${this.prazo}' WHERE id = '${this.id}'`);
        console.log(resp);
        res.status(201).json({ message: 'tarefa atualizada com sucesso'})
    }
    excluir(res){
        let resp = sql.query(`DELETE FROM Metas WHERE id = ${this.id}`);
        console.log(resp);
        res.status(201).json({ message: 'tarefa deletada com sucesso'})
    }
} 
 
module.exports = Meta;