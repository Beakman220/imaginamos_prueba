import { Router } from 'express';
import { Request, Response } from 'express';
import { ClientServices } from '../controllers/client.controllers';

import to from 'await-to-js';



const router = Router();

router.post(
  '/client/create',
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

export default router;
