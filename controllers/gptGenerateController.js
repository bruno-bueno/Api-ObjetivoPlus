const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

  async function criaMetas(descricao, tempo,res){
    try{
     const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "Gerar um plano de atividades mensais para atingir um objetivo específico em um determinado período de tempo. Por favor, forneça o objetivo que deseja alcançar e o tempo desejado em meses em um array de Strings JSON.\nExemplo:\n{\"Objetivo\": \"Virar Programador em 6 meses\",\n\"AtividadesMensais\": [\n{\n\"Ordem\": 1,\n\"Titulo\": \"Mês 1 - Escolha de linguagem de programação\",\n\"Descricao\": \"Pesquisa sobre diferentes linguagens de programação e escolha da linguagem principal (ex: Python, JavaScript, Java)\"\n},\n{\n\"Ordem\": 2,\n\"Titulo\": \"Mês 2 - Fundamentos de Programação\",\n\"Descricao\": \"Estudo dos fundamentos básicos de programação, como variáveis, tipos de dados, operadores e estruturas de controle (if, else, loops). Prática em pequenos projetos para aplicar os conceitos aprendidos.\"\n},\n{\n\"Ordem\": 3,\n\"Titulo\": \"Mês 3 - Estruturas de Dados e Algoritmos\",\n\"Descricao\": \"Aprofundamento no entendimento de estruturas de dados com foco em listas, pilhas, filas e árvores. Estudo de algoritmos básicos, como busca e ordenação. Implementação prática dessas estruturas e algoritmos em projetos simples.\"\n},\n{\n\"Ordem\": 4,\n\"Titulo\": \"Mês 4 - Desenvolvimento Web (Frontend)\",\n\"Descricao\": \"Introdução ao desenvolvimento web com foco no frontend. Aprender HTML, CSS e JavaScript. Construção de páginas web simples e interativas. Exploração de frameworks populares, como React ou Vue.js.\"\n},\n{\n\"Ordem\": 5,\n\"Titulo\": \"Mês 5 - Desenvolvimento Web (Backend)\",\n\"Descricao\": \"Exploração do desenvolvimento web no lado do servidor. Aprender um framework backend, como Flask (Python), Express (JavaScript) ou Spring (Java). Construção de aplicativos web completos, compreendendo a interação entre frontend e backend.\"\n},\n{\n\"Ordem\": 6,\n\"Titulo\": \"Mês 6 - Projetos Práticos e Revisão\",\n\"Descricao\": \"Desenvolvimento de projetos práticos para consolidar o conhecimento adquirido. Revisão de conceitos-chave, prática de resolução de problemas e aprofundamento em áreas específicas de interesse. Preparação para entrevistas técnicas e construção de portfólio.\"\n}\n]\n}"
        },
        {
          "role": "user",
          "content": `Objetivo: ${descricao} \nTempo desejado: ${tempo}`
        }
      ],
      temperature: 0.2,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response.choices[0].message.content 
    }catch(error){
      return res.status(400).send("Ocorreu um erro durante a geração da meta.");
    }
    
  }

  async function criaPerguntas(titulo, descricao,res){
    try{
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": "Gere uma pergunta com 5 alternativas, por favor faça com base no conteudo da tarefa para confirmar  se o usuario realmente realizou a tarefa, responda em um array de Strings JSON\nExemplo: {\"Pergunta\":\"Qual dos seguintes não é um exemplo de linguagem de programação popular?\",\"Alternativas\":[\"A) HTML\",\"B) Python\",\"C) JavaScript\",\"D) Java\",\"E) C++\"],\"Resposta\":0}"
          },
          {
            "role": "user",
            "content": `TituloTarefa: ${titulo} \nDescricaoTarefa: ${descricao}\n`
          }
        ],
        temperature: 1,
        max_tokens: 512,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
    return response.choices[0].message.content 
    }catch(error){
      return res.status(400).send("Ocorreu um erro durante a geração da meta.");
    }
    
  }
  
  module.exports = {criaMetas, criaPerguntas};