import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: "org-OvzI9SnUXficJ9icnhlhbzzP",
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());
// import helmet
// app.use(helmet())

app.post('/', async (req, res) => {
    try {
        const prompt = `Responda como um nutricionista. 
        Primeiramente, calcule meu TDEE  baseado nos seguintes dados: 
        Sou ${req.body.providerGender}, vivo no Brasil, tenho ${req.body.providerAge} anos, 
        peso ${req.body.providerWeight}kgs, altura ${req.body.providerHeight}cm e 
        nível de atividade física ${req.body.providerActivityLevel} 
        
        Com este valor do TDEE, monte um plano de dieta para ${req.body.dietFrequency} dias e 
        ${req.body.mealFrequency} refeições por dia, com o objetivo de ${req.body.weightObjective}. 
        Inicialmente apresente o "Consumo médio diário" em(kcal / dia), sendo este o valor 
        de consumo calórico diário referente a esta dieta. Apresente as porções em medidas
        (exemplo: 200g de carne magra, 50g de nozes, 150g de arroz integral, 50g de mirtilos). 
        Não utilize "xícara" e nem "colher" como valor de medido, utilize seu peso(em gramas) 
        Não apresente "1 porção de legumes", apresente qual o legume é recomendado e 
        sua quantidade(em gramas), exemplo: "200g de brócolis". 
        
        Apresente o valor em HTML5 e cada "Dia" contendo uma classe "font-bold", 
        contendo as refeições de todos os 5 dias, para facilitar a leitura: `

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 1650,
            temperature: 0,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        if (response.data && response.data.choices) {
            res.json({
                message: response.data.choices[0].text
            })
        }
    } catch (error) {
        // why not throw new Error(error)? Typescript error
        console.log(error)
    }


})
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})