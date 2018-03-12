"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gyms = (function () {
    function Gyms(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Gyms`.
     */
    Gyms.getModelName = function () {
        return "Gyms";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Gyms for dynamic purposes.
    **/
    Gyms.factory = function (data) {
        return new Gyms(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    Gyms.getModelDefinition = function () {
        return {
            name: 'Gyms',
            plural: 'Gyms',
            path: 'Gyms',
            idName: 'id',
            properties: {
                "name": {
                    name: 'name',
                    type: 'string'
                },
                "description": {
                    name: 'description',
                    type: 'string'
                },
                "right": {
                    name: 'right',
                    type: 'string'
                },
                "location": {
                    name: 'location',
                    type: 'GeoPoint'
                },
                "disponibility": {
                    name: 'disponibility',
                    type: 'any'
                },
                "cover": {
                    name: 'cover',
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
    return Gyms;
}());
exports.Gyms = Gyms;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3ltcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkd5bXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFrQkE7SUFVRSxjQUFZLElBQW9CO1FBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDVyxpQkFBWSxHQUExQjtRQUNFLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1csWUFBTyxHQUFyQixVQUFzQixJQUFtQjtRQUN2QyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLHVCQUFrQixHQUFoQztRQUNFLE1BQU0sQ0FBQztZQUNMLElBQUksRUFBRSxNQUFNO1lBQ1osTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUUsTUFBTTtZQUNaLE1BQU0sRUFBRSxJQUFJO1lBQ1osVUFBVSxFQUFFO2dCQUNWLE1BQU0sRUFBRTtvQkFDTixJQUFJLEVBQUUsTUFBTTtvQkFDWixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxhQUFhLEVBQUU7b0JBQ2IsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxVQUFVLEVBQUU7b0JBQ1YsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxVQUFVO2lCQUNqQjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLElBQUksRUFBRSxLQUFLO2lCQUNaO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLElBQUk7b0JBQ1YsSUFBSSxFQUFFLEtBQUs7aUJBQ1o7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsTUFBTTtpQkFDYjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxNQUFNO2lCQUNiO2FBQ0Y7WUFDRCxTQUFTLEVBQUUsRUFDVjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0gsV0FBQztBQUFELENBQUMsQUFwRkQsSUFvRkM7QUFwRlksb0JBQUkiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG5pbXBvcnQge1xyXG4gIEdlb1BvaW50XHJcbn0gZnJvbSAnLi4vaW5kZXgnO1xyXG5cclxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XHJcbmV4cG9ydCBpbnRlcmZhY2UgR3ltc0ludGVyZmFjZSB7XHJcbiAgXCJuYW1lXCI6IHN0cmluZztcclxuICBcImRlc2NyaXB0aW9uXCI6IHN0cmluZztcclxuICBcInJpZ2h0XCI6IHN0cmluZztcclxuICBcImxvY2F0aW9uXCI/OiBHZW9Qb2ludDtcclxuICBcImRpc3BvbmliaWxpdHlcIj86IGFueTtcclxuICBcImNvdmVyXCI/OiBzdHJpbmc7XHJcbiAgXCJpZFwiPzogYW55O1xyXG4gIFwiY3JlYXRlZEF0XCI/OiBEYXRlO1xyXG4gIFwidXBkYXRlZEF0XCI/OiBEYXRlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR3ltcyBpbXBsZW1lbnRzIEd5bXNJbnRlcmZhY2Uge1xyXG4gIFwibmFtZVwiOiBzdHJpbmc7XHJcbiAgXCJkZXNjcmlwdGlvblwiOiBzdHJpbmc7XHJcbiAgXCJyaWdodFwiOiBzdHJpbmc7XHJcbiAgXCJsb2NhdGlvblwiOiBHZW9Qb2ludDtcclxuICBcImRpc3BvbmliaWxpdHlcIjogYW55O1xyXG4gIFwiY292ZXJcIjogc3RyaW5nO1xyXG4gIFwiaWRcIjogYW55O1xyXG4gIFwiY3JlYXRlZEF0XCI6IERhdGU7XHJcbiAgXCJ1cGRhdGVkQXRcIjogRGF0ZTtcclxuICBjb25zdHJ1Y3RvcihkYXRhPzogR3ltc0ludGVyZmFjZSkge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxyXG4gICAqIGkuZS4gYEd5bXNgLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xyXG4gICAgcmV0dXJuIFwiR3ltc1wiO1xyXG4gIH1cclxuICAvKipcclxuICAqIEBtZXRob2QgZmFjdG9yeVxyXG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xyXG4gICogQGxpY2Vuc2UgTUlUXHJcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIEd5bXMgZm9yIGR5bmFtaWMgcHVycG9zZXMuXHJcbiAgKiovXHJcbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IEd5bXNJbnRlcmZhY2UpOiBHeW1ze1xyXG4gICAgcmV0dXJuIG5ldyBHeW1zKGRhdGEpO1xyXG4gIH1cclxuICAvKipcclxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXHJcbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxyXG4gICogQGxpY2Vuc2UgTUlUXHJcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcclxuICAqIGRlZmluaXRpb25zLlxyXG4gICoqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZTogJ0d5bXMnLFxyXG4gICAgICBwbHVyYWw6ICdHeW1zJyxcclxuICAgICAgcGF0aDogJ0d5bXMnLFxyXG4gICAgICBpZE5hbWU6ICdpZCcsXHJcbiAgICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBcIm5hbWVcIjoge1xyXG4gICAgICAgICAgbmFtZTogJ25hbWUnLFxyXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjoge1xyXG4gICAgICAgICAgbmFtZTogJ2Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInJpZ2h0XCI6IHtcclxuICAgICAgICAgIG5hbWU6ICdyaWdodCcsXHJcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJsb2NhdGlvblwiOiB7XHJcbiAgICAgICAgICBuYW1lOiAnbG9jYXRpb24nLFxyXG4gICAgICAgICAgdHlwZTogJ0dlb1BvaW50J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJkaXNwb25pYmlsaXR5XCI6IHtcclxuICAgICAgICAgIG5hbWU6ICdkaXNwb25pYmlsaXR5JyxcclxuICAgICAgICAgIHR5cGU6ICdhbnknXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImNvdmVyXCI6IHtcclxuICAgICAgICAgIG5hbWU6ICdjb3ZlcicsXHJcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJpZFwiOiB7XHJcbiAgICAgICAgICBuYW1lOiAnaWQnLFxyXG4gICAgICAgICAgdHlwZTogJ2FueSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiY3JlYXRlZEF0XCI6IHtcclxuICAgICAgICAgIG5hbWU6ICdjcmVhdGVkQXQnLFxyXG4gICAgICAgICAgdHlwZTogJ0RhdGUnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInVwZGF0ZWRBdFwiOiB7XHJcbiAgICAgICAgICBuYW1lOiAndXBkYXRlZEF0JyxcclxuICAgICAgICAgIHR5cGU6ICdEYXRlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlbGF0aW9uczoge1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==