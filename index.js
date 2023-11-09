const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 4500
// require('dotenv').config()


//middleware
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://BookBuffet349:09HfpE9FqUZWBDdU@cluster0.huqehxg.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const BooksCollections = client.db('bookBuffet').collection('booksCategory');
        const AddedBooks = client.db('bookBuffet').collection('addedBooks');


        app.get('/booksCategory', async (req, res) => {
            const cursor = BooksCollections.find();
            const result = await cursor.toArray();
            res.send(result)
        })
        app.get('/books', async (req, res) => {
            const cursor = AddedBooks.find();
            const result = await cursor.toArray();
            res.send(result)
        })


        app.post('/books', async (req, res) => {
            const newBooks = req.body;
            console.log(newBooks)
            const result = await BooksCollections.insertOne(newBooks)
            res.send(result)
        })






        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('BookBuffet is running')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})