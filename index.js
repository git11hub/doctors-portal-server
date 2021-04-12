const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eftco.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()

app.use(express.json());
app.use(cors());

const port = 5000;

app.get('/', (req, res) =>{
    res.send("hello from db it's working ha ha ha!")
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, useUnifiedTopology: true });
client.connect(err => {
  const appointmentCollection = client.db("doctorsPortal").collection("appointments");

  app.post('/addAppointment', (req, res) =>{
      const appointment = req.body;
      console.log(appointment);
      appointmentCollection.insertOne(appointment)
      .then(result => {
          res.send(result.insertedCount)
      })
  })

});

app.listen(process.env.PORT || port)