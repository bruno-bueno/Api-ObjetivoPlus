const Tarefa = require('../models/tarefaModel');

async function getTarefas(req,res){
    const { id } = req.params;
    const token=req.headers.authorization.split(' ')[1];
    const tarefa = await Tarefa.listarTarefasPelaMeta(id,token);
    return res.status(200).send(tarefa[0]);
}

async function addTarefas(req,res){
    const { meta_id, titulo, descricao, ordem} = req.body;
    const tarefa = new Tarefa(0, meta_id, titulo, descricao, 0, ordem);
    tarefa.salvar();
}

async function putTarefas(req,res){
    const { id, meta_id, titulo, descricao, concluido, ordem} = req.body;
    const tarefa = new Tarefa(id, meta_id, titulo, descricao, concluido, ordem);
    tarefa.atualizar();
}

async function delTarefas(req, res){
    const { id } = req.body;
    const tarefa = new Tarefa(id);
    tarefa.excluir();
}


module.exports = {getTarefas, addTarefas, putTarefas, delTarefas};