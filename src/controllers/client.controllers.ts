import { Request, Response} from "express";
import {getRepository} from 'typeorm'
import {Client} from '../entity/Client';

export const getClients = async (req: Request, res: Response): Promise<Response> => {
  try {
    const clients = await getRepository(Client).find();
    if(clients) {
      return res.status(200).json(clients);
    }
    return res.status(404).json({msg:'Not clients found'});
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