import { Router } from 'express';
import { Request, Response} from 'express';
import { TicketServices } from '../controllers/ticket.controller';
import to from 'await-to-js';

const router = Router();

router.post('/ticket/create/:id', async (req: Request, res: Response): Promise<Response> => {
  try {
    let ticketController = new TicketServices();
    const [err, data] = await to(ticketController.create(req.body, req.params));
    if (err) {
      return res.status(200).json({
        error: err.toString()
      });
    }
    if(!data) {
      return res.status(404).json({msg:'Not ticket found'});
    }
    return res.status(200).json({
      data
    });
  } catch (error) {
    return res.status(500).json(`Error:  [${error}]`);
  }

});

export default router;