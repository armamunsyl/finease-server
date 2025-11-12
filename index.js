const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

//fineaseDB
//e4cE4MZnrztUWi2y



app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zazcspq.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

app.get('/', (req, res) => {
    res.send("user server is available");
})

async function run() {
    try {
        await client.connect();
        const db = client.db("fineaseDB");
        const transactionCollection = db.collection("transactions");

        app.get("/", (req, res) => {
            res.send("FinEase server is running successfully!");
        });

        app.post("/transactions", async (req, res) => {
            console.log("hitted")
            const transaction = req.body;
            console.log("vat khaisi", transaction)
            const result = await transactionCollection.insertOne(transaction);
            res.send(result);
        });

        console.log("✅ MongoDB connected & FinEase routes active!");
    } finally {
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`finease server is running on port: ${port}`)
});