import { getRepository } from "typeorm";
import { WorkService } from "../entity/WorkService";
import to from "await-to-js";
import _, { random } from "lodash";

export class WorkServiceServices {
  create(params: any) {
    return new Promise(async (resolve, reject) => {
      let err, duplicated, workService;

      const newWorkService = getRepository(WorkService).create(params);
      [err, workService] = await to(
        getRepository(WorkService).save(newWorkService)
      );

      if (err) {
        return reject(
          new Error("Ocurrio un error al registrar el workService")
        );
      }

      if (_.isUndefined(workService) || _.isNull(workService)) {
        return reject(new Error(`No se guardo el servicio`));
      }

      return resolve(workService);
    });
  }
}
