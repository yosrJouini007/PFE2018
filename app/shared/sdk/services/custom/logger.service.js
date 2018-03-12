"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var core_1 = require("@angular/core");
var lb_config_1 = require("../../lb.config");
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@johncasarrubias>
* @module LoggerService
* @license MIT
* @description
* Console Log wrapper that can be disabled in production mode
**/
var LoggerService = (function () {
    function LoggerService() {
    }
    LoggerService.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (lb_config_1.LoopBackConfig.debuggable())
            console.log.apply(console, args);
    };
    LoggerService.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (lb_config_1.LoopBackConfig.debuggable())
            console.info.apply(console, args);
    };
    LoggerService.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (lb_config_1.LoopBackConfig.debuggable())
            console.error.apply(console, args);
    };
    LoggerService.prototype.count = function (arg) {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.count(arg);
    };
    LoggerService.prototype.group = function (arg) {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.count(arg);
    };
    LoggerService.prototype.groupEnd = function () {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.groupEnd();
    };
    LoggerService.prototype.profile = function (arg) {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.count(arg);
    };
    LoggerService.prototype.profileEnd = function () {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.profileEnd();
    };
    LoggerService.prototype.time = function (arg) {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.time(arg);
    };
    LoggerService.prototype.timeEnd = function (arg) {
        if (lb_config_1.LoopBackConfig.debuggable())
            console.timeEnd(arg);
    };
    LoggerService = __decorate([
        core_1.Injectable()
    ], LoggerService);
    return LoggerService;
}());
exports.LoggerService = LoggerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9CQUFvQjtBQUNwQixzQ0FBMkM7QUFDM0MsNkNBQWlEO0FBQ2pEOzs7Ozs7R0FNRztBQUVIO0lBQUE7SUFtREEsQ0FBQztJQWpEQywyQkFBRyxHQUFIO1FBQUksY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCx5QkFBYzs7UUFDaEIsRUFBRSxDQUFDLENBQUMsMEJBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELDRCQUFJLEdBQUo7UUFBSyxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztRQUNqQixFQUFFLENBQUMsQ0FBQywwQkFBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsNkJBQUssR0FBTDtRQUFNLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQseUJBQWM7O1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLDBCQUFjLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDaEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCw2QkFBSyxHQUFMLFVBQU0sR0FBVztRQUNmLEVBQUUsQ0FBQyxDQUFDLDBCQUFjLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDaEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsNkJBQUssR0FBTCxVQUFNLEdBQVc7UUFDZixFQUFFLENBQUMsQ0FBQywwQkFBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDRSxFQUFFLENBQUMsQ0FBQywwQkFBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsK0JBQU8sR0FBUCxVQUFRLEdBQVc7UUFDakIsRUFBRSxDQUFDLENBQUMsMEJBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNoQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxrQ0FBVSxHQUFWO1FBQ0UsRUFBRSxDQUFDLENBQUMsMEJBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNoQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELDRCQUFJLEdBQUosVUFBSyxHQUFXO1FBQ2QsRUFBRSxDQUFDLENBQUMsMEJBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCwrQkFBTyxHQUFQLFVBQVEsR0FBVztRQUNqQixFQUFFLENBQUMsQ0FBQywwQkFBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQWxEVSxhQUFhO1FBRHpCLGlCQUFVLEVBQUU7T0FDQSxhQUFhLENBbUR6QjtJQUFELG9CQUFDO0NBQUEsQUFuREQsSUFtREM7QUFuRFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IExvb3BCYWNrQ29uZmlnIH0gZnJvbSAnLi4vLi4vbGIuY29uZmlnJztcclxuLyoqXHJcbiogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dHdpdHRlcjpAam9obmNhc2FycnViaWFzPiA8Z2l0aHViOkBqb2huY2FzYXJydWJpYXM+XHJcbiogQG1vZHVsZSBMb2dnZXJTZXJ2aWNlXHJcbiogQGxpY2Vuc2UgTUlUXHJcbiogQGRlc2NyaXB0aW9uXHJcbiogQ29uc29sZSBMb2cgd3JhcHBlciB0aGF0IGNhbiBiZSBkaXNhYmxlZCBpbiBwcm9kdWN0aW9uIG1vZGVcclxuKiovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIExvZ2dlclNlcnZpY2Uge1xyXG5cclxuICBsb2coLi4uYXJnczogYW55W10pIHtcclxuICAgIGlmIChMb29wQmFja0NvbmZpZy5kZWJ1Z2dhYmxlKCkpXHJcbiAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmdzKTtcclxuICB9XHJcblxyXG4gIGluZm8oLi4uYXJnczogYW55W10pIHtcclxuICAgIGlmIChMb29wQmFja0NvbmZpZy5kZWJ1Z2dhYmxlKCkpXHJcbiAgICBjb25zb2xlLmluZm8uYXBwbHkoY29uc29sZSwgYXJncyk7XHJcbiAgfVxyXG5cclxuICBlcnJvciguLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcclxuICAgIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgYXJncyk7XHJcbiAgfVxyXG5cclxuICBjb3VudChhcmc6IHN0cmluZykge1xyXG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcclxuICAgIGNvbnNvbGUuY291bnQoYXJnKTtcclxuICB9XHJcblxyXG4gIGdyb3VwKGFyZzogc3RyaW5nKSB7XHJcbiAgICBpZiAoTG9vcEJhY2tDb25maWcuZGVidWdnYWJsZSgpKVxyXG4gICAgY29uc29sZS5jb3VudChhcmcpO1xyXG4gIH1cclxuXHJcbiAgZ3JvdXBFbmQoKSB7XHJcbiAgICBpZiAoTG9vcEJhY2tDb25maWcuZGVidWdnYWJsZSgpKVxyXG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xyXG4gIH1cclxuXHJcbiAgcHJvZmlsZShhcmc6IHN0cmluZykge1xyXG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcclxuICAgIGNvbnNvbGUuY291bnQoYXJnKTtcclxuICB9XHJcblxyXG4gIHByb2ZpbGVFbmQoKSB7XHJcbiAgICBpZiAoTG9vcEJhY2tDb25maWcuZGVidWdnYWJsZSgpKVxyXG4gICAgY29uc29sZS5wcm9maWxlRW5kKCk7XHJcbiAgfVxyXG5cclxuICB0aW1lKGFyZzogc3RyaW5nKSB7XHJcbiAgICBpZiAoTG9vcEJhY2tDb25maWcuZGVidWdnYWJsZSgpKVxyXG4gICAgY29uc29sZS50aW1lKGFyZyk7XHJcbiAgfVxyXG5cclxuICB0aW1lRW5kKGFyZzogc3RyaW5nKSB7XHJcbiAgICBpZiAoTG9vcEJhY2tDb25maWcuZGVidWdnYWJsZSgpKVxyXG4gICAgY29uc29sZS50aW1lRW5kKGFyZyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==