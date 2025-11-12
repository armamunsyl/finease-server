const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send("user server is available");
})

app.listen(port, () => {
    console.log(`finease server is running on port: ${port}`)
})