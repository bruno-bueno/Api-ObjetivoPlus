const sql = require('./sql');

class TipoTrofeu {
    constructor(id, nome, requisitos, tipo) { 
        this.id = id; 
        this.nome = nome; 
        this.requisitos = requisitos; 
        this.tipo = tipo; 
    }
    
    static async listarTrofeuMetaPeloId(idMeta){
        let resp = await sql.query(`SELECT tipos_trofeus.*
        FROM tipos_trofeus
        INNER JOIN trofeus_metas ON tipos_trofeus.id = trofeus_metas.id_trofeu
        WHERE trofeus_metas.id_meta = ${idMeta} ORDER BY tipos_trofeus.id DESC LIMIT 1;`);
        return resp;
    }

    static async listarTrofeusMetaId(idMeta){
        let resp = await sql.query(`SELECT tipos_trofeus.*
        FROM tipos_trofeus
        INNER JOIN trofeus_metas ON tipos_trofeus.id = trofeus_metas.id_trofeu
        WHERE trofeus_metas.id_meta = ${idMeta};`);
        return resp;
    }

} 

module.exports = TipoTrofeu;