async function gerarMeta(res, prompt) {
    const { Configuration, OpenAIApi } = require("openai");
    
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.2,
        max_tokens: 700,
        top_p: 1.0,
        frequency_penalty: 0.52,
        presence_penalty: 0.5,
      });
      console.log("gerou");
      console.log(response.data.choices[0].text);
      const obj = response.data.choices[0].text;
      console.log(obj);
      return obj;
    } catch (error) {
      console.error(error);
      return res.status(400).send("Ocorreu um erro durante a geração da meta.");
    }
  }

  module.exports = {gerarMeta};