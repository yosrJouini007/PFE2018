import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {
    private emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    constructor() { }

    isEmail(email): boolean {
        return this.emailRegx.test(email)
    }
    isEmpty(input): boolean {
        return input == "" ? true : false
    }
    minLength(input , number): boolean {
        return input.length >= number ? true : false
    }

    maxLength(input , number): boolean {
        return input.length <= number ? true : false
    }

}