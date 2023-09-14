import express from "express";
import * as dotenv from 'dotenv';
import {OpenAI} from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_IMAGE_GENERATOR
})

router.route('/').get((req, res) => {
    res.status(200).json({message: "Hello from DALL.E Routes"})
})

router.route('/').post(async (req, res) => {
    try{
        const {prompt} = req.body;
        console.log(prompt); 
        const response = await openai.images.generate({
            prompt,
            n: 1,
            size: '256x256',
            })
        console.log(response.data[0].url);          
        const image = response.data[0].url;
        res.status(200).json({photo: image});

    }catch (error){
        console.log(error);
        res.status(500).json({message: "Hiba történt!"})
    }
})

export default router;