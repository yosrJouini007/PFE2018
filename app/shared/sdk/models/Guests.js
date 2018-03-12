"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
var Guests = (function () {
    function Guests(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Guests`.
     */
    Guests.getModelName = function () {
        return "Guests";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Guests for dynamic purposes.
    **/
    Guests.factory = function (data) {
        return new Guests(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    Guests.getModelDefinition = function () {
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
            relations: {}
        };
    };
    return Guests;
}());
exports.Guests = Guests;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3Vlc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR3Vlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7O0FBZ0JwQjtJQVdFLGdCQUFZLElBQXNCO1FBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDVyxtQkFBWSxHQUExQjtRQUNFLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1csY0FBTyxHQUFyQixVQUFzQixJQUFxQjtRQUN6QyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLHlCQUFrQixHQUFoQztRQUNFLE1BQU0sQ0FBQztZQUNMLElBQUksRUFBRSxRQUFRO1lBQ2QsTUFBTSxFQUFFLFFBQVE7WUFDaEIsSUFBSSxFQUFFLFFBQVE7WUFDZCxNQUFNLEVBQUUsSUFBSTtZQUNaLFVBQVUsRUFBRTtnQkFDVixNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFLE1BQU07b0JBQ1osSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsaUJBQWlCLEVBQUU7b0JBQ2pCLElBQUksRUFBRSxpQkFBaUI7b0JBQ3ZCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsSUFBSTtvQkFDVixJQUFJLEVBQUUsS0FBSztpQkFDWjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxNQUFNO2lCQUNiO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLE1BQU07aUJBQ2I7YUFDRjtZQUNELFNBQVMsRUFBRSxFQUNWO1NBQ0YsQ0FBQTtJQUNILENBQUM7SUFDSCxhQUFDO0FBQUQsQ0FBQyxBQXpGRCxJQXlGQztBQXpGWSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXHJcblxyXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcclxuZXhwb3J0IGludGVyZmFjZSBHdWVzdHNJbnRlcmZhY2Uge1xyXG4gIFwibmFtZVwiOiBzdHJpbmc7XHJcbiAgXCJsYXN0bmFtZVwiOiBzdHJpbmc7XHJcbiAgXCJwaG9uZVwiPzogc3RyaW5nO1xyXG4gIFwic3RyaXBlX2N1c3RvbWVyXCI/OiBzdHJpbmc7XHJcbiAgXCJlbWFpbFwiPzogc3RyaW5nO1xyXG4gIFwiYWRkcmVzc1wiPzogc3RyaW5nO1xyXG4gIFwidXNlcmlkXCI/OiBzdHJpbmc7XHJcbiAgXCJpZFwiPzogYW55O1xyXG4gIFwiY3JlYXRlZEF0XCI/OiBEYXRlO1xyXG4gIFwidXBkYXRlZEF0XCI/OiBEYXRlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR3Vlc3RzIGltcGxlbWVudHMgR3Vlc3RzSW50ZXJmYWNlIHtcclxuICBcIm5hbWVcIjogc3RyaW5nO1xyXG4gIFwibGFzdG5hbWVcIjogc3RyaW5nO1xyXG4gIFwicGhvbmVcIjogc3RyaW5nO1xyXG4gIFwic3RyaXBlX2N1c3RvbWVyXCI6IHN0cmluZztcclxuICBcImVtYWlsXCI6IHN0cmluZztcclxuICBcImFkZHJlc3NcIjogc3RyaW5nO1xyXG4gIFwidXNlcmlkXCI6IHN0cmluZztcclxuICBcImlkXCI6IGFueTtcclxuICBcImNyZWF0ZWRBdFwiOiBEYXRlO1xyXG4gIFwidXBkYXRlZEF0XCI6IERhdGU7XHJcbiAgY29uc3RydWN0b3IoZGF0YT86IEd1ZXN0c0ludGVyZmFjZSkge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxyXG4gICAqIGkuZS4gYEd1ZXN0c2AuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XHJcbiAgICByZXR1cm4gXCJHdWVzdHNcIjtcclxuICB9XHJcbiAgLyoqXHJcbiAgKiBAbWV0aG9kIGZhY3RvcnlcclxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcclxuICAqIEBsaWNlbnNlIE1JVFxyXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBHdWVzdHMgZm9yIGR5bmFtaWMgcHVycG9zZXMuXHJcbiAgKiovXHJcbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IEd1ZXN0c0ludGVyZmFjZSk6IEd1ZXN0c3tcclxuICAgIHJldHVybiBuZXcgR3Vlc3RzKGRhdGEpO1xyXG4gIH1cclxuICAvKipcclxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXHJcbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxyXG4gICogQGxpY2Vuc2UgTUlUXHJcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcclxuICAqIGRlZmluaXRpb25zLlxyXG4gICoqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZTogJ0d1ZXN0cycsXHJcbiAgICAgIHBsdXJhbDogJ0d1ZXN0cycsXHJcbiAgICAgIHBhdGg6ICdHdWVzdHMnLFxyXG4gICAgICBpZE5hbWU6ICdpZCcsXHJcbiAgICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBcIm5hbWVcIjoge1xyXG4gICAgICAgICAgbmFtZTogJ25hbWUnLFxyXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibGFzdG5hbWVcIjoge1xyXG4gICAgICAgICAgbmFtZTogJ2xhc3RuYW1lJyxcclxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInBob25lXCI6IHtcclxuICAgICAgICAgIG5hbWU6ICdwaG9uZScsXHJcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJzdHJpcGVfY3VzdG9tZXJcIjoge1xyXG4gICAgICAgICAgbmFtZTogJ3N0cmlwZV9jdXN0b21lcicsXHJcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJlbWFpbFwiOiB7XHJcbiAgICAgICAgICBuYW1lOiAnZW1haWwnLFxyXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYWRkcmVzc1wiOiB7XHJcbiAgICAgICAgICBuYW1lOiAnYWRkcmVzcycsXHJcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ1c2VyaWRcIjoge1xyXG4gICAgICAgICAgbmFtZTogJ3VzZXJpZCcsXHJcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJpZFwiOiB7XHJcbiAgICAgICAgICBuYW1lOiAnaWQnLFxyXG4gICAgICAgICAgdHlwZTogJ2FueSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiY3JlYXRlZEF0XCI6IHtcclxuICAgICAgICAgIG5hbWU6ICdjcmVhdGVkQXQnLFxyXG4gICAgICAgICAgdHlwZTogJ0RhdGUnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInVwZGF0ZWRBdFwiOiB7XHJcbiAgICAgICAgICBuYW1lOiAndXBkYXRlZEF0JyxcclxuICAgICAgICAgIHR5cGU6ICdEYXRlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlbGF0aW9uczoge1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==