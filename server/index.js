import express from 'express';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8000;

app.get('/health', (req, res) => {
    console.log('Server is running!');
    res.send({ message: "server is running!"})
})

app.listen(PORT, () => {
    console.log(`Listening to port: http://localhost:${PORT}`);
})