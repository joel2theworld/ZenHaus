import express from 'express';
import mongoose from 'mongoose';
import config from './config/config.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
const app = express();

//Middleware
app.use(express.json());

app.use(cors());

app.get('/', (request, response) =>{
    console.log(request);
    return response.status(200).send('Welcome to Relp!');
});

//Routes
app.use('/auth', authRoutes);
app.use('/property', propertyRoutes);


//Database and Server Startup
mongoose
    .connect(config.mongoDB)
    .then(() =>{
        console.log('MongoDB Connected...');
        app.listen(config.PORT, () => {
            console.log(`Server is running on port ${config.PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });