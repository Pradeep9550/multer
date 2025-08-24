// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config(); 

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Database connection error: ${error.message}`);
//     process.exit(1); 
//   }
// };

// export default connectDB;



// Using then().catch()

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Database connection error", err));
};

export default connectDB;



