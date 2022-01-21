import {getRepository} from 'typeorm'
import {Ticket} from '../entity/Ticket';
import {Client} from '../entity/Client';
import {Technical} from '../entity/Technical';
import {WorkService} from '../entity/WorkService';
import to from 'await-to-js';
import _ from 'lodash';
export class TicketServices {
  create(body: any, params: any) {
    return new Promise(async (resolve, reject) => {
      let err, duplicated, resTicket: any, resClient: any, resTechnical: any, resWorkService: any, newClient: any, newTechnical: any, newWorkService: any, res, technicals, numberRandom;

      //findCliente
      [err, resClient] = await to(getRepository(Client).findOne(params.id));

      if (err) {
        return reject(err);
      }

      if (_.isUndefined(resClient) || _.isNull(resClient)) {
        return reject(new Error(`No se encontr el cliente`));
      }
      console.log('ticket.contrl.ts  23 ========> client', resClient);


      //findTechnical
      [err, technicals] = await to(getRepository(Technical).find());

      if (err) {
        return reject(err);
      }

      if (_.isUndefined(technicals) || _.isNull(technicals) || !_.isArray(technicals) || technicals.length === 0) {
        return reject(new Error(`No Existen técnicos`));
      }

      console.log('ticket.contrlllers.js -- 36 > technicals === ', technicals);
      console.log('ticket.contrlllers.js -- 37 > err === ', err);
      
      let orderTechnicals = _.sortBy(technicals, [function(t) {return t.id}]);

      console.log('ticket.contrlllers.js -- 39 > orderTechnicals === ', orderTechnicals);
      console.log('ticket.contrlllers.js -- 40 > orderTechnicals.length === ', orderTechnicals.length);
      console.log('ticket.contrlllers.js -- 41 > orderTechnicals[orderTechnicals.length].id === ', orderTechnicals[orderTechnicals.length-1].id);

      numberRandom = _.random(1, orderTechnicals[orderTechnicals.length-1].id);

      console.log('ticket.contrlllers.js -- 45 > numberRandom === ', numberRandom);

      //findTechnical
      [err, resTechnical] = await to(getRepository(Technical).findOne({id : numberRandom}));

      if (err) {
        return reject(err);
      }

      if (_.isUndefined(resTechnical) || _.isNull(resTechnical)) {
        return reject(new Error(`No se encontr el técnico`));
      }
      console.log('ticket.contrl.ts  52 ========> resTechnical', resTechnical);
      console.log('ticket.contrl.ts  53 ========> body.service', body.service);

      //findWorkService
      [err, resWorkService] = await to(getRepository(WorkService).findOne({description : body.service}));

      if (err) {
        return reject(err);
      }

      if (_.isUndefined(resWorkService) || _.isNull(resWorkService)) {
        return reject(new Error(`No se encontr el técnico`));
      }
      console.log('ticket.contrl.ts  65 ========> resWorkService', resWorkService);

      //createTicket
      let newTicket = new Ticket();
      newTicket.note = body.note;
      newTicket.token = body.token;
      newTicket.status = body.status;
      newTicket.client = resClient;
      newTicket.technical = resTechnical;
      newTicket.workService = resWorkService;

      console.log('ticket.contrl.ts  76 ========> newTicket', newTicket);
      // newTicket.client = (client) ? client : null;
      [err, resTicket] = await to(getRepository(Ticket).save(newTicket));
      console.log('ticket.contrlllers.js -- 79 > ticket === ', resTicket);
      console.log('ticket.contrlllers.js -- 80 > err === ', err);

      if (err) {
        console.log('ticket.js -- 83 > err === ', err);
        return reject(new Error('Ocurrio un error al registrar el ticket'));
      }

      //updateClient
      if(!resClient.tickets) {
        console.log('ticket.contrlllers.js -- 89 > client.tickets === ', resClient.tickets);
        newClient = Client.create({
          tickets: [resTicket]
        });
      }
      getRepository(Client).merge(resClient, newClient);
      [err, res] = await to(getRepository(Client).save(newClient));
      console.log('ticket.contrlllers.js -- 96 > res === ', res);
      console.log('ticket.contrlllers.js -- 97 > err === ', err);

      //updateTechnical
      if(!resTechnical.tickets) {
        console.log('ticket.contrlllers.js -- 101 > resTechnical.tickets === ', resTechnical.tickets);
        newTechnical = Technical.create({
          tickets: [resTicket]
        });
      }
      getRepository(Technical).merge(resTechnical, newTechnical);
      [err, res] = await to(getRepository(Technical).save(newTechnical));
      console.log('ticket.contrlllers.js -- 108 > res === ', res);
      console.log('ticket.contrlllers.js -- 109 > err === ', err);

       //updateWorkService
       if(!resWorkService.tickets) {
        console.log('ticket.contrlllers.js -- 113 > resWorkService.tickets === ', resWorkService.tickets);
        newWorkService = WorkService.create({
          tickets: [resTicket]
        });
      }
      getRepository(WorkService).merge(resWorkService, newWorkService);
      [err, res] = await to(getRepository(WorkService).save(newWorkService));
      console.log('ticket.contrlllers.js -- 120 > res === ', res);
      console.log('ticket.contrlllers.js -- 121 > err === ', err);


      //respuesta
      return resolve(resTicket);
    });
  }
}
