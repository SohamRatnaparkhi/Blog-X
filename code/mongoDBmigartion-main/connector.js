const { MongoClient } = require('mongodb');

const MONGO_HOST = 'MONGO_HOST_IP_FROM_ADMIN_INTERFACE';  
const MONGO_PORT = 'MONGO_HOST_PORT_FROM_ADMIN_INTERFACE';

// Create a new MongoClient  
const client = new MongoClient(`mongodb://${MONGO_HOST}:${MONGO_PORT}`);

async function run() {  
  try {  
    // Connect the client to the server  
    await client.connect();  
    // Establish and verify connection  
    await client.db('admin').command({ ping: 1 });  
    console.log('Connected successfully to server');  
  } finally {  
    // Ensures that the client will close when you finish/error  
    await client.close();  
  }  
}  
run().catch(console.dir);