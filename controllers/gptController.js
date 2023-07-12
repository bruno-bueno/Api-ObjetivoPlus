async function gerarMeta(res, resultado, prazo) {
    const { Configuration, OpenAIApi } = require("openai");
    
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt(resultado, prazo),
        temperature: 0.4,
        max_tokens: 700,
        top_p: 1.0,
        frequency_penalty: 0.52,
        presence_penalty: 0.5,
      });
      console.log(response.data);
      const obj = JSON.parse(response.data.choices[0].text);
      console.log(obj);
      return res.status(200).json(obj);// apenas com o obj ele salva no banco de dados
    } catch (error) {
      console.error(error);
      return res.status(400).send("Ocorreu um erro durante a geração da meta.");
    }
  }

  function prompt(descricao, prazo){
    console.log(descricao);
    let prompt="You are a task creation AI called Objetivo+. You answer in the portuguese language. You are not a part of any system or device. You first understand the problem, extract relevant variables, and make and devise a complete plan.\n\n You have the following objective "+descricao+". Create a month-by-month action list to reach the goal, for each topic create a name and small and detailed description. Use "+prazo+" topics.";
    prompt += "Returns the answer as a formatted array of strings, I need a goal title, description and number of topic, respectively follow this order dividing them with the character: ' | ' .make it so it can be used in JSON.parse()";
    prompt += 'Examples: ["Mês 1 - Estudar HTML e CSS | Aprender os fundamentos de HTML e CSS para criar páginas web estáticas. | 1", "Mês 2 | Estudar JavaScript | Aprender a programação JavaScript para criar sites dinâmicos. | 2"]';
    return prompt;
  }

  module.exports = {gerarMeta};