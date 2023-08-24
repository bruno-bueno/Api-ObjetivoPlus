const Usuario = require('../models/usuarioModel');

async function cadastrarUsuario(req,res){
    const { username, password, email} = req.body;
    const usuario = new Usuario(0, username, password, email);
    usuario.cadastrar();
    return res.status(200).send("Usuario Cadastrado");
}
async function loginUsuario(req,res){
    const { username, password} = req.body;
    const resp = await Usuario.logar(username, password);
    if (resp) {
        res.status(200).send('Login successful.');
    } else {
        res.status(401).send('Invalid credentials.');
    }
}

module.exports = {cadastrarUsuario, loginUsuario};