import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URL);
let complaintsColl;

async function connectToMongoDB() {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    complaintsColl = db.collection('complaints'); 
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

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



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
