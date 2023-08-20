const Tarefa = require('../models/tarefaModel');

async function getTarefas(req,res){
    const id = req.params.id;
    return res.status(200).send(await Tarefa.listarTarefasPelaMeta(id));
}

async function addTarefas(req,res){
    const { meta_id, titulo, descricao, ordem} = req.body;
    const meta = new Tarefa(0, meta_id, titulo, descricao, 0, ordem);
    Tarefa.salvar();
}

async function putTarefas(req,res){
    const { id, meta_id, titulo, descricao, concluido, ordem} = req.body;
    const meta = new Tarefa(id, meta_id, titulo, descricao, concluido, ordem);
    Tarefa.atualizar();
}

async function delTarefas(req, res){
    const { id } = req.body;
    const meta = new Tarefa(id);
    Tarefa.excluir();
}


module.exports = {getTarefas, addTarefas, putTarefas, delTarefas};