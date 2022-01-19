import { Router } from "express";

const router = Router();

import {getClients, createClient, getClient, updateClient, deleteClient} from '../controllers/client.controllers'

router.get('/clients', getClients);
router.get('/clients/:id', getClient);
router.post('/clients', createClient);
router.put('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);


export default router;