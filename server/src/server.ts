import express from 'express';
import { states} from './states';

const app = express();
const port = 3000;

app.get('/api/states', (req, res)=> {
    res.json(states);
})

app.listen(port, ()=>{
    console.log(`Server listening on ${port}`);
})