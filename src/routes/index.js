import { Router } from 'express'; 
import TodoRouter from './todos.routes';
import UaaRouter from './uaa.routes';
import { verifyToken } from '../middlewares/auth.middleware';

const Routes = Router();
Routes.get('/', (req, res) => {
    console.log('Hello world');
    res.json({message: 'Hello there'})
})
Routes.use('/uaa', UaaRouter);
Routes.use('/todos', verifyToken, TodoRouter);

export default Routes;