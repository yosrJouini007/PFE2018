/* tslint:disable */
import {
  GeoPoint
} from '../index';

declare var Object: any;
export interface GymsInterface {
  "name": string;
  "description": string;
  "right": string;
  "location"?: GeoPoint;
  "disponibility"?: any;
  "cover"?: string;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Gyms implements GymsInterface {
  "name": string;
  "description": string;
  "right": string;
  "location": GeoPoint;
  "disponibility": any;
  "cover": string;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: GymsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Gyms`.
   */
  public static getModelName() {
    return "Gyms";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Gyms for dynamic purposes.
  **/
  public static factory(data: GymsInterface): Gyms{
    return new Gyms(data);
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
      name: 'Gyms',
      plural: 'Gyms',
      path: 'Gyms',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "right": {
          name: 'right',
          type: 'string'
        },
        "location": {
          name: 'location',
          type: 'GeoPoint'
        },
        "disponibility": {
          name: 'disponibility',
          type: 'any'
        },
        "cover": {
          name: 'cover',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
      }
    }
  }
}
