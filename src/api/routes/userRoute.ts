import * as controller from '../controllers/userController';
import express from "express";


export const router = express.Router();

router.get('/api/users', controller.getUsers);
router.get('/api/users/:id', controller.getUserById);
router.post('/api/users', controller.addUser);
router.delete('/api/users/:id', controller.deleteUser);
router.put('/api/users', controller.updateUser);
