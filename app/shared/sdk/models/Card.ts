/* tslint:disable */

declare var Object: any;
export interface CardInterface {
  "card_id": string;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Card implements CardInterface {
  "card_id": string;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: CardInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Card`.
   */
  public static getModelName() {
    return "Card";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Card for dynamic purposes.
  **/
  public static factory(data: CardInterface): Card{
    return new Card(data);
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
      name: 'Card',
      plural: 'Cards',
      path: 'Cards',
      idName: 'id',
      properties: {
        "card_id": {
          name: 'card_id',
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
