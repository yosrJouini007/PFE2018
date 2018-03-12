"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
var User = (function () {
    function User(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `User`.
     */
    User.getModelName = function () {
        return "User";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of User for dynamic purposes.
    **/
    User.factory = function (data) {
        return new User(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    User.getModelDefinition = function () {
        return {
            name: 'User',
            plural: 'Users',
            path: 'Users',
            idName: 'id',
            properties: {
                "realm": {
                    name: 'realm',
                    type: 'string'
                },
                "username": {
                    name: 'username',
                    type: 'string'
                },
                "email": {
                    name: 'email',
                    type: 'string'
                },
                "emailVerified": {
                    name: 'emailVerified',
                    type: 'boolean'
                },
                "id": {
                    name: 'id',
                    type: 'any'
                },
                "password": {
                    name: 'password',
                    type: 'string'
                },
            },
            relations: {
                accessTokens: {
                    name: 'accessTokens',
                    type: 'any[]',
                    model: '',
                    relationType: 'hasMany',
                    keyFrom: 'id',
                    keyTo: 'userId'
                },
            }
        };
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjs7QUFhcEI7SUFRRSxjQUFZLElBQW9CO1FBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDVyxpQkFBWSxHQUExQjtRQUNFLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1csWUFBTyxHQUFyQixVQUFzQixJQUFtQjtRQUN2QyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLHVCQUFrQixHQUFoQztRQUNFLE1BQU0sQ0FBQztZQUNMLElBQUksRUFBRSxNQUFNO1lBQ1osTUFBTSxFQUFFLE9BQU87WUFDZixJQUFJLEVBQUUsT0FBTztZQUNiLE1BQU0sRUFBRSxJQUFJO1lBQ1osVUFBVSxFQUFFO2dCQUNWLE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxVQUFVLEVBQUU7b0JBQ1YsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLElBQUksRUFBRSxTQUFTO2lCQUNoQjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLElBQUk7b0JBQ1YsSUFBSSxFQUFFLEtBQUs7aUJBQ1o7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsU0FBUyxFQUFFO2dCQUNULFlBQVksRUFBRTtvQkFDWixJQUFJLEVBQUUsY0FBYztvQkFDcEIsSUFBSSxFQUFFLE9BQU87b0JBQ2IsS0FBSyxFQUFFLEVBQUU7b0JBQ1QsWUFBWSxFQUFFLFNBQVM7b0JBQ2YsT0FBTyxFQUFFLElBQUk7b0JBQ3JCLEtBQUssRUFBRSxRQUFRO2lCQUNoQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FBQyxBQTlFRCxJQThFQztBQTlFWSxvQkFBSSIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXHJcblxyXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcclxuZXhwb3J0IGludGVyZmFjZSBVc2VySW50ZXJmYWNlIHtcclxuICBcInJlYWxtXCI/OiBzdHJpbmc7XHJcbiAgXCJ1c2VybmFtZVwiPzogc3RyaW5nO1xyXG4gIFwiZW1haWxcIj86IHN0cmluZztcclxuICBcImVtYWlsVmVyaWZpZWRcIj86IGJvb2xlYW47XHJcbiAgXCJpZFwiPzogYW55O1xyXG4gIFwicGFzc3dvcmRcIj86IHN0cmluZztcclxuICBhY2Nlc3NUb2tlbnM/OiBhbnlbXTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFVzZXIgaW1wbGVtZW50cyBVc2VySW50ZXJmYWNlIHtcclxuICBcInJlYWxtXCI6IHN0cmluZztcclxuICBcInVzZXJuYW1lXCI6IHN0cmluZztcclxuICBcImVtYWlsXCI6IHN0cmluZztcclxuICBcImVtYWlsVmVyaWZpZWRcIjogYm9vbGVhbjtcclxuICBcImlkXCI6IGFueTtcclxuICBcInBhc3N3b3JkXCI6IHN0cmluZztcclxuICBhY2Nlc3NUb2tlbnM6IGFueVtdO1xyXG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBVc2VySW50ZXJmYWNlKSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXHJcbiAgICogaS5lLiBgVXNlcmAuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XHJcbiAgICByZXR1cm4gXCJVc2VyXCI7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICogQG1ldGhvZCBmYWN0b3J5XHJcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXHJcbiAgKiBAbGljZW5zZSBNSVRcclxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgVXNlciBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cclxuICAqKi9cclxuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogVXNlckludGVyZmFjZSk6IFVzZXJ7XHJcbiAgICByZXR1cm4gbmV3IFVzZXIoZGF0YSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cclxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXHJcbiAgKiBAbGljZW5zZSBNSVRcclxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxyXG4gICogZGVmaW5pdGlvbnMuXHJcbiAgKiovXHJcbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiAnVXNlcicsXHJcbiAgICAgIHBsdXJhbDogJ1VzZXJzJyxcclxuICAgICAgcGF0aDogJ1VzZXJzJyxcclxuICAgICAgaWROYW1lOiAnaWQnLFxyXG4gICAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgXCJyZWFsbVwiOiB7XHJcbiAgICAgICAgICBuYW1lOiAncmVhbG0nLFxyXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidXNlcm5hbWVcIjoge1xyXG4gICAgICAgICAgbmFtZTogJ3VzZXJuYW1lJyxcclxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImVtYWlsXCI6IHtcclxuICAgICAgICAgIG5hbWU6ICdlbWFpbCcsXHJcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJlbWFpbFZlcmlmaWVkXCI6IHtcclxuICAgICAgICAgIG5hbWU6ICdlbWFpbFZlcmlmaWVkJyxcclxuICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJpZFwiOiB7XHJcbiAgICAgICAgICBuYW1lOiAnaWQnLFxyXG4gICAgICAgICAgdHlwZTogJ2FueSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGFzc3dvcmRcIjoge1xyXG4gICAgICAgICAgbmFtZTogJ3Bhc3N3b3JkJyxcclxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgcmVsYXRpb25zOiB7XHJcbiAgICAgICAgYWNjZXNzVG9rZW5zOiB7XHJcbiAgICAgICAgICBuYW1lOiAnYWNjZXNzVG9rZW5zJyxcclxuICAgICAgICAgIHR5cGU6ICdhbnlbXScsXHJcbiAgICAgICAgICBtb2RlbDogJycsXHJcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcclxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ2lkJyxcclxuICAgICAgICAgIGtleVRvOiAndXNlcklkJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19