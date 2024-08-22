import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import crypto from 'crypto';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3333;

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


const URI = process.env.URI

mongoose.connect(URI)
  .then(() => console.log("Database connected !"))
  .catch((error) => console.log("Error Occurred while connecting to MongoDB", error));


  app.listen(PORT, () => console.log(`Running on PORT ${PORT}`));