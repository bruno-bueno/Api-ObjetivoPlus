const Usuario = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');

async function cadastrarUsuario(req,res){
    const { username, password, email} = req.body;
    const usuario = new Usuario(0, username, password, email);
    usuario.cadastrar();
    return res.status(200).send("Usuario Cadastrado");
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
        res.status(200).send({mensagem:'Login successful.', token: token, });
    } else {
        res.status(401).send('Invalid credentials.');
    }
}

module.exports = {cadastrarUsuario, loginUsuario};