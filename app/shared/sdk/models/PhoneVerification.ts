/* tslint:disable */

declare var Object: any;
export interface PhoneVerificationInterface {
  "phone": string;
  "verificationCode": string;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class PhoneVerification implements PhoneVerificationInterface {
  "phone": string;
  "verificationCode": string;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: PhoneVerificationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PhoneVerification`.
   */
  public static getModelName() {
    return "PhoneVerification";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PhoneVerification for dynamic purposes.
  **/
  public static factory(data: PhoneVerificationInterface): PhoneVerification{
    return new PhoneVerification(data);
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
      name: 'PhoneVerification',
      plural: 'PhoneVerifications',
      path: 'PhoneVerifications',
      idName: 'id',
      properties: {
        "phone": {
          name: 'phone',
          type: 'string'
        },
        "verificationCode": {
          name: 'verificationCode',
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
