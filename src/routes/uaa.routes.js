import { Router } from 'express'; 
import uaaController from '../controllers/uaa.controller';

const UaaRouter = Router();

UaaRouter.route('/login')
    .post(uaaController.login);
    
UaaRouter.route('/register')
    .post(uaaController.register);

export default UaaRouter;