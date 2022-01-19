import { Request, Response} from "express";
import {getRepository} from 'typeorm'
import {Client} from '../entity/Client';

export const getClients = async (req: Request, res: Response): Promise<Response> => {
  const clients = await getRepository(Client).find();
  return res.json(clients);
}

export const getClient = async (req: Request, res: Response): Promise<Response> => {
  const results = await getRepository(Client).findOne(req.params.id);
  return res.json(results);
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