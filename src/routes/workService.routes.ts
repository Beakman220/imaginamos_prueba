import { Router } from "express";
import { Request, Response} from "express";
const { WorkServiceServices } = require('../controllers/workService.controllers');
import to from 'await-to-js';


const router = Router();

router.post('/workServices/create', async (req: Request, res: Response): Promise<Response> => {
  try {
    let workServiceController = new WorkServiceServices();
    const [err, data] = await to(workServiceController.create(req.body));
    if (err) {
      return res.status(200).json({
        error: err.toString()
      });
    }
    if(!data) {
      return res.status(404).json({msg:'Not workService found'});
    }
    return res.status(200).json({
      data
    });
  } catch (error) {
    return res.status(500).json(`Error:  [${error}]`);
  }

});

export default router;