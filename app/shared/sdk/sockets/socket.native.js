"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var SocketIO = require("nativescript-socket.io");
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module SocketNative
* @license MIT
* @description
* This module handle socket connections for nativescript apps, it will be DI Swapped
* depending on the platform environment.
* This module will be generated when the -d ng2native flag is set.
**/
var SocketNative = (function () {
    function SocketNative() {
    }
    /**
     * @method connect
     * @param {string} url URL path to connect with the server.
     * @param {any} options Any socket.io v1 =< valid options
     * @return {SocketIO.Socket}
     * @description
     * This method will return a valid socket connection.
     **/
    SocketNative.prototype.connect = function (url, options) {
        return SocketIO.connect(url, options);
    };
    return SocketNative;
}());
exports.SocketNative = SocketNative;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0Lm5hdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNvY2tldC5uYXRpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQkFBb0I7QUFDcEIsaURBQW1EO0FBQ25EOzs7Ozs7OztHQVFHO0FBQ0g7SUFBQTtJQVlBLENBQUM7SUFYQzs7Ozs7OztRQU9JO0lBQ0osOEJBQU8sR0FBUCxVQUFRLEdBQVcsRUFBRSxPQUFZO1FBQy9CLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQztBQVpZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cclxuaW1wb3J0ICogYXMgU29ja2V0SU8gZnJvbSAnbmF0aXZlc2NyaXB0LXNvY2tldC5pbyc7XHJcbi8qKlxyXG4qIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHR3aXR0ZXI6QGpvaG5jYXNhcnJ1Ymlhcz4gPGdpdGh1YjpAbWVhbi1leHBlcnQtb2ZmaWNpYWw+XHJcbiogQG1vZHVsZSBTb2NrZXROYXRpdmVcclxuKiBAbGljZW5zZSBNSVRcclxuKiBAZGVzY3JpcHRpb25cclxuKiBUaGlzIG1vZHVsZSBoYW5kbGUgc29ja2V0IGNvbm5lY3Rpb25zIGZvciBuYXRpdmVzY3JpcHQgYXBwcywgaXQgd2lsbCBiZSBESSBTd2FwcGVkXHJcbiogZGVwZW5kaW5nIG9uIHRoZSBwbGF0Zm9ybSBlbnZpcm9ubWVudC5cclxuKiBUaGlzIG1vZHVsZSB3aWxsIGJlIGdlbmVyYXRlZCB3aGVuIHRoZSAtZCBuZzJuYXRpdmUgZmxhZyBpcyBzZXQuXHJcbioqL1xyXG5leHBvcnQgY2xhc3MgU29ja2V0TmF0aXZlIHtcclxuICAvKipcclxuICAgKiBAbWV0aG9kIGNvbm5lY3RcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFVSTCBwYXRoIHRvIGNvbm5lY3Qgd2l0aCB0aGUgc2VydmVyLlxyXG4gICAqIEBwYXJhbSB7YW55fSBvcHRpb25zIEFueSBzb2NrZXQuaW8gdjEgPTwgdmFsaWQgb3B0aW9uc1xyXG4gICAqIEByZXR1cm4ge1NvY2tldElPLlNvY2tldH1cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiBhIHZhbGlkIHNvY2tldCBjb25uZWN0aW9uLiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICoqL1xyXG4gIGNvbm5lY3QodXJsOiBzdHJpbmcsIG9wdGlvbnM6IGFueSk6IFNvY2tldElPLlNvY2tldElPIHtcclxuICAgIHJldHVybiBTb2NrZXRJTy5jb25uZWN0KHVybCwgb3B0aW9ucyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==