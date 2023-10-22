const sql = require('./sql');

class TrofeuMetas {
    constructor(id, id_meta, id_trofeu) { 
        this.id = id; 
        this.id_meta = id_meta; 
        this.id_trofeu = id_trofeu; 
    }
    
    async verificaTrofeu(){
        let resp = await sql.query(`SELECT * FROM trofeus_metas WHERE id_meta = ${this.id_meta} AND id_trofeu = ${this.id_trofeu}`);
        return resp;
    }
    async salvarTrofeu(){
        console.log("id")
        console.log(this.id_meta)
        console.log("trofeu")
        console.log(this.id_trofeu)
        await sql.query(`INSERT INTO trofeus_metas (id_meta, id_trofeu) VALUES (${this.id_meta}, ${this.id_trofeu})`);
    }
} 

module.exports = TrofeuMetas;