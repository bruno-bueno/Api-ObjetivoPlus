const Meta = require('../models/metaModel');

async function getMetasUsuario(req,res){
    const token=req.headers.authorization.split(' ')[1];
    const meta = await Meta.listarMetasDoUsuario(token);
    return res.status(200).send(meta[0]);
}
async function getMetaId(req,res){
    const { id } = req.params;
    const token=req.headers.authorization.split(' ')[1];
    const meta = await Meta.listarMetaPeloId(id, token);
    return res.status(200).send(meta[0]);
}

async function addMetas(req,res){
    const { usuario_id, titulo, descricao, prazo} = req.body;
    let meta = new Meta(0, usuario_id, titulo, descricao, 0, prazo);
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


module.exports = {getMetasUsuario, getMetaId, addMetas, putMetas, delMetas};