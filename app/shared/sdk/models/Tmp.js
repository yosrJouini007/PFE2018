"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
var Tmp = (function () {
    function Tmp(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Tmp`.
     */
    Tmp.getModelName = function () {
        return "Tmp";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Tmp for dynamic purposes.
    **/
    Tmp.factory = function (data) {
        return new Tmp(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    Tmp.getModelDefinition = function () {
        return {
            name: 'Tmp',
            plural: 'Tmps',
            path: 'Tmps',
            idName: 'id',
            properties: {
                "id": {
                    name: 'id',
                    type: 'number'
                },
            },
            relations: {}
        };
    };
    return Tmp;
}());
exports.Tmp = Tmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG1wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVG1wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7O0FBT3BCO0lBRUUsYUFBWSxJQUFtQjtRQUM3QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ1csZ0JBQVksR0FBMUI7UUFDRSxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1csV0FBTyxHQUFyQixVQUFzQixJQUFrQjtRQUN0QyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLHNCQUFrQixHQUFoQztRQUNFLE1BQU0sQ0FBQztZQUNMLElBQUksRUFBRSxLQUFLO1lBQ1gsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUUsTUFBTTtZQUNaLE1BQU0sRUFBRSxJQUFJO1lBQ1osVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsSUFBSTtvQkFDVixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsU0FBUyxFQUFFLEVBQ1Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztJQUNILFVBQUM7QUFBRCxDQUFDLEFBNUNELElBNENDO0FBNUNZLGtCQUFHIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cclxuXHJcbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xyXG5leHBvcnQgaW50ZXJmYWNlIFRtcEludGVyZmFjZSB7XHJcbiAgXCJpZFwiPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVG1wIGltcGxlbWVudHMgVG1wSW50ZXJmYWNlIHtcclxuICBcImlkXCI6IG51bWJlcjtcclxuICBjb25zdHJ1Y3RvcihkYXRhPzogVG1wSW50ZXJmYWNlKSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXHJcbiAgICogaS5lLiBgVG1wYC5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcclxuICAgIHJldHVybiBcIlRtcFwiO1xyXG4gIH1cclxuICAvKipcclxuICAqIEBtZXRob2QgZmFjdG9yeVxyXG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xyXG4gICogQGxpY2Vuc2UgTUlUXHJcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIFRtcCBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cclxuICAqKi9cclxuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogVG1wSW50ZXJmYWNlKTogVG1we1xyXG4gICAgcmV0dXJuIG5ldyBUbXAoZGF0YSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cclxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXHJcbiAgKiBAbGljZW5zZSBNSVRcclxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxyXG4gICogZGVmaW5pdGlvbnMuXHJcbiAgKiovXHJcbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiAnVG1wJyxcclxuICAgICAgcGx1cmFsOiAnVG1wcycsXHJcbiAgICAgIHBhdGg6ICdUbXBzJyxcclxuICAgICAgaWROYW1lOiAnaWQnLFxyXG4gICAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgXCJpZFwiOiB7XHJcbiAgICAgICAgICBuYW1lOiAnaWQnLFxyXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICByZWxhdGlvbnM6IHtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=