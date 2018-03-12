/* tslint:disable */
import {
  Gyms,
  Guests
} from '../index';

declare var Object: any;
export interface SessionsInterface {
  "startAt": Date;
  "endAt"?: string;
  "duration"?: string;
  "sessionPrice"?: string;
  "price"?: string;
  "guestId": any;
  "gymId": any;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  gym?: Gyms;
  guest?: Guests;
}

export class Sessions implements SessionsInterface {
  "startAt": Date;
  "endAt": string;
  "duration": string;
  "sessionPrice": string;
  "price": string;
  "guestId": any;
  "gymId": any;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  gym: Gyms;
  guest: Guests;
  constructor(data?: SessionsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Sessions`.
   */
  public static getModelName() {
    return "Sessions";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Sessions for dynamic purposes.
  **/
  public static factory(data: SessionsInterface): Sessions{
    return new Sessions(data);
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
      name: 'Sessions',
      plural: 'Sessions',
      path: 'Sessions',
      idName: 'id',
      properties: {
        "startAt": {
          name: 'startAt',
          type: 'Date'
        },
        "endAt": {
          name: 'endAt',
          type: 'string'
        },
        "duration": {
          name: 'duration',
          type: 'string'
        },
        "sessionPrice": {
          name: 'sessionPrice',
          type: 'string'
        },
        "price": {
          name: 'price',
          type: 'string'
        },
        "guestId": {
          name: 'guestId',
          type: 'any'
        },
        "gymId": {
          name: 'gymId',
          type: 'any'
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
        gym: {
          name: 'gym',
          type: 'Gyms',
          model: 'Gyms',
          relationType: 'belongsTo',
                  keyFrom: 'gymId',
          keyTo: 'id'
        },
        guest: {
          name: 'guest',
          type: 'Guests',
          model: 'Guests',
          relationType: 'belongsTo',
                  keyFrom: 'guestId',
          keyTo: 'id'
        },
      }
    }
  }
}
