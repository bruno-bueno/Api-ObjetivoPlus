const TrofeuMetas = require("../models/trofeuMetasModel");
const TipoTrofeu = require("../models/tipoTrodeuModel");

async function desbloquearTrofeuMeta(res, quantidade, id){
    let medalha;
    if(quantidade >= 25 && quantidade < 50){
        medalha=1;
    }else if(quantidade>=50 && quantidade < 75){
        medalha=2;
    }else if(quantidade>=75  && quantidade < 100){
        medalha=3;
    }else if(quantidade == 100){
        medalha=4;
    }
    const trofeu = new TrofeuMetas(0, id, medalha);
    let verf = await trofeu.verificaTrofeu();
    console.log("verf");
    console.log(verf);
    if(verf[0].length == 0){
        trofeu.salvarTrofeu();
        const tipoTrofeu = await TipoTrofeu.listarTrofeuMetaPeloId(id);
        return res.status(200).send({resultado: tipoTrofeu[0]});
    }else{
        return res.status(200).send({mensagem:"Tarefa Concluida"});
    }
    
}

module.exports = { desbloquearTrofeuMeta }