import mongoose from "mongoose";
const connection = {};

 async function connectDb() {
  //   console.log(process.env.NODE_ENV);
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  } else {
    if (mongoose.connections.length > 0) {
      connection.isConnected = mongoose.connections[0].readyState;
    }
    if (connection.isConnected === 1) {
      console.log("Use previous connection to the database");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("New connection to the database.");
  connection.isConnected = db.connections[0].readyState;
}

 async function disconnectDb() {
  if (connection.isConnected) {
    if (process.env.NODE_END === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("fails to disconnect from database");
    }
  }
}

const db = {connectDb,disconnectDb}
export default db

