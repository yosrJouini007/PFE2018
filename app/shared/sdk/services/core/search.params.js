"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module JSONSearchParams
* @license MIT
* @description
* JSON Parser and Wrapper for the Angular2 URLSearchParams
* This module correctly encodes a json object into a query string and then creates
* an instance of the URLSearchParams component for later use in HTTP Calls
**/
var JSONSearchParams = (function () {
    function JSONSearchParams() {
    }
    JSONSearchParams.prototype.setJSON = function (obj) {
        this._usp = new http_1.URLSearchParams(this._JSON2URL(obj, false));
    };
    JSONSearchParams.prototype.getURLSearchParams = function () {
        return this._usp;
    };
    JSONSearchParams.prototype._JSON2URL = function (obj, parent) {
        var parts = [];
        for (var key in obj)
            parts.push(this._parseParam(key, obj[key], parent));
        return parts.join('&');
    };
    JSONSearchParams.prototype._parseParam = function (key, value, parent) {
        var processedKey = parent ? parent + '[' + key + ']' : key;
        if (value && ((typeof value) === 'object' || Array.isArray(value))) {
            return this._JSON2URL(value, processedKey);
        }
        return processedKey + '=' + value;
    };
    JSONSearchParams = __decorate([
        core_1.Injectable()
    ], JSONSearchParams);
    return JSONSearchParams;
}());
exports.JSONSearchParams = JSONSearchParams;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnBhcmFtcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaC5wYXJhbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQkFBb0I7QUFDcEIsc0NBQTJDO0FBQzNDLHNDQUFnRDtBQUNoRDs7Ozs7Ozs7R0FRRztBQUVIO0lBQUE7SUEwQkEsQ0FBQztJQXRCVSxrQ0FBTyxHQUFkLFVBQWUsR0FBUTtRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksc0JBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFTSw2Q0FBa0IsR0FBekI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRU8sb0NBQVMsR0FBakIsVUFBa0IsR0FBUSxFQUFFLE1BQVc7UUFDbkMsSUFBSSxLQUFLLEdBQVEsRUFBRSxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQztZQUNwQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTyxzQ0FBVyxHQUFuQixVQUFvQixHQUFXLEVBQUUsS0FBVSxFQUFFLE1BQWM7UUFDdkQsSUFBSSxZQUFZLEdBQUcsTUFBTSxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDM0QsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQVMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO0lBQ3RDLENBQUM7SUF6QlEsZ0JBQWdCO1FBRDVCLGlCQUFVLEVBQUU7T0FDQSxnQkFBZ0IsQ0EwQjVCO0lBQUQsdUJBQUM7Q0FBQSxBQTFCRCxJQTBCQztBQTFCWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFVSTFNlYXJjaFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG4vKipcclxuKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0d2l0dGVyOkBqb2huY2FzYXJydWJpYXM+IDxnaXRodWI6QG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxyXG4qIEBtb2R1bGUgSlNPTlNlYXJjaFBhcmFtc1xyXG4qIEBsaWNlbnNlIE1JVFxyXG4qIEBkZXNjcmlwdGlvblxyXG4qIEpTT04gUGFyc2VyIGFuZCBXcmFwcGVyIGZvciB0aGUgQW5ndWxhcjIgVVJMU2VhcmNoUGFyYW1zXHJcbiogVGhpcyBtb2R1bGUgY29ycmVjdGx5IGVuY29kZXMgYSBqc29uIG9iamVjdCBpbnRvIGEgcXVlcnkgc3RyaW5nIGFuZCB0aGVuIGNyZWF0ZXNcclxuKiBhbiBpbnN0YW5jZSBvZiB0aGUgVVJMU2VhcmNoUGFyYW1zIGNvbXBvbmVudCBmb3IgbGF0ZXIgdXNlIGluIEhUVFAgQ2FsbHNcclxuKiovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEpTT05TZWFyY2hQYXJhbXMge1xyXG5cclxuICAgIHByaXZhdGUgX3VzcDogVVJMU2VhcmNoUGFyYW1zO1xyXG5cclxuICAgIHB1YmxpYyBzZXRKU09OKG9iajogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fdXNwID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh0aGlzLl9KU09OMlVSTChvYmosIGZhbHNlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFVSTFNlYXJjaFBhcmFtcygpOiBVUkxTZWFyY2hQYXJhbXMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91c3A7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfSlNPTjJVUkwob2JqOiBhbnksIHBhcmVudDogYW55KSB7XHJcbiAgICAgICAgdmFyIHBhcnRzOiBhbnkgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKVxyXG4gICAgICAgIHBhcnRzLnB1c2godGhpcy5fcGFyc2VQYXJhbShrZXksIG9ialtrZXldLCBwYXJlbnQpKTtcclxuICAgICAgICByZXR1cm4gcGFydHMuam9pbignJicpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3BhcnNlUGFyYW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIHBhcmVudDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHByb2Nlc3NlZEtleSA9IHBhcmVudCA/IHBhcmVudCArICdbJyArIGtleSArICddJyA6IGtleTtcclxuICAgICAgICBpZiAodmFsdWUgJiYgKDxzdHJpbmc+KHR5cGVvZiB2YWx1ZSkgPT09ICdvYmplY3QnIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fSlNPTjJVUkwodmFsdWUsIHByb2Nlc3NlZEtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9jZXNzZWRLZXkgKyAnPScgKyB2YWx1ZTtcclxuICAgIH1cclxufVxyXG4iXX0=