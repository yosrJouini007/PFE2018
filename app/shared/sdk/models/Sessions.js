"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sessions = (function () {
    function Sessions(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Sessions`.
     */
    Sessions.getModelName = function () {
        return "Sessions";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Sessions for dynamic purposes.
    **/
    Sessions.factory = function (data) {
        return new Sessions(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    Sessions.getModelDefinition = function () {
        return {
            name: 'Sessions',
            plural: 'Sessions',
            path: 'Sessions',
            idName: 'id',
            properties: {
                "startAt": {
                    name: 'startAt',
                    type: 'Date'
                },
                "endAt": {
                    name: 'endAt',
                    type: 'string'
                },
                "duration": {
                    name: 'duration',
                    type: 'string'
                },
                "sessionPrice": {
                    name: 'sessionPrice',
                    type: 'string'
                },
                "price": {
                    name: 'price',
                    type: 'string'
                },
                "guestId": {
                    name: 'guestId',
                    type: 'any'
                },
                "gymId": {
                    name: 'gymId',
                    type: 'any'
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
                gym: {
                    name: 'gym',
                    type: 'Gyms',
                    model: 'Gyms',
                    relationType: 'belongsTo',
                    keyFrom: 'gymId',
                    keyTo: 'id'
                },
                guest: {
                    name: 'guest',
                    type: 'Guests',
                    model: 'Guests',
                    relationType: 'belongsTo',
                    keyFrom: 'guestId',
                    keyTo: 'id'
                },
            }
        };
    };
    return Sessions;
}());
exports.Sessions = Sessions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTZXNzaW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQXNCQTtJQWFFLGtCQUFZLElBQXdCO1FBQ2xDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDVyxxQkFBWSxHQUExQjtRQUNFLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1csZ0JBQU8sR0FBckIsVUFBc0IsSUFBdUI7UUFDM0MsTUFBTSxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDVywyQkFBa0IsR0FBaEM7UUFDRSxNQUFNLENBQUM7WUFDTCxJQUFJLEVBQUUsVUFBVTtZQUNoQixNQUFNLEVBQUUsVUFBVTtZQUNsQixJQUFJLEVBQUUsVUFBVTtZQUNoQixNQUFNLEVBQUUsSUFBSTtZQUNaLFVBQVUsRUFBRTtnQkFDVixTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLE1BQU07aUJBQ2I7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsY0FBYyxFQUFFO29CQUNkLElBQUksRUFBRSxjQUFjO29CQUNwQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxTQUFTO29CQUNmLElBQUksRUFBRSxLQUFLO2lCQUNaO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsS0FBSztpQkFDWjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLElBQUk7b0JBQ1YsSUFBSSxFQUFFLEtBQUs7aUJBQ1o7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsTUFBTTtpQkFDYjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxNQUFNO2lCQUNiO2FBQ0Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsR0FBRyxFQUFFO29CQUNILElBQUksRUFBRSxLQUFLO29CQUNYLElBQUksRUFBRSxNQUFNO29CQUNaLEtBQUssRUFBRSxNQUFNO29CQUNiLFlBQVksRUFBRSxXQUFXO29CQUNqQixPQUFPLEVBQUUsT0FBTztvQkFDeEIsS0FBSyxFQUFFLElBQUk7aUJBQ1o7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxRQUFRO29CQUNkLEtBQUssRUFBRSxRQUFRO29CQUNmLFlBQVksRUFBRSxXQUFXO29CQUNqQixPQUFPLEVBQUUsU0FBUztvQkFDMUIsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0gsZUFBQztBQUFELENBQUMsQUEzR0QsSUEyR0M7QUEzR1ksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG5pbXBvcnQge1xyXG4gIEd5bXMsXHJcbiAgR3Vlc3RzXHJcbn0gZnJvbSAnLi4vaW5kZXgnO1xyXG5cclxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XHJcbmV4cG9ydCBpbnRlcmZhY2UgU2Vzc2lvbnNJbnRlcmZhY2Uge1xyXG4gIFwic3RhcnRBdFwiOiBEYXRlO1xyXG4gIFwiZW5kQXRcIj86IHN0cmluZztcclxuICBcImR1cmF0aW9uXCI/OiBzdHJpbmc7XHJcbiAgXCJzZXNzaW9uUHJpY2VcIj86IHN0cmluZztcclxuICBcInByaWNlXCI/OiBzdHJpbmc7XHJcbiAgXCJndWVzdElkXCI6IGFueTtcclxuICBcImd5bUlkXCI6IGFueTtcclxuICBcImlkXCI/OiBhbnk7XHJcbiAgXCJjcmVhdGVkQXRcIj86IERhdGU7XHJcbiAgXCJ1cGRhdGVkQXRcIj86IERhdGU7XHJcbiAgZ3ltPzogR3ltcztcclxuICBndWVzdD86IEd1ZXN0cztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNlc3Npb25zIGltcGxlbWVudHMgU2Vzc2lvbnNJbnRlcmZhY2Uge1xyXG4gIFwic3RhcnRBdFwiOiBEYXRlO1xyXG4gIFwiZW5kQXRcIjogc3RyaW5nO1xyXG4gIFwiZHVyYXRpb25cIjogc3RyaW5nO1xyXG4gIFwic2Vzc2lvblByaWNlXCI6IHN0cmluZztcclxuICBcInByaWNlXCI6IHN0cmluZztcclxuICBcImd1ZXN0SWRcIjogYW55O1xyXG4gIFwiZ3ltSWRcIjogYW55O1xyXG4gIFwiaWRcIjogYW55O1xyXG4gIFwiY3JlYXRlZEF0XCI6IERhdGU7XHJcbiAgXCJ1cGRhdGVkQXRcIjogRGF0ZTtcclxuICBneW06IEd5bXM7XHJcbiAgZ3Vlc3Q6IEd1ZXN0cztcclxuICBjb25zdHJ1Y3RvcihkYXRhPzogU2Vzc2lvbnNJbnRlcmZhY2UpIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcclxuICAgKiBpLmUuIGBTZXNzaW9uc2AuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XHJcbiAgICByZXR1cm4gXCJTZXNzaW9uc1wiO1xyXG4gIH1cclxuICAvKipcclxuICAqIEBtZXRob2QgZmFjdG9yeVxyXG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xyXG4gICogQGxpY2Vuc2UgTUlUXHJcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNlc3Npb25zIGZvciBkeW5hbWljIHB1cnBvc2VzLlxyXG4gICoqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBTZXNzaW9uc0ludGVyZmFjZSk6IFNlc3Npb25ze1xyXG4gICAgcmV0dXJuIG5ldyBTZXNzaW9ucyhkYXRhKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxyXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cclxuICAqIEBsaWNlbnNlIE1JVFxyXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXHJcbiAgKiBkZWZpbml0aW9ucy5cclxuICAqKi9cclxuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6ICdTZXNzaW9ucycsXHJcbiAgICAgIHBsdXJhbDogJ1Nlc3Npb25zJyxcclxuICAgICAgcGF0aDogJ1Nlc3Npb25zJyxcclxuICAgICAgaWROYW1lOiAnaWQnLFxyXG4gICAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgXCJzdGFydEF0XCI6IHtcclxuICAgICAgICAgIG5hbWU6ICdzdGFydEF0JyxcclxuICAgICAgICAgIHR5cGU6ICdEYXRlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJlbmRBdFwiOiB7XHJcbiAgICAgICAgICBuYW1lOiAnZW5kQXQnLFxyXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZHVyYXRpb25cIjoge1xyXG4gICAgICAgICAgbmFtZTogJ2R1cmF0aW9uJyxcclxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInNlc3Npb25QcmljZVwiOiB7XHJcbiAgICAgICAgICBuYW1lOiAnc2Vzc2lvblByaWNlJyxcclxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInByaWNlXCI6IHtcclxuICAgICAgICAgIG5hbWU6ICdwcmljZScsXHJcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJndWVzdElkXCI6IHtcclxuICAgICAgICAgIG5hbWU6ICdndWVzdElkJyxcclxuICAgICAgICAgIHR5cGU6ICdhbnknXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImd5bUlkXCI6IHtcclxuICAgICAgICAgIG5hbWU6ICdneW1JZCcsXHJcbiAgICAgICAgICB0eXBlOiAnYW55J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJpZFwiOiB7XHJcbiAgICAgICAgICBuYW1lOiAnaWQnLFxyXG4gICAgICAgICAgdHlwZTogJ2FueSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiY3JlYXRlZEF0XCI6IHtcclxuICAgICAgICAgIG5hbWU6ICdjcmVhdGVkQXQnLFxyXG4gICAgICAgICAgdHlwZTogJ0RhdGUnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInVwZGF0ZWRBdFwiOiB7XHJcbiAgICAgICAgICBuYW1lOiAndXBkYXRlZEF0JyxcclxuICAgICAgICAgIHR5cGU6ICdEYXRlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlbGF0aW9uczoge1xyXG4gICAgICAgIGd5bToge1xyXG4gICAgICAgICAgbmFtZTogJ2d5bScsXHJcbiAgICAgICAgICB0eXBlOiAnR3ltcycsXHJcbiAgICAgICAgICBtb2RlbDogJ0d5bXMnLFxyXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcclxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ2d5bUlkJyxcclxuICAgICAgICAgIGtleVRvOiAnaWQnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBndWVzdDoge1xyXG4gICAgICAgICAgbmFtZTogJ2d1ZXN0JyxcclxuICAgICAgICAgIHR5cGU6ICdHdWVzdHMnLFxyXG4gICAgICAgICAgbW9kZWw6ICdHdWVzdHMnLFxyXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcclxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ2d1ZXN0SWQnLFxyXG4gICAgICAgICAga2V5VG86ICdpZCdcclxuICAgICAgICB9LFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==