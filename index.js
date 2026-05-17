const express = require('express');

const app = express();

const port = 3000;

app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).json({
        message: "hello world"
    })
})

app.all('/*splat', (req, res)=>{
    res.status(500).json({
        message: "Not buid yet"
    })
})

app.listen(port,()=>{
    console.log(`app is running on the port http://localhost:${port}`);
})