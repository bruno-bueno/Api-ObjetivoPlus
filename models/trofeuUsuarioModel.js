const sql = require('./sql');

class TrofeuUsuario {
    constructor(id, id_usuario, id_trofeu) { 
        this.id = id; 
        this.id_usuario = id_usuario; 
        this.id_trofeu = id_trofeu; 
    }

} 

module.exports = TrofeuUsuario;