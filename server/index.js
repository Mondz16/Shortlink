import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import IsValidURL from './utils/validateUrl.js';
import { ApiResponse } from './utils/apiResponse.js';
import toBase64 from './utils/shortcode.js';

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 8000;

const links = new Map();
let counter = 1000

app.use(cors())
app.use(express.json())

app.post("/api/link", (req, res) => {
    const { link } = req.body;
    if(!IsValidURL(link)){
        res.status(400).json(new ApiResponse(false, "invalid url"))
        return;
    }
    
    var newUrl = toBase64(counter++);
    links.set(newUrl, link)
    res.status(201).json(new ApiResponse(true, "Created shorted link", {originalUrl: link, updated: `http://localhost:${PORT}/${newUrl}`}))
});

app.get("/:link", (req,res) => {
    const {link} = req.params;

    if(!links.has(link)){
        res.status(404).json(new ApiResponse(false, "invalid url"))
        return;
    }

    res.redirect(links.get(link))
    // res.status(201).json(new ApiResponse(true, "Found link", {originalUrl: links.get(link)}))
})

app.get('/health', (req, res) => {
    console.log('Server is running!');
    res.send({ message: "server is running!"})
})

app.listen(PORT, () => {
    console.log(`Listening to port: http://localhost:${PORT}`);
})