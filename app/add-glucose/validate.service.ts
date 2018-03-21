import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {
    private numberRegx=/^[0-9]+(\.[0-9]{1,2})$/;
    constructor() { }

    isNumber(num): boolean {
        return this.numberRegx.test(num)
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