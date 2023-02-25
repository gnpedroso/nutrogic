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
        const { message } = req.body
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message,
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