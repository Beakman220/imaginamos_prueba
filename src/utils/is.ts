import to from 'await-to-js';
import {getRepository} from 'typeorm'
import {Technical} from '../entity/Technical';
import _ from 'lodash';


export function technicalRandom2(data: any) {
  console.log('is.ts -- 8 > data === ', data);
  return data;
}

export function technicalRandom(data: any, start: number, finish: number) {
  return new Promise(async (resolve, reject) => {
    let err, resTechnical: any, technicals, numberRandom;

    numberRandom = _.random(1, data[data.length-1].id);

    console.log('is.ts -- -- 40 > numberRandom === ', numberRandom);


      //findTechnical
      [err, resTechnical] = await to(getRepository(Technical).findOne({id : numberRandom}));

      if (err) {
        return reject(err);
      }

      console.log('is.ts  52 ========> resTechnical', resTechnical);

    if(start >= finish || !_.isUndefined(resTechnical) || _.isNull(resTechnical)) {
      return resolve(resTechnical);
    } else {
      technicalRandom(data, start++, finish);
    }
  });
}

const functions = {
  technicalRandom,
  technicalRandom2
};

export default functions;