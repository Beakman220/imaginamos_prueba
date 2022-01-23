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