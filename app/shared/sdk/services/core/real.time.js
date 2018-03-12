"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
require("rxjs/add/operator/share");
var core_1 = require("@angular/core");
var io_service_1 = require("./io.service");
var auth_service_1 = require("./auth.service");
var FireLoop_1 = require("../../models/FireLoop");
var socket_connections_1 = require("../../sockets/socket.connections");
var SDKModels_1 = require("../custom/SDKModels");
require("rxjs/add/operator/share");
var Subject_1 = require("rxjs/Subject");
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@johncasarrubias>
* @module RealTime
* @license MIT
* @description
* This module is a real-time interface for using socket connections, its main purpose
* is to make sure that when there is a valid connection, it will create instances
* of the different real-time functionalities like FireLoop, PubSub and IO.
**/
var RealTime = (function () {
    /**
    * @method constructor
    * @param {SocketConnection} connection WebSocket connection service
    * @param {SDKModels} models Model provider service
    * @param {LoopBackAuth} auth LoopBack authentication service
    * @description
    * It will intialize the shared on ready communication channel.
    **/
    function RealTime(connection, models, auth) {
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.connecting = false;
        this.onReadySubject = new Subject_1.Subject();
        this.sharedOnReady = this.onReadySubject.asObservable().share();
        this.sharedOnReady.subscribe();
    }
    /**
    * @method onDisconnect
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is disconnected from server.
    **/
    RealTime.prototype.onDisconnect = function () {
        return this.connection.sharedObservables.sharedOnDisconnect;
    };
    /**
    * @method onAuthenticated
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is authenticated with the server.
    **/
    RealTime.prototype.onAuthenticated = function () {
        return this.connection.sharedObservables.sharedOnAuthenticated;
    };
    /**
    * @method onUnAuthorized
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is not authorized to connect with the server.
    **/
    RealTime.prototype.onUnAuthorized = function () {
        return this.connection.sharedObservables.sharedOnUnAuthorized;
    };
    /**
    * @method onReady
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is Ready for broadcasting.
    * and will register connection flow events to notify subscribers.
    **/
    RealTime.prototype.onReady = function () {
        var _this = this;
        // If there is a valid connection, then we just send back to the EventLoop
        // Or next will be executed before the actual subscription.
        if (this.connection.isConnected()) {
            var to_1 = setTimeout(function () {
                _this.onReadySubject.next('shared-connection');
                clearTimeout(to_1);
            });
            // Else if there is a current attempt of connection we wait for the prior
            // process that started the connection flow.
        }
        else if (this.connecting) {
            var ti_1 = setInterval(function () {
                if (_this.connection.isConnected()) {
                    _this.onReadySubject.next('shared-connection');
                    clearInterval(ti_1);
                }
            }, 500);
            // If there is not valid connection or attempt, then we start the connection flow
            // and make sure we notify all the onReady subscribers when done.
            // Also it will listen for desconnections so we unsubscribe and avoid both:
            // Memory leaks and duplicated triggered events.
        }
        else {
            this.connecting = true;
            this.connection.connect(this.auth.getToken());
            this.IO = new io_service_1.IO(this.connection);
            this.FireLoop = new FireLoop_1.FireLoop(this.connection, this.models);
            // Fire event for those subscribed 
            var s1_1 = this.connection.sharedObservables.sharedOnConnect.subscribe(function () {
                console.log('Real-Time connection has been established');
                _this.connecting = false;
                _this.onReadySubject.next('connected');
                var s2 = _this.connection.sharedObservables.sharedOnDisconnect.subscribe(function () {
                    s1_1.unsubscribe();
                    s2.unsubscribe();
                });
            });
        }
        return this.sharedOnReady;
    };
    RealTime = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(socket_connections_1.SocketConnection)),
        __param(1, core_1.Inject(SDKModels_1.SDKModels)),
        __param(2, core_1.Inject(auth_service_1.LoopBackAuth)),
        __metadata("design:paramtypes", [socket_connections_1.SocketConnection,
            SDKModels_1.SDKModels,
            auth_service_1.LoopBackAuth])
    ], RealTime);
    return RealTime;
}());
exports.RealTime = RealTime;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhbC50aW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVhbC50aW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0JBQW9CO0FBQ3BCLG1DQUFpQztBQUNqQyxzQ0FBbUQ7QUFDbkQsMkNBQWtDO0FBQ2xDLCtDQUE4QztBQUM5QyxrREFBaUQ7QUFDakQsdUVBQW9FO0FBQ3BFLGlEQUFnRDtBQUVoRCxtQ0FBaUM7QUFDakMsd0NBQXVDO0FBRXZDOzs7Ozs7OztHQVFHO0FBRUg7SUFNRTs7Ozs7OztPQU9HO0lBQ0gsa0JBQ21DLFVBQTRCLEVBQ2hDLE1BQWlCLEVBQ2QsSUFBa0I7UUFGakIsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFDaEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNkLFNBQUksR0FBSixJQUFJLENBQWM7UUFkNUMsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixtQkFBYyxHQUFvQixJQUFJLGlCQUFPLEVBQVUsQ0FBQztRQUN4RCxrQkFBYSxHQUF1QixJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBY3JGLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0gsK0JBQVksR0FBWjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDO0lBQzlELENBQUM7SUFDRDs7Ozs7T0FLRztJQUNILGtDQUFlLEdBQWY7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQztJQUNqRSxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSCxpQ0FBYyxHQUFkO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsb0JBQW9CLENBQUM7SUFDaEUsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNJLDBCQUFPLEdBQWQ7UUFBQSxpQkFzQ0M7UUFyQ0MsMEVBQTBFO1FBQzFFLDJEQUEyRDtRQUMzRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFJLElBQUUsR0FBRyxVQUFVLENBQUM7Z0JBQ2xCLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQzlDLFlBQVksQ0FBQyxJQUFFLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztZQUNMLHlFQUF5RTtZQUN6RSw0Q0FBNEM7UUFDNUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLElBQUUsR0FBRyxXQUFXLENBQUM7Z0JBQ25CLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNsQyxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO29CQUM5QyxhQUFhLENBQUMsSUFBRSxDQUFDLENBQUM7Z0JBQ3BCLENBQUM7WUFDSCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDVixpRkFBaUY7WUFDakYsaUVBQWlFO1lBQ2pFLDJFQUEyRTtZQUMzRSxnREFBZ0Q7UUFDaEQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxFQUFFLEdBQVMsSUFBSSxlQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxtQkFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNELG1DQUFtQztZQUNuQyxJQUFJLElBQUUsR0FBaUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDO2dCQUNqRixPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7Z0JBQ3pELEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUN4QixLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxFQUFFLEdBQWlCLEtBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDO29CQUNwRixJQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ2pCLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDbkIsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0lBN0ZVLFFBQVE7UUFEcEIsaUJBQVUsRUFBRTtRQWdCUixXQUFBLGFBQU0sQ0FBQyxxQ0FBZ0IsQ0FBQyxDQUFBO1FBQ3hCLFdBQUEsYUFBTSxDQUFDLHFCQUFTLENBQUMsQ0FBQTtRQUNqQixXQUFBLGFBQU0sQ0FBQywyQkFBWSxDQUFDLENBQUE7eUNBRndCLHFDQUFnQjtZQUN4QixxQkFBUztZQUNSLDJCQUFZO09BakJ6QyxRQUFRLENBOEZwQjtJQUFELGVBQUM7Q0FBQSxBQTlGRCxJQThGQztBQTlGWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivc2hhcmUnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSU8gfSBmcm9tICcuL2lvLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMb29wQmFja0F1dGggfSBmcm9tICcuL2F1dGguc2VydmljZSc7XHJcbmltcG9ydCB7IEZpcmVMb29wIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0ZpcmVMb29wJztcclxuaW1wb3J0IHsgU29ja2V0Q29ubmVjdGlvbiB9IGZyb20gJy4uLy4uL3NvY2tldHMvc29ja2V0LmNvbm5lY3Rpb25zJztcclxuaW1wb3J0IHsgU0RLTW9kZWxzIH0gZnJvbSAnLi4vY3VzdG9tL1NES01vZGVscyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3NoYXJlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcclxuLyoqXHJcbiogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dHdpdHRlcjpAam9obmNhc2FycnViaWFzPiA8Z2l0aHViOkBqb2huY2FzYXJydWJpYXM+XHJcbiogQG1vZHVsZSBSZWFsVGltZVxyXG4qIEBsaWNlbnNlIE1JVFxyXG4qIEBkZXNjcmlwdGlvblxyXG4qIFRoaXMgbW9kdWxlIGlzIGEgcmVhbC10aW1lIGludGVyZmFjZSBmb3IgdXNpbmcgc29ja2V0IGNvbm5lY3Rpb25zLCBpdHMgbWFpbiBwdXJwb3NlXHJcbiogaXMgdG8gbWFrZSBzdXJlIHRoYXQgd2hlbiB0aGVyZSBpcyBhIHZhbGlkIGNvbm5lY3Rpb24sIGl0IHdpbGwgY3JlYXRlIGluc3RhbmNlc1xyXG4qIG9mIHRoZSBkaWZmZXJlbnQgcmVhbC10aW1lIGZ1bmN0aW9uYWxpdGllcyBsaWtlIEZpcmVMb29wLCBQdWJTdWIgYW5kIElPLlxyXG4qKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUmVhbFRpbWUge1xyXG4gIHB1YmxpYyBJTzogSU87XHJcbiAgcHVibGljIEZpcmVMb29wOiBGaXJlTG9vcDtcclxuICBwcml2YXRlIGNvbm5lY3Rpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwcml2YXRlIG9uUmVhZHlTdWJqZWN0OiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcbiAgcHJpdmF0ZSBzaGFyZWRPblJlYWR5OiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLm9uUmVhZHlTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpLnNoYXJlKCk7XHJcbiAgLyoqXHJcbiAgKiBAbWV0aG9kIGNvbnN0cnVjdG9yXHJcbiAgKiBAcGFyYW0ge1NvY2tldENvbm5lY3Rpb259IGNvbm5lY3Rpb24gV2ViU29ja2V0IGNvbm5lY3Rpb24gc2VydmljZVxyXG4gICogQHBhcmFtIHtTREtNb2RlbHN9IG1vZGVscyBNb2RlbCBwcm92aWRlciBzZXJ2aWNlXHJcbiAgKiBAcGFyYW0ge0xvb3BCYWNrQXV0aH0gYXV0aCBMb29wQmFjayBhdXRoZW50aWNhdGlvbiBzZXJ2aWNlXHJcbiAgKiBAZGVzY3JpcHRpb25cclxuICAqIEl0IHdpbGwgaW50aWFsaXplIHRoZSBzaGFyZWQgb24gcmVhZHkgY29tbXVuaWNhdGlvbiBjaGFubmVsLlxyXG4gICoqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChTb2NrZXRDb25uZWN0aW9uKSBwdWJsaWMgY29ubmVjdGlvbjogU29ja2V0Q29ubmVjdGlvbixcclxuICAgIEBJbmplY3QoU0RLTW9kZWxzKSBwcm90ZWN0ZWQgbW9kZWxzOiBTREtNb2RlbHMsXHJcbiAgICBASW5qZWN0KExvb3BCYWNrQXV0aCkgcHJvdGVjdGVkIGF1dGg6IExvb3BCYWNrQXV0aFxyXG4gICkge1xyXG4gICAgdGhpcy5zaGFyZWRPblJlYWR5LnN1YnNjcmliZSgpO1xyXG4gIH1cclxuICAvKipcclxuICAqIEBtZXRob2Qgb25EaXNjb25uZWN0XHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59IFxyXG4gICogQGRlc2NyaXB0aW9uXHJcbiAgKiBXaWxsIHRyaWdnZXIgd2hlbiBSZWFsLVRpbWUgU2VydmljZSBpcyBkaXNjb25uZWN0ZWQgZnJvbSBzZXJ2ZXIuXHJcbiAgKiovXHJcbiAgb25EaXNjb25uZWN0KCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uLnNoYXJlZE9ic2VydmFibGVzLnNoYXJlZE9uRGlzY29ubmVjdDtcclxuICB9XHJcbiAgLyoqXHJcbiAgKiBAbWV0aG9kIG9uQXV0aGVudGljYXRlZFxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fSBcclxuICAqIEBkZXNjcmlwdGlvblxyXG4gICogV2lsbCB0cmlnZ2VyIHdoZW4gUmVhbC1UaW1lIFNlcnZpY2UgaXMgYXV0aGVudGljYXRlZCB3aXRoIHRoZSBzZXJ2ZXIuXHJcbiAgKiovXHJcbiAgb25BdXRoZW50aWNhdGVkKCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uLnNoYXJlZE9ic2VydmFibGVzLnNoYXJlZE9uQXV0aGVudGljYXRlZDtcclxuICB9XHJcbiAgLyoqXHJcbiAgKiBAbWV0aG9kIG9uVW5BdXRob3JpemVkXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59IFxyXG4gICogQGRlc2NyaXB0aW9uXHJcbiAgKiBXaWxsIHRyaWdnZXIgd2hlbiBSZWFsLVRpbWUgU2VydmljZSBpcyBub3QgYXV0aG9yaXplZCB0byBjb25uZWN0IHdpdGggdGhlIHNlcnZlci5cclxuICAqKi9cclxuICBvblVuQXV0aG9yaXplZCgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbi5zaGFyZWRPYnNlcnZhYmxlcy5zaGFyZWRPblVuQXV0aG9yaXplZDtcclxuICB9XHJcbiAgLyoqXHJcbiAgKiBAbWV0aG9kIG9uUmVhZHlcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn0gXHJcbiAgKiBAZGVzY3JpcHRpb25cclxuICAqIFdpbGwgdHJpZ2dlciB3aGVuIFJlYWwtVGltZSBTZXJ2aWNlIGlzIFJlYWR5IGZvciBicm9hZGNhc3RpbmcuXHJcbiAgKiBhbmQgd2lsbCByZWdpc3RlciBjb25uZWN0aW9uIGZsb3cgZXZlbnRzIHRvIG5vdGlmeSBzdWJzY3JpYmVycy5cclxuICAqKi9cclxuICBwdWJsaWMgb25SZWFkeSgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgLy8gSWYgdGhlcmUgaXMgYSB2YWxpZCBjb25uZWN0aW9uLCB0aGVuIHdlIGp1c3Qgc2VuZCBiYWNrIHRvIHRoZSBFdmVudExvb3BcclxuICAgIC8vIE9yIG5leHQgd2lsbCBiZSBleGVjdXRlZCBiZWZvcmUgdGhlIGFjdHVhbCBzdWJzY3JpcHRpb24uXHJcbiAgICBpZiAodGhpcy5jb25uZWN0aW9uLmlzQ29ubmVjdGVkKCkpIHtcclxuICAgICAgbGV0IHRvID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5vblJlYWR5U3ViamVjdC5uZXh0KCdzaGFyZWQtY29ubmVjdGlvbicpO1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0byk7XHJcbiAgICAgIH0pO1xyXG4gICAgLy8gRWxzZSBpZiB0aGVyZSBpcyBhIGN1cnJlbnQgYXR0ZW1wdCBvZiBjb25uZWN0aW9uIHdlIHdhaXQgZm9yIHRoZSBwcmlvclxyXG4gICAgLy8gcHJvY2VzcyB0aGF0IHN0YXJ0ZWQgdGhlIGNvbm5lY3Rpb24gZmxvdy5cclxuICAgIH0gZWxzZSBpZiAodGhpcy5jb25uZWN0aW5nKSB7XHJcbiAgICAgIGxldCB0aSA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uLmlzQ29ubmVjdGVkKCkpIHtcclxuICAgICAgICAgIHRoaXMub25SZWFkeVN1YmplY3QubmV4dCgnc2hhcmVkLWNvbm5lY3Rpb24nKTtcclxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgNTAwKTtcclxuICAgIC8vIElmIHRoZXJlIGlzIG5vdCB2YWxpZCBjb25uZWN0aW9uIG9yIGF0dGVtcHQsIHRoZW4gd2Ugc3RhcnQgdGhlIGNvbm5lY3Rpb24gZmxvd1xyXG4gICAgLy8gYW5kIG1ha2Ugc3VyZSB3ZSBub3RpZnkgYWxsIHRoZSBvblJlYWR5IHN1YnNjcmliZXJzIHdoZW4gZG9uZS5cclxuICAgIC8vIEFsc28gaXQgd2lsbCBsaXN0ZW4gZm9yIGRlc2Nvbm5lY3Rpb25zIHNvIHdlIHVuc3Vic2NyaWJlIGFuZCBhdm9pZCBib3RoOlxyXG4gICAgLy8gTWVtb3J5IGxlYWtzIGFuZCBkdXBsaWNhdGVkIHRyaWdnZXJlZCBldmVudHMuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbm5lY3RpbmcgPSB0cnVlO1xyXG4gICAgICB0aGlzLmNvbm5lY3Rpb24uY29ubmVjdCh0aGlzLmF1dGguZ2V0VG9rZW4oKSk7XHJcbiAgICAgIHRoaXMuSU8gICAgICAgPSBuZXcgSU8odGhpcy5jb25uZWN0aW9uKTtcclxuICAgICAgdGhpcy5GaXJlTG9vcCA9IG5ldyBGaXJlTG9vcCh0aGlzLmNvbm5lY3Rpb24sIHRoaXMubW9kZWxzKTtcclxuICAgICAgLy8gRmlyZSBldmVudCBmb3IgdGhvc2Ugc3Vic2NyaWJlZCBcclxuICAgICAgbGV0IHMxOiBTdWJzY3JpcHRpb24gPSB0aGlzLmNvbm5lY3Rpb24uc2hhcmVkT2JzZXJ2YWJsZXMuc2hhcmVkT25Db25uZWN0LnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1JlYWwtVGltZSBjb25uZWN0aW9uIGhhcyBiZWVuIGVzdGFibGlzaGVkJyk7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vblJlYWR5U3ViamVjdC5uZXh0KCdjb25uZWN0ZWQnKTtcclxuICAgICAgICBsZXQgczI6IFN1YnNjcmlwdGlvbiA9IHRoaXMuY29ubmVjdGlvbi5zaGFyZWRPYnNlcnZhYmxlcy5zaGFyZWRPbkRpc2Nvbm5lY3Quc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgIHMxLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgICBzMi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnNoYXJlZE9uUmVhZHk7XHJcbiAgfVxyXG59XHJcbiJdfQ==