import {getRepository} from 'typeorm'
import {Ticket} from '../entity/Ticket';
import to from 'await-to-js';

export class TicketServices {
  create(params: any) {
    return new Promise(async (resolve, reject) => {
      let err, duplicated, ticket;

      const newTicket = getRepository(Ticket).create(params);
      [err, ticket] = await to(getRepository(Ticket).save(newTicket));
      console.log('ticket.js -- 12 > err === ', err);

      if (err) {
        console.log('ticket.js -- 23 > err === ', err);
        return reject(new Error('Ocurrio un error al registrar el ticket'));
      }

      return resolve(ticket);
    });
  }
}
