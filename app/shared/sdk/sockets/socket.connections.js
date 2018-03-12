"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var core_1 = require("@angular/core");
var socket_driver_1 = require("./socket.driver");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/share");
var lb_config_1 = require("../lb.config");
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module SocketConnection
* @license MIT
* @description
* This module handle socket connections and return singleton instances for each
* connection, it will use the SDK Socket Driver Available currently supporting
* Angular 2 for web, NativeScript 2 and Angular Universal.
**/
var SocketConnection = (function () {
    /**
     * @method constructor
     * @param {SocketDriver} driver Socket IO Driver
     * @param {NgZone} zone Angular 2 Zone
     * @description
     * The constructor will set references for the shared hot observables from
     * the class subjects. Then it will subscribe each of these observables
     * that will create a channel that later will be shared between subscribers.
     **/
    function SocketConnection(driver, zone) {
        this.driver = driver;
        this.zone = zone;
        this.subjects = {
            onConnect: new Subject_1.Subject(),
            onDisconnect: new Subject_1.Subject(),
            onAuthenticated: new Subject_1.Subject(),
            onUnAuthorized: new Subject_1.Subject()
        };
        this.sharedObservables = {};
        this.authenticated = false;
        this.sharedObservables = {
            sharedOnConnect: this.subjects.onConnect.asObservable().share(),
            sharedOnDisconnect: this.subjects.onDisconnect.asObservable().share(),
            sharedOnAuthenticated: this.subjects.onAuthenticated.asObservable().share(),
            sharedOnUnAuthorized: this.subjects.onUnAuthorized.asObservable().share()
        };
        // This is needed to create the first channel, subsequents will share the connection
        // We are using Hot Observables to avoid duplicating connection status events.
        this.sharedObservables.sharedOnConnect.subscribe();
        this.sharedObservables.sharedOnDisconnect.subscribe();
        this.sharedObservables.sharedOnAuthenticated.subscribe();
        this.sharedObservables.sharedOnUnAuthorized.subscribe();
    }
    /**
     * @method connect
     * @param {AccessToken} token AccesToken instance
     * @return {void}
     * @description
     * This method will create a new socket connection when not previously established.
     * If there is a broken connection it will re-connect.
     **/
    SocketConnection.prototype.connect = function (token) {
        var _this = this;
        if (token === void 0) { token = null; }
        if (!this.socket) {
            console.info('Creating a new connection with: ', lb_config_1.LoopBackConfig.getPath());
            // Create new socket connection
            this.socket = this.driver.connect(lb_config_1.LoopBackConfig.getPath(), {
                log: false,
                secure: lb_config_1.LoopBackConfig.isSecureWebSocketsSet(),
                forceNew: true,
                forceWebsockets: true,
                transports: ['websocket']
            });
            // Listen for connection
            this.on('connect', function () {
                _this.subjects.onConnect.next('connected');
                // Authenticate or start heartbeat now    
                _this.emit('authentication', token);
            });
            // Listen for authentication
            this.on('authenticated', function () {
                _this.authenticated = true;
                _this.subjects.onAuthenticated.next();
                _this.heartbeater();
            });
            // Listen for authentication
            this.on('unauthorized', function (err) {
                _this.authenticated = false;
                _this.subjects.onUnAuthorized.next(err);
            });
            // Listen for disconnections
            this.on('disconnect', function (status) { return _this.subjects.onDisconnect.next(status); });
        }
        else if (this.socket && !this.socket.connected) {
            if (typeof this.socket.off === 'function') {
                this.socket.off();
            }
            if (typeof this.socket.destroy === 'function') {
                this.socket.destroy();
            }
            delete this.socket;
            this.connect(token);
        }
    };
    /**
     * @method isConnected
     * @return {boolean}
     * @description
     * This method will return true or false depending on established connections
     **/
    SocketConnection.prototype.isConnected = function () {
        return (this.socket && this.socket.connected);
    };
    /**
     * @method on
     * @param {string} event Event name
     * @param {Function} handler Event listener handler
     * @return {void}
     * @description
     * This method listen for server events from the current WebSocket connection.
     * This method is a facade that will wrap the original "on" method and run it
     * within the Angular Zone to avoid update issues.
     **/
    SocketConnection.prototype.on = function (event, handler) {
        var _this = this;
        this.socket.on(event, function (data) { return _this.zone.run(function () { return handler(data); }); });
    };
    /**
     * @method emit
     * @param {string} event Event name
     * @param {any=} data Any type of data
     * @return {void}
     * @description
     * This method will send any type of data to the server according the event set.
     **/
    SocketConnection.prototype.emit = function (event, data) {
        if (data) {
            this.socket.emit(event, data);
        }
        else {
            this.socket.emit(event);
        }
    };
    /**
     * @method removeListener
     * @param {string} event Event name
     * @param {Function} handler Event listener handler
     * @return {void}
     * @description
     * This method will wrap the original "on" method and run it within the Angular Zone
     * Note: off is being used since the nativescript socket io client does not provide
     * removeListener method, but only provides with off which is provided in any platform.
     **/
    SocketConnection.prototype.removeListener = function (event, handler) {
        if (typeof this.socket.off === 'function') {
            this.socket.off(event, handler);
        }
    };
    /**
     * @method removeAllListeners
     * @param {string} event Event name
     * @param {Function} handler Event listener handler
     * @return {void}
     * @description
     * This method will wrap the original "on" method and run it within the Angular Zone
     * Note: off is being used since the nativescript socket io client does not provide
     * removeListener method, but only provides with off which is provided in any platform.
     **/
    SocketConnection.prototype.removeAllListeners = function (event) {
        if (typeof this.socket.removeAllListeners === 'function') {
            this.socket.removeAllListeners(event);
        }
    };
    /**
     * @method disconnect
     * @return {void}
     * @description
     * This will disconnect the client from the server
     **/
    SocketConnection.prototype.disconnect = function () {
        this.socket.disconnect();
    };
    /**
     * @method heartbeater
     * @return {void}
     * @description
     * This will keep the connection as active, even when users are not sending
     * data, this avoids disconnection because of a connection not being used.
     **/
    SocketConnection.prototype.heartbeater = function () {
        var _this = this;
        var heartbeater = setInterval(function () {
            if (_this.isConnected()) {
                _this.socket.emit('lb-ping');
            }
            else {
                _this.socket.removeAllListeners('lb-pong');
                clearInterval(heartbeater);
            }
        }, 15000);
        this.socket.on('lb-pong', function (data) { return console.info('Heartbeat: ', data); });
    };
    SocketConnection = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(socket_driver_1.SocketDriver)),
        __param(1, core_1.Inject(core_1.NgZone)),
        __metadata("design:paramtypes", [socket_driver_1.SocketDriver,
            core_1.NgZone])
    ], SocketConnection);
    return SocketConnection;
}());
exports.SocketConnection = SocketConnection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmNvbm5lY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic29ja2V0LmNvbm5lY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0JBQW9CO0FBQ3BCLHNDQUEyRDtBQUMzRCxpREFBK0M7QUFFL0Msd0NBQXVDO0FBRXZDLG1DQUFpQztBQUNqQywwQ0FBOEM7QUFDOUM7Ozs7Ozs7O0dBUUc7QUFFSDtJQW9CRTs7Ozs7Ozs7UUFRSTtJQUNKLDBCQUNnQyxNQUFvQixFQUMxQixJQUFZO1FBRE4sV0FBTSxHQUFOLE1BQU0sQ0FBYztRQUMxQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBN0I5QixhQUFRLEdBS1o7WUFDRixTQUFTLEVBQUUsSUFBSSxpQkFBTyxFQUFFO1lBQ3hCLFlBQVksRUFBRSxJQUFJLGlCQUFPLEVBQUU7WUFDM0IsZUFBZSxFQUFFLElBQUksaUJBQU8sRUFBRTtZQUM5QixjQUFjLEVBQUUsSUFBSSxpQkFBTyxFQUFFO1NBQzlCLENBQUM7UUFDSyxzQkFBaUIsR0FLcEIsRUFBRSxDQUFDO1FBQ0Esa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFjcEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHO1lBQ3ZCLGVBQWUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUU7WUFDL0Qsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFO1lBQ3JFLHFCQUFxQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRTtZQUMzRSxvQkFBb0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUU7U0FDMUUsQ0FBQztRQUNGLG9GQUFvRjtRQUNwRiw4RUFBOEU7UUFDOUUsSUFBSSxDQUFDLGlC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b3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTb2NrZXREcml2ZXIgfSBmcm9tICcuL3NvY2tldC5kcml2ZXInO1xyXG5pbXBvcnQgeyBBY2Nlc3NUb2tlbiB9IGZyb20gJy4uL21vZGVscyc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9zaGFyZSc7XHJcbmltcG9ydCB7IExvb3BCYWNrQ29uZmlnIH0gZnJvbSAnLi4vbGIuY29uZmlnJztcclxuLyoqXHJcbiogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dHdpdHRlcjpAam9obmNhc2FycnViaWFzPiA8Z2l0aHViOkBtZWFuLWV4cGVydC1vZmZpY2lhbD5cclxuKiBAbW9kdWxlIFNvY2tldENvbm5lY3Rpb25cclxuKiBAbGljZW5zZSBNSVRcclxuKiBAZGVzY3JpcHRpb25cclxuKiBUaGlzIG1vZHVsZSBoYW5kbGUgc29ja2V0IGNvbm5lY3Rpb25zIGFuZCByZXR1cm4gc2luZ2xldG9uIGluc3RhbmNlcyBmb3IgZWFjaFxyXG4qIGNvbm5lY3Rpb24sIGl0IHdpbGwgdXNlIHRoZSBTREsgU29ja2V0IERyaXZlciBBdmFpbGFibGUgY3VycmVudGx5IHN1cHBvcnRpbmdcclxuKiBBbmd1bGFyIDIgZm9yIHdlYiwgTmF0aXZlU2NyaXB0IDIgYW5kIEFuZ3VsYXIgVW5pdmVyc2FsLlxyXG4qKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU29ja2V0Q29ubmVjdGlvbiB7XHJcbiAgcHJpdmF0ZSBzb2NrZXQ6IGFueTtcclxuICBwcml2YXRlIHN1YmplY3RzOiB7XHJcbiAgICBvbkNvbm5lY3Q6IFN1YmplY3Q8YW55PixcclxuICAgIG9uRGlzY29ubmVjdDogU3ViamVjdDxhbnk+LFxyXG4gICAgb25BdXRoZW50aWNhdGVkOiBTdWJqZWN0PGFueT4sXHJcbiAgICBvblVuQXV0aG9yaXplZDogU3ViamVjdDxhbnk+XHJcbiAgfSA9IHtcclxuICAgIG9uQ29ubmVjdDogbmV3IFN1YmplY3QoKSxcclxuICAgIG9uRGlzY29ubmVjdDogbmV3IFN1YmplY3QoKSxcclxuICAgIG9uQXV0aGVudGljYXRlZDogbmV3IFN1YmplY3QoKSxcclxuICAgIG9uVW5BdXRob3JpemVkOiBuZXcgU3ViamVjdCgpXHJcbiAgfTtcclxuICBwdWJsaWMgc2hhcmVkT2JzZXJ2YWJsZXM6IHtcclxuICAgIHNoYXJlZE9uQ29ubmVjdD86IE9ic2VydmFibGU8YW55PixcclxuICAgIHNoYXJlZE9uRGlzY29ubmVjdD86IE9ic2VydmFibGU8YW55PixcclxuICAgIHNoYXJlZE9uQXV0aGVudGljYXRlZD86IE9ic2VydmFibGU8YW55PixcclxuICAgIHNoYXJlZE9uVW5BdXRob3JpemVkPzogT2JzZXJ2YWJsZTxhbnk+XHJcbiAgfSA9IHt9O1xyXG4gIHB1YmxpYyBhdXRoZW50aWNhdGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBjb25zdHJ1Y3RvclxyXG4gICAqIEBwYXJhbSB7U29ja2V0RHJpdmVyfSBkcml2ZXIgU29ja2V0IElPIERyaXZlclxyXG4gICAqIEBwYXJhbSB7Tmdab25lfSB6b25lIEFuZ3VsYXIgMiBab25lXHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIHdpbGwgc2V0IHJlZmVyZW5jZXMgZm9yIHRoZSBzaGFyZWQgaG90IG9ic2VydmFibGVzIGZyb21cclxuICAgKiB0aGUgY2xhc3Mgc3ViamVjdHMuIFRoZW4gaXQgd2lsbCBzdWJzY3JpYmUgZWFjaCBvZiB0aGVzZSBvYnNlcnZhYmxlc1xyXG4gICAqIHRoYXQgd2lsbCBjcmVhdGUgYSBjaGFubmVsIHRoYXQgbGF0ZXIgd2lsbCBiZSBzaGFyZWQgYmV0d2VlbiBzdWJzY3JpYmVycy5cclxuICAgKiovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KFNvY2tldERyaXZlcikgcHJpdmF0ZSBkcml2ZXI6IFNvY2tldERyaXZlcixcclxuICAgIEBJbmplY3QoTmdab25lKSBwcml2YXRlIHpvbmU6IE5nWm9uZVxyXG4gICkge1xyXG4gICAgdGhpcy5zaGFyZWRPYnNlcnZhYmxlcyA9IHtcclxuICAgICAgc2hhcmVkT25Db25uZWN0OiB0aGlzLnN1YmplY3RzLm9uQ29ubmVjdC5hc09ic2VydmFibGUoKS5zaGFyZSgpLFxyXG4gICAgICBzaGFyZWRPbkRpc2Nvbm5lY3Q6IHRoaXMuc3ViamVjdHMub25EaXNjb25uZWN0LmFzT2JzZXJ2YWJsZSgpLnNoYXJlKCksXHJcbiAgICAgIHNoYXJlZE9uQXV0aGVudGljYXRlZDogdGhpcy5zdWJqZWN0cy5vbkF1dGhlbnRpY2F0ZWQuYXNPYnNlcnZhYmxlKCkuc2hhcmUoKSxcclxuICAgICAgc2hhcmVkT25VbkF1dGhvcml6ZWQ6IHRoaXMuc3ViamVjdHMub25VbkF1dGhvcml6ZWQuYXNPYnNlcnZhYmxlKCkuc2hhcmUoKVxyXG4gICAgfTtcclxuICAgIC8vIFRoaXMgaXMgbmVlZGVkIHRvIGNyZWF0ZSB0aGUgZmlyc3QgY2hhbm5lbCwgc3Vic2VxdWVudHMgd2lsbCBzaGFyZSB0aGUgY29ubmVjdGlvblxyXG4gICAgLy8gV2UgYXJlIHVzaW5nIEhvdCBPYnNlcnZhYmxlcyB0byBhdm9pZCBkdXBsaWNhdGluZyBjb25uZWN0aW9uIHN0YXR1cyBldmVudHMuXHJcbiAgICB0aGlzLnNoYXJlZE9ic2VydmFibGVzLnNoYXJlZE9uQ29ubmVjdC5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuc2hhcmVkT2JzZXJ2YWJsZXMuc2hhcmVkT25EaXNjb25uZWN0LnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5zaGFyZWRPYnNlcnZhYmxlcy5zaGFyZWRPbkF1dGhlbnRpY2F0ZWQuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLnNoYXJlZE9ic2VydmFibGVzLnNoYXJlZE9uVW5BdXRob3JpemVkLnN1YnNjcmliZSgpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBAbWV0aG9kIGNvbm5lY3RcclxuICAgKiBAcGFyYW0ge0FjY2Vzc1Rva2VufSB0b2tlbiBBY2Nlc1Rva2VuIGluc3RhbmNlXHJcbiAgICogQHJldHVybiB7dm9pZH1cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIGNyZWF0ZSBhIG5ldyBzb2NrZXQgY29ubmVjdGlvbiB3aGVuIG5vdCBwcmV2aW91c2x5IGVzdGFibGlzaGVkLlxyXG4gICAqIElmIHRoZXJlIGlzIGEgYnJva2VuIGNvbm5lY3Rpb24gaXQgd2lsbCByZS1jb25uZWN0LlxyXG4gICAqKi9cclxuICBwdWJsaWMgY29ubmVjdCh0b2tlbjogQWNjZXNzVG9rZW4gPSBudWxsKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuc29ja2V0KSB7XHJcbiAgICAgIGNvbnNvbGUuaW5mbygnQ3JlYXRpbmcgYSBuZXcgY29ubmVjdGlvbiB3aXRoOiAnLCBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkpO1xyXG4gICAgICAvLyBDcmVhdGUgbmV3IHNvY2tldCBjb25uZWN0aW9uXHJcbiAgICAgIHRoaXMuc29ja2V0ID0gdGhpcy5kcml2ZXIuY29ubmVjdChMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksIHtcclxuICAgICAgICBsb2c6IGZhbHNlLFxyXG4gICAgICAgIHNlY3VyZTogTG9vcEJhY2tDb25maWcuaXNTZWN1cmVXZWJTb2NrZXRzU2V0KCksXHJcbiAgICAgICAgZm9yY2VOZXc6IHRydWUsXHJcbiAgICAgICAgZm9yY2VXZWJzb2NrZXRzOiB0cnVlLFxyXG4gICAgICAgIHRyYW5zcG9ydHM6IFsnd2Vic29ja2V0J11cclxuICAgICAgfSk7XHJcbiAgICAgIC8vIExpc3RlbiBmb3IgY29ubmVjdGlvblxyXG4gICAgICB0aGlzLm9uKCdjb25uZWN0JywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc3ViamVjdHMub25Db25uZWN0Lm5leHQoJ2Nvbm5lY3RlZCcpO1xyXG4gICAgICAgIC8vIEF1dGhlbnRpY2F0ZSBvciBzdGFydCBoZWFydGJlYXQgbm93ICAgIFxyXG4gICAgICAgIHRoaXMuZW1pdCgnYXV0aGVudGljYXRpb24nLCB0b2tlbik7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBMaXN0ZW4gZm9yIGF1dGhlbnRpY2F0aW9uXHJcbiAgICAgIHRoaXMub24oJ2F1dGhlbnRpY2F0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hdXRoZW50aWNhdGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnN1YmplY3RzLm9uQXV0aGVudGljYXRlZC5uZXh0KCk7XHJcbiAgICAgICAgdGhpcy5oZWFydGJlYXRlcigpO1xyXG4gICAgICB9KVxyXG4gICAgICAvLyBMaXN0ZW4gZm9yIGF1dGhlbnRpY2F0aW9uXHJcbiAgICAgIHRoaXMub24oJ3VuYXV0aG9yaXplZCcsIChlcnI6IGFueSkgPT4ge1xyXG4gICAgICAgIHRoaXMuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3ViamVjdHMub25VbkF1dGhvcml6ZWQubmV4dChlcnIpO1xyXG4gICAgICB9KVxyXG4gICAgICAvLyBMaXN0ZW4gZm9yIGRpc2Nvbm5lY3Rpb25zXHJcbiAgICAgIHRoaXMub24oJ2Rpc2Nvbm5lY3QnLCAoc3RhdHVzOiBhbnkpID0+IHRoaXMuc3ViamVjdHMub25EaXNjb25uZWN0Lm5leHQoc3RhdHVzKSk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc29ja2V0ICYmICF0aGlzLnNvY2tldC5jb25uZWN0ZWQpe1xyXG4gICAgICBpZiAodHlwZW9mIHRoaXMuc29ja2V0Lm9mZiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9mZigpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5zb2NrZXQuZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHRoaXMuc29ja2V0LmRlc3Ryb3koKTtcclxuICAgICAgfVxyXG4gICAgICBkZWxldGUgdGhpcy5zb2NrZXQ7XHJcbiAgICAgIHRoaXMuY29ubmVjdCh0b2tlbik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgaXNDb25uZWN0ZWRcclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIHRydWUgb3IgZmFsc2UgZGVwZW5kaW5nIG9uIGVzdGFibGlzaGVkIGNvbm5lY3Rpb25zXHJcbiAgICoqL1xyXG4gIHB1YmxpYyBpc0Nvbm5lY3RlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAodGhpcy5zb2NrZXQgJiYgdGhpcy5zb2NrZXQuY29ubmVjdGVkKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBvblxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBFdmVudCBuYW1lXHJcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlciBFdmVudCBsaXN0ZW5lciBoYW5kbGVyXHJcbiAgICogQHJldHVybiB7dm9pZH1cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBUaGlzIG1ldGhvZCBsaXN0ZW4gZm9yIHNlcnZlciBldmVudHMgZnJvbSB0aGUgY3VycmVudCBXZWJTb2NrZXQgY29ubmVjdGlvbi5cclxuICAgKiBUaGlzIG1ldGhvZCBpcyBhIGZhY2FkZSB0aGF0IHdpbGwgd3JhcCB0aGUgb3JpZ2luYWwgXCJvblwiIG1ldGhvZCBhbmQgcnVuIGl0XHJcbiAgICogd2l0aGluIHRoZSBBbmd1bGFyIFpvbmUgdG8gYXZvaWQgdXBkYXRlIGlzc3Vlcy5cclxuICAgKiovXHJcbiAgcHVibGljIG9uKGV2ZW50OiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLnNvY2tldC5vbihldmVudCwgKGRhdGE6IGFueSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBoYW5kbGVyKGRhdGEpKSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgZW1pdFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBFdmVudCBuYW1lXHJcbiAgICogQHBhcmFtIHthbnk9fSBkYXRhIEFueSB0eXBlIG9mIGRhdGFcclxuICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgc2VuZCBhbnkgdHlwZSBvZiBkYXRhIHRvIHRoZSBzZXJ2ZXIgYWNjb3JkaW5nIHRoZSBldmVudCBzZXQuXHJcbiAgICoqL1xyXG4gIHB1YmxpYyBlbWl0KGV2ZW50OiBzdHJpbmcsIGRhdGE/OiBhbnkpOiB2b2lkIHtcclxuICAgIGlmIChkYXRhKSB7XHJcbiAgICAgIHRoaXMuc29ja2V0LmVtaXQoZXZlbnQsIGRhdGEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zb2NrZXQuZW1pdChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgcmVtb3ZlTGlzdGVuZXJcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgRXZlbnQgbmFtZVxyXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXIgRXZlbnQgbGlzdGVuZXIgaGFuZGxlclxyXG4gICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogVGhpcyBtZXRob2Qgd2lsbCB3cmFwIHRoZSBvcmlnaW5hbCBcIm9uXCIgbWV0aG9kIGFuZCBydW4gaXQgd2l0aGluIHRoZSBBbmd1bGFyIFpvbmVcclxuICAgKiBOb3RlOiBvZmYgaXMgYmVpbmcgdXNlZCBzaW5jZSB0aGUgbmF0aXZlc2NyaXB0IHNvY2tldCBpbyBjbGllbnQgZG9lcyBub3QgcHJvdmlkZVxyXG4gICAqIHJlbW92ZUxpc3RlbmVyIG1ldGhvZCwgYnV0IG9ubHkgcHJvdmlkZXMgd2l0aCBvZmYgd2hpY2ggaXMgcHJvdmlkZWQgaW4gYW55IHBsYXRmb3JtLlxyXG4gICAqKi9cclxuICBwdWJsaWMgcmVtb3ZlTGlzdGVuZXIoZXZlbnQ6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5zb2NrZXQub2ZmID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXMuc29ja2V0Lm9mZihldmVudCwgaGFuZGxlcik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgcmVtb3ZlQWxsTGlzdGVuZXJzXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IEV2ZW50IG5hbWVcclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyIEV2ZW50IGxpc3RlbmVyIGhhbmRsZXJcclxuICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgd3JhcCB0aGUgb3JpZ2luYWwgXCJvblwiIG1ldGhvZCBhbmQgcnVuIGl0IHdpdGhpbiB0aGUgQW5ndWxhciBab25lXHJcbiAgICogTm90ZTogb2ZmIGlzIGJlaW5nIHVzZWQgc2luY2UgdGhlIG5hdGl2ZXNjcmlwdCBzb2NrZXQgaW8gY2xpZW50IGRvZXMgbm90IHByb3ZpZGVcclxuICAgKiByZW1vdmVMaXN0ZW5lciBtZXRob2QsIGJ1dCBvbmx5IHByb3ZpZGVzIHdpdGggb2ZmIHdoaWNoIGlzIHByb3ZpZGVkIGluIGFueSBwbGF0Zm9ybS5cclxuICAgKiovXHJcbiAgcHVibGljIHJlbW92ZUFsbExpc3RlbmVycyhldmVudDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMuc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLnNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuICAvKipcclxuICAgKiBAbWV0aG9kIGRpc2Nvbm5lY3RcclxuICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIFRoaXMgd2lsbCBkaXNjb25uZWN0IHRoZSBjbGllbnQgZnJvbSB0aGUgc2VydmVyXHJcbiAgICoqL1xyXG4gIHB1YmxpYyBkaXNjb25uZWN0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zb2NrZXQuZGlzY29ubmVjdCgpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBAbWV0aG9kIGhlYXJ0YmVhdGVyXHJcbiAgICogQHJldHVybiB7dm9pZH1cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBUaGlzIHdpbGwga2VlcCB0aGUgY29ubmVjdGlvbiBhcyBhY3RpdmUsIGV2ZW4gd2hlbiB1c2VycyBhcmUgbm90IHNlbmRpbmdcclxuICAgKiBkYXRhLCB0aGlzIGF2b2lkcyBkaXNjb25uZWN0aW9uIGJlY2F1c2Ugb2YgYSBjb25uZWN0aW9uIG5vdCBiZWluZyB1c2VkLlxyXG4gICAqKi9cclxuICBwcml2YXRlIGhlYXJ0YmVhdGVyKCk6IHZvaWQge1xyXG4gICAgbGV0IGhlYXJ0YmVhdGVyOiBhbnkgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmlzQ29ubmVjdGVkKCkpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdsYi1waW5nJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQucmVtb3ZlQWxsTGlzdGVuZXJzKCdsYi1wb25nJyk7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChoZWFydGJlYXRlcik7XHJcbiAgICAgIH1cclxuICAgIH0sIDE1MDAwKTtcclxuICAgIHRoaXMuc29ja2V0Lm9uKCdsYi1wb25nJywgKGRhdGE6IGFueSkgPT4gY29uc29sZS5pbmZvKCdIZWFydGJlYXQ6ICcsIGRhdGEpKTtcclxuICB9XHJcbn1cclxuIl19