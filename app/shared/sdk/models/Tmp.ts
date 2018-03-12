/* tslint:disable */

declare var Object: any;
export interface TmpInterface {
  "id"?: number;
}

export class Tmp implements TmpInterface {
  "id": number;
  constructor(data?: TmpInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Tmp`.
   */
  public static getModelName() {
    return "Tmp";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Tmp for dynamic purposes.
  **/
  public static factory(data: TmpInterface): Tmp{
    return new Tmp(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Tmp',
      plural: 'Tmps',
      path: 'Tmps',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
