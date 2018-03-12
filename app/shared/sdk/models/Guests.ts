/* tslint:disable */

declare var Object: any;
export interface GuestsInterface {
  "name": string;
  "lastname": string;
  "phone"?: string;
  "stripe_customer"?: string;
  "email"?: string;
  "address"?: string;
  "userid"?: string;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Guests implements GuestsInterface {
  "name": string;
  "lastname": string;
  "phone": string;
  "stripe_customer": string;
  "email": string;
  "address": string;
  "userid": string;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: GuestsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Guests`.
   */
  public static getModelName() {
    return "Guests";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Guests for dynamic purposes.
  **/
  public static factory(data: GuestsInterface): Guests{
    return new Guests(data);
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
      name: 'Guests',
      plural: 'Guests',
      path: 'Guests',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "lastname": {
          name: 'lastname',
          type: 'string'
        },
        "phone": {
          name: 'phone',
          type: 'string'
        },
        "stripe_customer": {
          name: 'stripe_customer',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "address": {
          name: 'address',
          type: 'string'
        },
        "userid": {
          name: 'userid',
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
