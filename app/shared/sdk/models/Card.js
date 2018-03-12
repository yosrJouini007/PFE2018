"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
var Card = (function () {
    function Card(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Card`.
     */
    Card.getModelName = function () {
        return "Card";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Card for dynamic purposes.
    **/
    Card.factory = function (data) {
        return new Card(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    Card.getModelDefinition = function () {
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
            relations: {}
        };
    };
    return Card;
}());
exports.Card = Card;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjs7QUFVcEI7SUFLRSxjQUFZLElBQW9CO1FBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDVyxpQkFBWSxHQUExQjtRQUNFLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1csWUFBTyxHQUFyQixVQUFzQixJQUFtQjtRQUN2QyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLHVCQUFrQixHQUFoQztRQUNFLE1BQU0sQ0FBQztZQUNMLElBQUksRUFBRSxNQUFNO1lBQ1osTUFBTSxFQUFFLE9BQU87WUFDZixJQUFJLEVBQUUsT0FBTztZQUNiLE1BQU0sRUFBRSxJQUFJO1lBQ1osVUFBVSxFQUFFO2dCQUNWLFNBQVMsRUFBRTtvQkFDVCxJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLElBQUk7b0JBQ1YsSUFBSSxFQUFFLEtBQUs7aUJBQ1o7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsTUFBTTtpQkFDYjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxNQUFNO2lCQUNiO2FBQ0Y7WUFDRCxTQUFTLEVBQUUsRUFDVjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0gsV0FBQztBQUFELENBQUMsQUEzREQsSUEyREM7QUEzRFksb0JBQUkiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG5cclxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2FyZEludGVyZmFjZSB7XHJcbiAgXCJjYXJkX2lkXCI6IHN0cmluZztcclxuICBcImlkXCI/OiBhbnk7XHJcbiAgXCJjcmVhdGVkQXRcIj86IERhdGU7XHJcbiAgXCJ1cGRhdGVkQXRcIj86IERhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDYXJkIGltcGxlbWVudHMgQ2FyZEludGVyZmFjZSB7XHJcbiAgXCJjYXJkX2lkXCI6IHN0cmluZztcclxuICBcImlkXCI6IGFueTtcclxuICBcImNyZWF0ZWRBdFwiOiBEYXRlO1xyXG4gIFwidXBkYXRlZEF0XCI6IERhdGU7XHJcbiAgY29uc3RydWN0b3IoZGF0YT86IENhcmRJbnRlcmZhY2UpIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcclxuICAgKiBpLmUuIGBDYXJkYC5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcclxuICAgIHJldHVybiBcIkNhcmRcIjtcclxuICB9XHJcbiAgLyoqXHJcbiAgKiBAbWV0aG9kIGZhY3RvcnlcclxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcclxuICAqIEBsaWNlbnNlIE1JVFxyXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDYXJkIGZvciBkeW5hbWljIHB1cnBvc2VzLlxyXG4gICoqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBDYXJkSW50ZXJmYWNlKTogQ2FyZHtcclxuICAgIHJldHVybiBuZXcgQ2FyZChkYXRhKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxyXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cclxuICAqIEBsaWNlbnNlIE1JVFxyXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXHJcbiAgKiBkZWZpbml0aW9ucy5cclxuICAqKi9cclxuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6ICdDYXJkJyxcclxuICAgICAgcGx1cmFsOiAnQ2FyZHMnLFxyXG4gICAgICBwYXRoOiAnQ2FyZHMnLFxyXG4gICAgICBpZE5hbWU6ICdpZCcsXHJcbiAgICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBcImNhcmRfaWRcIjoge1xyXG4gICAgICAgICAgbmFtZTogJ2NhcmRfaWQnLFxyXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiaWRcIjoge1xyXG4gICAgICAgICAgbmFtZTogJ2lkJyxcclxuICAgICAgICAgIHR5cGU6ICdhbnknXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImNyZWF0ZWRBdFwiOiB7XHJcbiAgICAgICAgICBuYW1lOiAnY3JlYXRlZEF0JyxcclxuICAgICAgICAgIHR5cGU6ICdEYXRlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ1cGRhdGVkQXRcIjoge1xyXG4gICAgICAgICAgbmFtZTogJ3VwZGF0ZWRBdCcsXHJcbiAgICAgICAgICB0eXBlOiAnRGF0ZSdcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICByZWxhdGlvbnM6IHtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=