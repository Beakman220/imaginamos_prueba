import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Client } from "../entity/Client";
import to from "await-to-js";
import _, { random } from "lodash";

export class ClientServices {
  create(params: any) {
    return new Promise(async (resolve, reject) => {
      let err: string, duplicated: Client, client: Client[];
      
      //duplicated
      [err, duplicated] = await to(
        getRepository(Client).findOne({
          where: [
            { email: params.email },
            { document: params.document },
            { cellphone: params.cellphone },
          ],
        })
      );

      if (err) {
        return reject(err);
      }

      if (duplicated) {
        return reject(
          new Error(
            `Ya existe un cliente con cedula ${params.document} o email ${params.email} o celular ${params.cellphone}`
          )
        );
      }

      //createClient
      const newClient: Client[] = getRepository(Client).create(params);

      //save client
      [err, client] = await to(getRepository(Client).save(newClient));

      if (err) {
        return reject(new Error("Ocurrio un error al crear el cliente"));
      }

      if (_.isUndefined(client) || _.isNull(client)) {
        return reject(new Error(`No se guardo el cliente`));
      }

      return resolve(client);
    });
  }
}

/*
export const getClients = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const clients = await getRepository(Client).find();
    if (!clients) {
      return res.status(404).json({ msg: "Not clients found" });
    }
    return res.status(200).json(clients);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getClient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const results = await getRepository(Client).findOne(req.params.id);
  if (results) {
    return res.status(200).json(results);
  }
  return res.status(404).json({ msg: "Not client found" });
};

export const createClient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newClients = getRepository(Client).create(req.body);
  const results = await getRepository(Client).save(newClients);
  return res.json(results);
};

export const updateClient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const client = await getRepository(Client).findOne(req.params.id);
  if (client) {
    getRepository(Client).merge(client, req.body);
    const results = await getRepository(Client).save(client);
    return res.json(results);
  }
  return res.status(404).json({ msg: "Not client found" });
};

export const deleteClient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const results = await getRepository(Client).delete(req.params.id);
  return res.json(results);
};
*/