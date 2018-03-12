"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
var PhoneVerification = (function () {
    function PhoneVerification(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `PhoneVerification`.
     */
    PhoneVerification.getModelName = function () {
        return "PhoneVerification";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of PhoneVerification for dynamic purposes.
    **/
    PhoneVerification.factory = function (data) {
        return new PhoneVerification(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    PhoneVerification.getModelDefinition = function () {
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
            relations: {}
        };
    };
    return PhoneVerification;
}());
exports.PhoneVerification = PhoneVerification;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGhvbmVWZXJpZmljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQaG9uZVZlcmlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0JBQW9COztBQVdwQjtJQU1FLDJCQUFZLElBQWlDO1FBQzNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDVyw4QkFBWSxHQUExQjtRQUNFLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztJQUM3QixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDVyx5QkFBTyxHQUFyQixVQUFzQixJQUFnQztRQUNwRCxNQUFNLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ1csb0NBQWtCLEdBQWhDO1FBQ0UsTUFBTSxDQUFDO1lBQ0wsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixNQUFNLEVBQUUsb0JBQW9CO1lBQzVCLElBQUksRUFBRSxvQkFBb0I7WUFDMUIsTUFBTSxFQUFFLElBQUk7WUFDWixVQUFVLEVBQUU7Z0JBQ1YsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGtCQUFrQixFQUFFO29CQUNsQixJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLElBQUk7b0JBQ1YsSUFBSSxFQUFFLEtBQUs7aUJBQ1o7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsTUFBTTtpQkFDYjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxNQUFNO2lCQUNiO2FBQ0Y7WUFDRCxTQUFTLEVBQUUsRUFDVjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBaEVELElBZ0VDO0FBaEVZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXHJcblxyXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcclxuZXhwb3J0IGludGVyZmFjZSBQaG9uZVZlcmlmaWNhdGlvbkludGVyZmFjZSB7XHJcbiAgXCJwaG9uZVwiOiBzdHJpbmc7XHJcbiAgXCJ2ZXJpZmljYXRpb25Db2RlXCI6IHN0cmluZztcclxuICBcImlkXCI/OiBhbnk7XHJcbiAgXCJjcmVhdGVkQXRcIj86IERhdGU7XHJcbiAgXCJ1cGRhdGVkQXRcIj86IERhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQaG9uZVZlcmlmaWNhdGlvbiBpbXBsZW1lbnRzIFBob25lVmVyaWZpY2F0aW9uSW50ZXJmYWNlIHtcclxuICBcInBob25lXCI6IHN0cmluZztcclxuICBcInZlcmlmaWNhdGlvbkNvZGVcIjogc3RyaW5nO1xyXG4gIFwiaWRcIjogYW55O1xyXG4gIFwiY3JlYXRlZEF0XCI6IERhdGU7XHJcbiAgXCJ1cGRhdGVkQXRcIjogRGF0ZTtcclxuICBjb25zdHJ1Y3RvcihkYXRhPzogUGhvbmVWZXJpZmljYXRpb25JbnRlcmZhY2UpIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcclxuICAgKiBpLmUuIGBQaG9uZVZlcmlmaWNhdGlvbmAuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XHJcbiAgICByZXR1cm4gXCJQaG9uZVZlcmlmaWNhdGlvblwiO1xyXG4gIH1cclxuICAvKipcclxuICAqIEBtZXRob2QgZmFjdG9yeVxyXG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xyXG4gICogQGxpY2Vuc2UgTUlUXHJcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIFBob25lVmVyaWZpY2F0aW9uIGZvciBkeW5hbWljIHB1cnBvc2VzLlxyXG4gICoqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBQaG9uZVZlcmlmaWNhdGlvbkludGVyZmFjZSk6IFBob25lVmVyaWZpY2F0aW9ue1xyXG4gICAgcmV0dXJuIG5ldyBQaG9uZVZlcmlmaWNhdGlvbihkYXRhKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxyXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cclxuICAqIEBsaWNlbnNlIE1JVFxyXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXHJcbiAgKiBkZWZpbml0aW9ucy5cclxuICAqKi9cclxuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6ICdQaG9uZVZlcmlmaWNhdGlvbicsXHJcbiAgICAgIHBsdXJhbDogJ1Bob25lVmVyaWZpY2F0aW9ucycsXHJcbiAgICAgIHBhdGg6ICdQaG9uZVZlcmlmaWNhdGlvbnMnLFxyXG4gICAgICBpZE5hbWU6ICdpZCcsXHJcbiAgICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBcInBob25lXCI6IHtcclxuICAgICAgICAgIG5hbWU6ICdwaG9uZScsXHJcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ2ZXJpZmljYXRpb25Db2RlXCI6IHtcclxuICAgICAgICAgIG5hbWU6ICd2ZXJpZmljYXRpb25Db2RlJyxcclxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImlkXCI6IHtcclxuICAgICAgICAgIG5hbWU6ICdpZCcsXHJcbiAgICAgICAgICB0eXBlOiAnYW55J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJjcmVhdGVkQXRcIjoge1xyXG4gICAgICAgICAgbmFtZTogJ2NyZWF0ZWRBdCcsXHJcbiAgICAgICAgICB0eXBlOiAnRGF0ZSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidXBkYXRlZEF0XCI6IHtcclxuICAgICAgICAgIG5hbWU6ICd1cGRhdGVkQXQnLFxyXG4gICAgICAgICAgdHlwZTogJ0RhdGUnXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgcmVsYXRpb25zOiB7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19