import {getRepository} from 'typeorm'
import {WorkService} from '../entity/WorkService';
import to from 'await-to-js';

export class WorkServiceServices {
  create(params: any) {
    return new Promise(async (resolve, reject) => {
      let err, duplicated, workService;

      const newWorkService = getRepository(WorkService).create(params);
      [err, workService] = await to(getRepository(WorkService).save(newWorkService));

      if (err) {
        console.log('workService.js -- 23 > err === ', err);
        return reject(new Error('Ocurrio un error al registrar el workService'));
      }

      return resolve(workService);
    });
  }
}
