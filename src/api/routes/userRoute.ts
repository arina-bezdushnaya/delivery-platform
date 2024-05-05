import * as controller from '../controllers/userController';
import express from 'express';
import cors from 'cors';
import {corsOptions} from '../../index';

export const router = express.Router();

router.get('/api/users', cors(corsOptions), controller.getUsers);
router.get('/api/users/:id', cors(corsOptions), controller.getUserById);
router.post('/api/users', cors(corsOptions), controller.addUser);
router.delete('/api/users/:id', cors(corsOptions), controller.deleteUser);
router.put('/api/users', cors(corsOptions), controller.updateUser);
