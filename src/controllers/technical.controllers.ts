import { getRepository } from "typeorm";
import { Technical } from "../entity/Technical";
import { Ticket } from "../entity/Ticket";
import to from "await-to-js";
import _ from "lodash";

export class TechnicalServices {
  create(params: any) {
    return new Promise(async (resolve, reject) => {
      let err, duplicated, technical;

      //duplicated
      [err, duplicated] = await to(
        getRepository(Technical).findOne({
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
            `Ya existe un técnico con cedula ${params.document} o email ${params.email} o celular ${params.cellphone}`
          )
        );
      }

      //createTechnical
      const newTechnical = getRepository(Technical).create(params);
 
      //Save Technical
      [err, technical] = await to(getRepository(Technical).save(newTechnical));

      if (err) {
        return reject(new Error("Ocurrio un error al registrar el technical"));
      }

      if (_.isUndefined(technical) || _.isNull(technical)) {
        return reject(new Error(`No se guardo el técnico`));
      }

      return resolve(technical);
    });
  }

  listTickets(params: any) {
    return new Promise(async (resolve, reject) => {
      let err, duplicated, resTechnical: any, resTickets: any;

      //find Technical By Email
      [err, resTechnical] = await to(
        getRepository(Technical).findOne({ email: params.email })
      );

      if (err) {
        return reject(err);
      }

      if (_.isUndefined(resTechnical) || _.isNull(resTechnical)) {
        return reject(new Error(`No se encontr el técnico`));
      }

      //find Tickets Id Technical
      [err, resTickets] = await to(
        getRepository(Ticket).find({ technical: resTechnical.id })
      );

      if (err) {
        return reject(err);
      }

      if (_.isUndefined(resTickets) || _.isNull(resTickets)) {
        return reject(new Error(`No se encontr los servicios del técnico`));
      }

      return resolve(resTickets);
    });
  }
}
