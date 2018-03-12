/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Gyms } from '../../models/Gyms';
import { Container } from '../../models/Container';
import { PhoneVerification } from '../../models/PhoneVerification';
import { Guests } from '../../models/Guests';
import { Sessions } from '../../models/Sessions';
import { Tmp } from '../../models/Tmp';
import { Card } from '../../models/Card';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Gyms: Gyms,
    Container: Container,
    PhoneVerification: PhoneVerification,
    Guests: Guests,
    Sessions: Sessions,
    Tmp: Tmp,
    Card: Card,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
