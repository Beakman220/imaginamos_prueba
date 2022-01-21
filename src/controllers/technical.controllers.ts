import {getRepository} from 'typeorm'
import {Technical} from '../entity/Technical';
import {Ticket} from '../entity/Ticket';
import to from 'await-to-js';
import _ from 'lodash';

export class TechnicalServices {
  create(params: any) {
    return new Promise(async (resolve, reject) => {
      let err, duplicated, technical;

      const newTechnical = getRepository(Technical).create(params);
      [err, technical] = await to(getRepository(Technical).save(newTechnical));

      if (err) {
        console.log('technical.js -- 23 > err === ', err);
        return reject(new Error('Ocurrio un error al registrar el technical'));
      }

      return resolve(technical);
    });
  }

  listTickets(params: any) {
    return new Promise(async (resolve, reject) => {
      let err, duplicated, resTechnical: any, resTickets: any;

      console.log('technical.controller.ts -- 27 > params === ', params);

       //findTechnical
       [err, resTechnical] = await to(getRepository(Technical).findOne({email : params.email}));

       if (err) {
         return reject(err);
       }
 
       if (_.isUndefined(resTechnical) || _.isNull(resTechnical)) {
         return reject(new Error(`No se encontr el técnico`));
       }
       console.log('ticket.contrl.ts  39 ========> resTechnical', resTechnical);

      //findTickets
      [err, resTickets] = await to(getRepository(Ticket).find({ technical : resTechnical.id}));

      if (err) {
        return reject(err);
      }
      console.log('ticket.contrl.ts  48 ========> resTickets', resTickets);

      if (_.isUndefined(resTickets) || _.isNull(resTickets)) {
        return reject(new Error(`No se encontr el técnico`));
      }
      console.log('ticket.contrl.ts  53 ========> resTickets', resTickets);
       
 
      return resolve(resTickets);
    });
  }
}
