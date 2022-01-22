import { getRepository } from "typeorm";
import { Ticket } from "../entity/Ticket";
import { Client } from "../entity/Client";
import { Technical } from "../entity/Technical";
import { WorkService } from "../entity/WorkService";
import to from "await-to-js";
import _, { random } from "lodash";
import jwt from "jsonwebtoken";
export class TicketServices {
  create(body: any, params: any) {
    return new Promise(async (resolve, reject) => {
      let err: string,
        resTicket: Ticket,
        resClient: Client,
        resTechnical: Technical,
        resWorkService: WorkService,
        newToken: string;

      //findCliente
      [err, resClient] = await to(getRepository(Client).findOne(params.id));

      if (err) {
        return reject(err);
      }

      if (_.isUndefined(resClient) || _.isNull(resClient)) {
        return reject(new Error(`No se encontr el cliente`));
      }

      //getRandomTechnical
      [err, resTechnical] = await to(getRepository(Technical)
      .createQueryBuilder("technical")
      .orderBy("random()")
      .limit(10)
      .getOne());

      if (err) {
        return reject(err);
      }

      if (_.isUndefined(resTechnical) || _.isNull(resTechnical)) {
        return reject(new Error(`No fue posible asignar un técnico`));
      }

      //findWorkService
      [err, resWorkService] = await to(getRepository(WorkService).findOne({description: body.service }));

      if (err) {
        return reject(err);
      }

      if (_.isUndefined(resWorkService) || _.isNull(resWorkService)) {
        return reject(new Error(`No se encontr el servicio de trabajo`));
      }

      //generate token
      newToken = jwt.sign(
        { _id: resWorkService.id },
        process.env.TOKEN_SECRET || "token",
        { expiresIn: "15d" }
      );

      if (_.isUndefined(newToken) || _.isNull(newToken)) {
        return reject(new Error(`NO se guardó el token`));
      }

      //createTicket
      let newTicket = new Ticket();
      newTicket.note = (body.note) ? body.note : '';
      newTicket.token = newToken ;
      newTicket.isActive = body.isActive
      newTicket.service_date = body.service_date;
      newTicket.client = resClient;
      newTicket.technical = resTechnical;
      newTicket.workService = resWorkService;

      [err, resTicket] = await to(getRepository(Ticket).save(newTicket));

      console.log('err', err);
      console.log('resTicket', resTicket);

      if (err) {
        return reject(
          new Error(`Ocurrio un error al registrar el ticket Error: ${err}`)
        );
      }

      if (_.isUndefined(resTicket) || _.isNull(resTicket)) {
        return reject(new Error(`NO se guardó el ticket`));
      }
 
      return resolve(resTicket);
    });
  }
}
