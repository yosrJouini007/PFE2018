"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
var Container = (function () {
    function Container(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Container`.
     */
    Container.getModelName = function () {
        return "Container";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Container for dynamic purposes.
    **/
    Container.factory = function (data) {
        return new Container(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    Container.getModelDefinition = function () {
        return {
            name: 'Container',
            plural: 'Containers',
            path: 'Containers',
            idName: 'id',
            properties: {
                "id": {
                    name: 'id',
                    type: 'number'
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
    return Container;
}());
exports.Container = Container;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7O0FBU3BCO0lBSUUsbUJBQVksSUFBeUI7UUFDbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNXLHNCQUFZLEdBQTFCO1FBQ0UsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDVyxpQkFBTyxHQUFyQixVQUFzQixJQUF3QjtRQUM1QyxNQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLDRCQUFrQixHQUFoQztRQUNFLE1BQU0sQ0FBQztZQUNMLElBQUksRUFBRSxXQUFXO1lBQ2pCLE1BQU0sRUFBRSxZQUFZO1lBQ3BCLElBQUksRUFBRSxZQUFZO1lBQ2xCLE1BQU0sRUFBRSxJQUFJO1lBQ1osVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsSUFBSTtvQkFDVixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxNQUFNO2lCQUNiO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLE1BQU07aUJBQ2I7YUFDRjtZQUNELFNBQVMsRUFBRSxFQUNWO1NBQ0YsQ0FBQTtJQUNILENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUF0REQsSUFzREM7QUF0RFksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG5cclxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29udGFpbmVySW50ZXJmYWNlIHtcclxuICBcImlkXCI/OiBudW1iZXI7XHJcbiAgXCJjcmVhdGVkQXRcIj86IERhdGU7XHJcbiAgXCJ1cGRhdGVkQXRcIj86IERhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDb250YWluZXIgaW1wbGVtZW50cyBDb250YWluZXJJbnRlcmZhY2Uge1xyXG4gIFwiaWRcIjogbnVtYmVyO1xyXG4gIFwiY3JlYXRlZEF0XCI6IERhdGU7XHJcbiAgXCJ1cGRhdGVkQXRcIjogRGF0ZTtcclxuICBjb25zdHJ1Y3RvcihkYXRhPzogQ29udGFpbmVySW50ZXJmYWNlKSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXHJcbiAgICogaS5lLiBgQ29udGFpbmVyYC5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcclxuICAgIHJldHVybiBcIkNvbnRhaW5lclwiO1xyXG4gIH1cclxuICAvKipcclxuICAqIEBtZXRob2QgZmFjdG9yeVxyXG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xyXG4gICogQGxpY2Vuc2UgTUlUXHJcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIENvbnRhaW5lciBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cclxuICAqKi9cclxuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogQ29udGFpbmVySW50ZXJmYWNlKTogQ29udGFpbmVye1xyXG4gICAgcmV0dXJuIG5ldyBDb250YWluZXIoZGF0YSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cclxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXHJcbiAgKiBAbGljZW5zZSBNSVRcclxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxyXG4gICogZGVmaW5pdGlvbnMuXHJcbiAgKiovXHJcbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiAnQ29udGFpbmVyJyxcclxuICAgICAgcGx1cmFsOiAnQ29udGFpbmVycycsXHJcbiAgICAgIHBhdGg6ICdDb250YWluZXJzJyxcclxuICAgICAgaWROYW1lOiAnaWQnLFxyXG4gICAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgXCJpZFwiOiB7XHJcbiAgICAgICAgICBuYW1lOiAnaWQnLFxyXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiY3JlYXRlZEF0XCI6IHtcclxuICAgICAgICAgIG5hbWU6ICdjcmVhdGVkQXQnLFxyXG4gICAgICAgICAgdHlwZTogJ0RhdGUnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInVwZGF0ZWRBdFwiOiB7XHJcbiAgICAgICAgICBuYW1lOiAndXBkYXRlZEF0JyxcclxuICAgICAgICAgIHR5cGU6ICdEYXRlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlbGF0aW9uczoge1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==