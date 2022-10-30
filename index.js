const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//middleware
app.use(cors());
app.use(express.json());

//user: mongoCurd
// pass: 2vIfHkl27VdKoV6I

const uri =
  "mongodb+srv://mongoCurd:2vIfHkl27VdKoV6I@cluster0.teba24n.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const userCollection = client.db("nodeMongoCrud").collection("users");
    // const user = {
    //   name: " sting test",
    //   email: " tesign@gmail.com",
    // };
    // const result = await userCollection.insertOne(user);
    // console.log(result);

    // get in users page
    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const user = await cursor.toArray();
      res.send(user);
    });

    // send to user information in mongodb
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
    // deleted to user information in mongodb(deletOne)
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("tryin to delet", id);
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      console.log(result);
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => {
  console.log(err);
});

app.get("/", (req, res) => {
  res.send("Hello from node mongo curd server");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
