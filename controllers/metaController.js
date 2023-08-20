const Meta = require('../models/metaModel');

async function getMetas(req,res){
    const id = req.params.id;
    return res.status(200).send(await Meta.listarMetasDoUsuario(id));
}

async function addMetas(req,res){
    const { usuario_id, titulo, descricao, prazo} = req.body;
    const meta = new Meta(0, usuario_id, titulo, descricao, 0, prazo);
    meta.salvar();
}

async function putMetas(req,res){
    const { id, usuario_id, titulo, descricao, concluido, prazo} = req.body;
    const meta = new Meta(id, usuario_id, titulo, descricao, concluido, prazo);
    meta.atualizar();
}

async function delMetas(req, res){
    const { id} = req.body;
    const meta = new Meta(id);
    meta.excluir();
}


module.exports = {getMetas, addMetas, putMetas, delMetas};