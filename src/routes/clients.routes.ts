import { Router } from 'express';
import { Request, Response } from 'express';
import { ClientServices } from '../controllers/client.controllers';

import to from 'await-to-js';

/*
import {
  getClients,
  createClient,
  getClient,
  updateClient,
  deleteClient,
} from '../controllers/client.controllers';
*/


const router = Router();

router.post(
  '/clients/create',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      let clientController = new ClientServices();
      const [err, data] = await to(clientController.create(req.body));
      if (err) {
        return res.status(200).json({
          error: err.toString(),
        });
      }
      if (!data) {
        return res.status(404).json({ msg: 'No se encontraron clientes' });
      }
      return res.status(200).json({
        data,
      });
    } catch (error) {
      return res.status(500).json(`Error:  [${error}]`);
    }
  }
);

/*
router.get('/clients', getClients);
router.get('/clients/:id', getClient);
router.put('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);
*/
export default router;
