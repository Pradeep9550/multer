import express from "express"
import cors from "cors"
import dotenv from 'dotenv';
import connectDB from "./db.js";
import uploadRoutes from "./routes/upload.routes.js"

dotenv.config();


const app = express();
const port = process.env.PORT

app.use(cors());
app.use(express.json());

// db
connectDB();



app.use('/api', uploadRoutes)
app.use('/upload', express.static('public/upload'));

app.listen(port, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});





