import express from 'express';
import { MongoClient } from 'mongodb';
import { connectToMongoDB } from './mongoDB/database';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_COMMANDER_PASSWORD = "123454321"

const client = new MongoClient(process.env.MONGO_URL);

let complaintsColl;

connectToMongoDB();

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/submit',async(req,res) => {
    const {complaint,details} = req.body

    const complaintDoc = {
    complaint,
    details,
    timestamp: new Date() 
    };

   try {
    const result = await complaintsColl.insertOne(complaintDoc);
    res.status(201).json({
      message: 'Complaint submitted successfully.',
    });
  } catch (err) {
    console.error('Error submitting complaint:', err);
    res.status(500).json({ message: 'Failed to submit complaint.' });
  }

})

app.post('/submit-password',async(req,res) => {
   const password = req.body;

    if (password !== MONGO_COMMANDER_PASSWORD) {
    return res.status(401).send('Unauthorized: Incorrect password');
  }
  try {
    const complaints = await complaintsColl.find({}).toArray();
    res.send(`<pre>${JSON.stringify(complaints, null, 2)}</pre>`);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }

})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
