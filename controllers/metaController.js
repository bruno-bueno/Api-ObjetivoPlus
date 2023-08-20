const Meta = require('../models/metaModel');

async function getMetas(req,res){
    const { id } = req.params;
    const meta = await Meta.listarMetasDoUsuario(id);
    return res.status(200).send(meta[0]);
}

async function addMetas(req,res){
    const { usuario_id, titulo, descricao, prazo} = req.body;
    const meta = new Meta(0, usuario_id, titulo, descricao, 0, prazo);
    meta.salvar(res);
}

async function putMetas(req,res){
    const { id, usuario_id, titulo, descricao, concluido, prazo} = req.body;
    const meta = new Meta(id, usuario_id, titulo, descricao, concluido, prazo);
    meta.atualizar(res);
}

async function delMetas(req, res){
    const { id } = req.params;
    const meta = new Meta(id);
    meta.excluir(res);
}


module.exports = {getMetas, addMetas, putMetas, delMetas};