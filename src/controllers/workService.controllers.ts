import { getRepository } from "typeorm";
import { WorkService } from "../entity/WorkService";
import to from "await-to-js";
import _, { random } from "lodash";

export class WorkServiceServices {
  create(params: any) {
    return new Promise(async (resolve, reject) => {
      let err: string, duplicated: WorkService, workService: WorkService[];

      //duplicated
      [err, duplicated] = await to(
        getRepository(WorkService).findOne({ description: params.description })
      );

      if (err) {
        return reject(err);
      }

      if (duplicated) {
        return reject(
          new Error(
            `Ya existe un servicio con descripción ${params.description}`
          )
        );
      }

      //createWorkService
      const newWorkService: WorkService[] = getRepository(WorkService).create(params);

      //saveWorkService
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
