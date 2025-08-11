export async function connectToMongoDB() {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    complaintsColl = db.collection('complaints'); 
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}