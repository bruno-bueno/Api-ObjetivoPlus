const sql = require('./sql');
const jwt=require('jsonwebtoken');
class Meta { 
    constructor(id, usuario_id, titulo, descricao, concluido, prazo) { 
        this.id = id; 
        this.usuario_id = usuario_id; 
        this.titulo = titulo; 
        this.descricao = descricao; 
        this.concluido = concluido; 
        this.prazo = prazo; 
    }

    static async listarMetasDoUsuario(token){
        const decode=jwt.verify(token,process.env.JWT_KEY);
        const idToken=decode.id;
        let meta = await sql.query(`SELECT * FROM metas WHERE usuario_id = '${idToken}'`);
        return meta;
    }
    static async listarMetaPeloId(id,token) {
        const decode=jwt.verify(token,process.env.JWT_KEY);
        const idToken=decode.id;
        let meta = await sql.query(`SELECT * FROM metas WHERE id = '${id}' AND usuario_id = '${idToken}'`);
        return meta;
    }
    async salvar(res){
        let resp = await sql.query(`INSERT INTO metas (usuario_id, titulo, descricao, concluido, prazo) VALUES ('${this.usuario_id}', '${this.titulo}', '${this.descricao}', 0, '${this.prazo}')`);
        console.log(resp[0].insertId);
        res.status(201).json({ message: 'meta criada com sucesso', id: resp[0].insertId})
    }
    atualizar(res){
        let resp = sql.query(`UPDATE metas SET usuario_id = '${this.usuario_id}', titulo = '${this.titulo}', descricao = '${this.descricao}', concluido = '${this.concluido}', prazo ='${this.prazo}' WHERE id = '${this.id}'`);
        console.log(resp);
        res.status(201).json({ message: 'meta atualizada com sucesso'})
    }
    excluir(res){
        let resp = sql.query(`DELETE FROM metas WHERE id = ${this.id}`);
        console.log(resp);
        res.status(201).json({ message: 'meta deletada com sucesso'})
    }
} 
 
module.exports = Meta;