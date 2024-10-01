import express, { Router } from 'express';
import { createUser } from '../controllers/authControllers';

const router: Router = express.Router();

router.post('/register', createUser);

export default router;

