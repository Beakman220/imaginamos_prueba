import { Request, Response} from "express";
import {getRepository} from 'typeorm'
import {Client} from '../entity/Client';
import to from 'await-to-js';

export class ClientServices {
  create(params: any) {
    return new Promise(async (resolve, reject) => {
      let err, duplicated, client;

      const newClient = getRepository(Client).create(params);
      [err, client] = await to(getRepository(Client).save(newClient));

      if (err) {
        console.log('client.js -- 23 > err === ', err);
        return reject(new Error('Ocurrio un error al registrar el cliente'));
      }

      return resolve(client);
    });
  }
}


/*///////////////////////////////////////////////////////////////////////////////////
*/
export const getClients = async (req: Request, res: Response): Promise<Response> => {
  try {
    const clients = await getRepository(Client).find();
    if(!clients) {
      return res.status(404).json({msg:'Not clients found'});
    }
    return res.status(200).json(clients);
  } catch (error) {
    return res.status(500).json({msg:'Internal server error'});
  }
}

export const getClient = async (req: Request, res: Response): Promise<Response> => {
  const results = await getRepository(Client).findOne(req.params.id);
  if(results) {
    return res.status(200).json(results);
  }
  return res.status(404).json({msg:'Not client found'});
}

export const createClient = async (req: Request, res: Response): Promise<Response> => {
  const newClients = getRepository(Client).create(req.body);
  const results = await getRepository(Client).save(newClients);
  return res.json(results);
}

export const updateClient = async (req: Request, res: Response): Promise<Response> => {
  const client = await getRepository(Client).findOne(req.params.id);
  if(client) {
    getRepository(Client).merge(client, req.body);
    const results = await getRepository(Client).save(client);
    return res.json(results);
  }
  return res.status(404).json({msg:'Not client found'});
}


export const deleteClient = async (req: Request, res: Response): Promise<Response> => {
  const results = await getRepository(Client).delete(req.params.id);
  return res.json(results);
}