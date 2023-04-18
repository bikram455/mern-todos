import './data/db';
import dotenv from 'dotenv';
import express from 'express';
import Routes from './routes';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', function(req, res, next) {
    
    res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.append('Access-Control-Allow-Credentials', true);
    if(req.method == 'OPTIONS') {
        res.json();
        return;
    }
    console.log('request: ', req.method, req.url, new Date());
    next();
});
app.use('/api', Routes);

const server = app.listen(process.env.PORT, () => {
    console.log('Listening to port: ', server.address().port);
});

