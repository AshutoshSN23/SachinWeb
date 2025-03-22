import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import UserModel from './models/user.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.post('/register', (req, res)=>{
    UserModel.create(req.body).
    then(user => res.json(user))
    .catch(err => res.json(err))
})

app.post('/login', async(req, res)=>{
    const {email} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Success")
        } else{
            res.json("The email does not exist in our database")
        }
    })
})

// Handle React routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});