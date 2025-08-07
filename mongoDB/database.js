import { MongoClient } from "mongodb";


export const client = new MongoClient(process.env.MONGO_URL)


export async function connectToMongoDB(){
    try{
        await client.connect()
        const db = client.db(process.env.DB_NAME);
        complaintsColl = db.collection(Complaints)
        console.log('Connected to MongoDB');
    }catch(err){
        console.error('MongoDB connection error:', err);
    }
}