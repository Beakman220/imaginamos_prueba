import { Router } from "express";
import { Request, Response} from "express";
const { TechnicalServices } = require('../controllers/technical.controllers');
import to from 'await-to-js';


const router = Router();

router.post('/technicals/create', async (req: Request, res: Response): Promise<Response> => {
  try {
    let technicalController = new TechnicalServices();
    const [err, data] = await to(technicalController.create(req.body));
    if (err) {
      return res.status(200).json({
        error: err.toString()
      });
    }
    if(!data) {
      return res.status(404).json({msg:'Not technical found'});
    }
    return res.status(200).json({
      data
    });
  } catch (error) {
    return res.status(500).json(`Error:  [${error}]`);
  }

});

router.get('/technicals/ticket/list/:email', async (req: Request, res: Response): Promise<Response> => {
  try {
    let technicalController = new TechnicalServices();
    const [err, data] = await to(technicalController.listTickets(req.params));
    if (err) {
      return res.status(200).json({
        error: err.toString()
      });
    }

    return res.status(200).json({
      data
    });
  } catch (error) {
    return res.status(500).json(`Error:  [${error}]`);
  }



});
export default router;