const sql = require('./sql');
const bcrypt = require('bcrypt');

class Usuario{
    constructor(id, username, password, email){
        this.id=id;
        this.username=username;
        this.password=password;
        this.email=email;
    }
    
    cadastrar(){
        const hash = bcrypt.hashSync(this.password, 10);
        let resp = sql.query(`INSERT INTO Usuarios (username, password, email) VALUES ('${this.username}', '${hash}', '${this.email}')`);
        console.log(resp);
    }
    static async logar(username, senha){
        try{
            let resp=await sql.query(`SELECT * FROM usuarios WHERE username='${username}'`);
            
            if (resp.length === 0) {
                return { sucesso: false, dados: null };
            }
            let verf = await bcrypt.compareSync(senha, resp[0][0].password);
            console.log(verf);
            if (verf) {
                return { sucesso: true, dados: resp[0][0] }; 
            } else {
                return { sucesso: false, dados: null };
            }    
        }catch(error){
            console.error(error);
            return { sucesso: false, dados: null };
        }
        
    }
}

module.exports = Usuario;