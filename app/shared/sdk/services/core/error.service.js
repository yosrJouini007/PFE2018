"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
//import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
require("rxjs/add/observable/throw");
/**
 * Default error handler
 */
var ErrorHandler = (function () {
    function ErrorHandler() {
    }
    // ErrorObservable when rxjs version < rc.5
    // ErrorObservable<string> when rxjs version = rc.5
    // I'm leaving any for now to avoid breaking apps using both versions
    ErrorHandler.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.json() || 'Server error');
    };
    ErrorHandler = __decorate([
        core_1.Injectable()
    ], ErrorHandler);
    return ErrorHandler;
}());
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVycm9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQkFBb0I7QUFDcEIsc0NBQTJDO0FBRTNDLDhDQUE2QztBQUM3QyxvRUFBb0U7QUFDcEUscUNBQW1DO0FBQ25DOztHQUVHO0FBRUg7SUFBQTtJQU9BLENBQUM7SUFOQywyQ0FBMkM7SUFDM0MsbURBQW1EO0lBQ25ELHFFQUFxRTtJQUM5RCxrQ0FBVyxHQUFsQixVQUFtQixLQUFlO1FBQ2hDLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUcsY0FBYyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQU5VLFlBQVk7UUFEeEIsaUJBQVUsRUFBRTtPQUNBLFlBQVksQ0FPeEI7SUFBRCxtQkFBQztDQUFBLEFBUEQsSUFPQztBQVBZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuLy9pbXBvcnQgeyBFcnJvck9ic2VydmFibGUgfSBmcm9tICdyeGpzL29ic2VydmFibGUvRXJyb3JPYnNlcnZhYmxlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL3Rocm93JztcclxuLyoqXHJcbiAqIERlZmF1bHQgZXJyb3IgaGFuZGxlclxyXG4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRXJyb3JIYW5kbGVyIHtcclxuICAvLyBFcnJvck9ic2VydmFibGUgd2hlbiByeGpzIHZlcnNpb24gPCByYy41XHJcbiAgLy8gRXJyb3JPYnNlcnZhYmxlPHN0cmluZz4gd2hlbiByeGpzIHZlcnNpb24gPSByYy41XHJcbiAgLy8gSSdtIGxlYXZpbmcgYW55IGZvciBub3cgdG8gYXZvaWQgYnJlYWtpbmcgYXBwcyB1c2luZyBib3RoIHZlcnNpb25zXHJcbiAgcHVibGljIGhhbmRsZUVycm9yKGVycm9yOiBSZXNwb25zZSk6IGFueSB7XHJcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCl8fCAnU2VydmVyIGVycm9yJyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==