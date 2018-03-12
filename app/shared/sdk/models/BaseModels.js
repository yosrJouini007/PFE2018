"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
var AccessToken = (function () {
    function AccessToken(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `AccessToken`.
     */
    AccessToken.getModelName = function () {
        return "AccessToken";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of AccessToken for dynamic purposes.
    **/
    AccessToken.factory = function (data) {
        return new AccessToken(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    AccessToken.getModelDefinition = function () {
        return {
            name: 'AccessToken',
            plural: 'AccessTokens',
            properties: {
                "id": {
                    name: 'id',
                    type: 'string'
                },
                "ttl": {
                    name: 'ttl',
                    type: 'number',
                    default: 1209600
                },
                "scopes": {
                    name: 'scopes',
                    type: '["string"]'
                },
                "created": {
                    name: 'created',
                    type: 'Date'
                },
                "userId": {
                    name: 'userId',
                    type: 'string'
                },
            },
            relations: {
                user: {
                    name: 'user',
                    type: 'User',
                    model: 'User'
                },
            }
        };
    };
    return AccessToken;
}());
exports.AccessToken = AccessToken;
var SDKToken = (function () {
    function SDKToken(data) {
        this.id = null;
        this.ttl = null;
        this.scopes = null;
        this.created = null;
        this.userId = null;
        this.user = null;
        this.rememberMe = null;
        Object.assign(this, data);
    }
    return SDKToken;
}());
exports.SDKToken = SDKToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZU1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJhc2VNb2RlbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjs7QUF3QnBCO0lBT0UscUJBQVksSUFBMkI7UUFDckMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNXLHdCQUFZLEdBQTFCO1FBQ0UsTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUN2QixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDVyxtQkFBTyxHQUFyQixVQUFzQixJQUEwQjtRQUM5QyxNQUFNLENBQUMsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLDhCQUFrQixHQUFoQztRQUNFLE1BQU0sQ0FBQztZQUNMLElBQUksRUFBRSxhQUFhO1lBQ25CLE1BQU0sRUFBRSxjQUFjO1lBQ3RCLFVBQVUsRUFBRTtnQkFDVixJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLElBQUk7b0JBQ1YsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxLQUFLO29CQUNYLElBQUksRUFBRSxRQUFRO29CQUNkLE9BQU8sRUFBRSxPQUFPO2lCQUNqQjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLFlBQVk7aUJBQ25CO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUsTUFBTTtpQkFDYjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRTtnQkFDVCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLE1BQU07b0JBQ1osSUFBSSxFQUFFLE1BQU07b0JBQ1osS0FBSyxFQUFFLE1BQU07aUJBQ2Q7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBckVELElBcUVDO0FBckVZLGtDQUFXO0FBdUV4QjtJQVFFLGtCQUFZLElBQTJCO1FBUHZDLE9BQUUsR0FBUSxJQUFJLENBQUM7UUFDZixRQUFHLEdBQVcsSUFBSSxDQUFDO1FBQ25CLFdBQU0sR0FBUSxJQUFJLENBQUM7UUFDbkIsWUFBTyxHQUFRLElBQUksQ0FBQztRQUNwQixXQUFNLEdBQVEsSUFBSSxDQUFDO1FBQ25CLFNBQUksR0FBUSxJQUFJLENBQUM7UUFDakIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUV6QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0gsZUFBQztBQUFELENBQUMsQUFYRCxJQVdDO0FBWFksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG5cclxuXHJcblxyXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcclxuZXhwb3J0IGludGVyZmFjZSBMb29wQmFja0ZpbHRlciB7XHJcbiAgZmllbGRzPzogYW55O1xyXG4gIGluY2x1ZGU/OiBhbnk7XHJcbiAgbGltaXQ/OiBhbnk7XHJcbiAgb3JkZXI/OiBhbnk7XHJcbiAgc2tpcD86IGFueTtcclxuICBvZmZzZXQ/OiBhbnk7XHJcbiAgd2hlcmU/OiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQWNjZXNzVG9rZW5JbnRlcmZhY2Uge1xyXG4gIFwiaWRcIj86IHN0cmluZztcclxuICBcInR0bFwiPzogbnVtYmVyO1xyXG4gIFwic2NvcGVzXCI/OiBbXCJzdHJpbmdcIl07XHJcbiAgXCJjcmVhdGVkXCI/OiBEYXRlO1xyXG4gIFwidXNlcklkXCI/OiBzdHJpbmc7XHJcbiAgXCJ1c2VyXCI/OiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBY2Nlc3NUb2tlbiBpbXBsZW1lbnRzIEFjY2Vzc1Rva2VuSW50ZXJmYWNlIHtcclxuICBcImlkXCI6IHN0cmluZztcclxuICBcInR0bFwiOiBudW1iZXI7XHJcbiAgXCJzY29wZXNcIjogW1wic3RyaW5nXCJdO1xyXG4gIFwiY3JlYXRlZFwiOiBEYXRlO1xyXG4gIFwidXNlcklkXCI6IHN0cmluZztcclxuICBcInVzZXJcIjogYW55O1xyXG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBBY2Nlc3NUb2tlbkludGVyZmFjZSkge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxyXG4gICAqIGkuZS4gYEFjY2Vzc1Rva2VuYC5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcclxuICAgIHJldHVybiBcIkFjY2Vzc1Rva2VuXCI7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICogQG1ldGhvZCBmYWN0b3J5XHJcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXHJcbiAgKiBAbGljZW5zZSBNSVRcclxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQWNjZXNzVG9rZW4gZm9yIGR5bmFtaWMgcHVycG9zZXMuXHJcbiAgKiovXHJcbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IEFjY2Vzc1Rva2VuSW50ZXJmYWNlKTogQWNjZXNzVG9rZW57XHJcbiAgICByZXR1cm4gbmV3IEFjY2Vzc1Rva2VuKGRhdGEpO1xyXG4gIH0gIFxyXG4gIC8qKlxyXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cclxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXHJcbiAgKiBAbGljZW5zZSBNSVRcclxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxyXG4gICogZGVmaW5pdGlvbnMuXHJcbiAgKiovXHJcbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiAnQWNjZXNzVG9rZW4nLFxyXG4gICAgICBwbHVyYWw6ICdBY2Nlc3NUb2tlbnMnLFxyXG4gICAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgXCJpZFwiOiB7XHJcbiAgICAgICAgICBuYW1lOiAnaWQnLFxyXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidHRsXCI6IHtcclxuICAgICAgICAgIG5hbWU6ICd0dGwnLFxyXG4gICAgICAgICAgdHlwZTogJ251bWJlcicsXHJcbiAgICAgICAgICBkZWZhdWx0OiAxMjA5NjAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInNjb3Blc1wiOiB7XHJcbiAgICAgICAgICBuYW1lOiAnc2NvcGVzJyxcclxuICAgICAgICAgIHR5cGU6ICdbXCJzdHJpbmdcIl0nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImNyZWF0ZWRcIjoge1xyXG4gICAgICAgICAgbmFtZTogJ2NyZWF0ZWQnLFxyXG4gICAgICAgICAgdHlwZTogJ0RhdGUnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInVzZXJJZFwiOiB7XHJcbiAgICAgICAgICBuYW1lOiAndXNlcklkJyxcclxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgcmVsYXRpb25zOiB7XHJcbiAgICAgICAgdXNlcjoge1xyXG4gICAgICAgICAgbmFtZTogJ3VzZXInLFxyXG4gICAgICAgICAgdHlwZTogJ1VzZXInLFxyXG4gICAgICAgICAgbW9kZWw6ICdVc2VyJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTREtUb2tlbiBpbXBsZW1lbnRzIEFjY2Vzc1Rva2VuSW50ZXJmYWNlIHtcclxuICBpZDogYW55ID0gbnVsbDtcclxuICB0dGw6IG51bWJlciA9IG51bGw7XHJcbiAgc2NvcGVzOiBhbnkgPSBudWxsO1xyXG4gIGNyZWF0ZWQ6IGFueSA9IG51bGw7XHJcbiAgdXNlcklkOiBhbnkgPSBudWxsO1xyXG4gIHVzZXI6IGFueSA9IG51bGw7XHJcbiAgcmVtZW1iZXJNZTogYm9vbGVhbiA9IG51bGw7XHJcbiAgY29uc3RydWN0b3IoZGF0YT86IEFjY2Vzc1Rva2VuSW50ZXJmYWNlKSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xyXG4gIH1cclxufVxyXG4vKipcclxuKiBUaGlzIEdlb1BvaW50IHJlcHJlc2VudHMgYm90aCwgTG9vcEJhY2sgYW5kIE1vbmdvREIgR2VvUG9pbnRcclxuKiovXHJcbmV4cG9ydCBpbnRlcmZhY2UgR2VvUG9pbnQgIHtcclxuICAgIGxhdD86IG51bWJlcjtcclxuICAgIGxuZz86IG51bWJlcjtcclxuICAgIHR5cGU/OiBzdHJpbmc7XHJcbiAgICBjb29yZGluYXRlcz86IG51bWJlcltdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRGaWx0ZXIge1xyXG4gICAgcmFuZ2U6IHN0cmluZyxcclxuICAgIGN1c3RvbT86IHtcclxuICAgICAgc3RhcnQ6IHN0cmluZyxcclxuICAgICAgZW5kOiBzdHJpbmdcclxuICAgIH0sXHJcbiAgICB3aGVyZT86IHt9LFxyXG4gICAgZ3JvdXBCeT86IHN0cmluZ1xyXG59XHJcbiJdfQ==