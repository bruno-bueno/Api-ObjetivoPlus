const Usuario = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');

async function cadastrarUsuario(req,res){
    const { username, password, email} = req.body;
    const usuario = new Usuario(0, username, password, email);
    const resp= await usuario.cadastrar();
    console.log("resp")
    console.log(resp)
    if(!resp.errno){
        return res.status(200).send({mensagem:"Usuario Cadastrado"});
    }else{
        return res.status(500).send({mensagem:'erro ao cadastrar'});
    }
    
}
async function loginUsuario(req,res){
    const { username, password} = req.body;
    const resp = await Usuario.logar(username, password);
    if (resp.sucesso) {
        const token = jwt.sign({
            id: resp.dados.id,
            username: resp.dados.username
        },process.env.JWT_KEY,{
            expiresIn: "8h"
        });
        res.status(200).send({mensagem:'Login successful.', token: token, id: resp.dados.id});
    } else {
        res.status(401).send('Invalid credentials.');
    }
}

module.exports = {cadastrarUsuario, loginUsuario};