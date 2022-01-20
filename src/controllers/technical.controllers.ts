import {getRepository} from 'typeorm'
import {Technical} from '../entity/Technical';
import to from 'await-to-js';

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
}
