"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var Subject_1 = require("rxjs/Subject");
var IO = (function () {
    function IO(socket) {
        this.observables = {};
        this.socket = socket;
    }
    IO.prototype.emit = function (event, data) {
        this.socket.emit('ME:RT:1://event', {
            event: event,
            data: data
        });
    };
    IO.prototype.on = function (event) {
        if (this.observables[event]) {
            return this.observables[event];
        }
        var subject = new Subject_1.Subject();
        this.socket.on(event, function (res) { return subject.next(res); });
        this.observables[event] = subject.asObservable();
        return this.observables[event];
    };
    return IO;
}());
exports.IO = IO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQkFBb0I7QUFDcEIsd0NBQXVDO0FBR3ZDO0lBS0UsWUFBWSxNQUFXO1FBRmYsZ0JBQVcsR0FBUSxFQUFFLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUFDLENBQUM7SUFFbEQsaUJBQUksR0FBSixVQUFLLEtBQWEsRUFBRSxJQUFTO1FBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ2hDLEtBQUssRUFBRyxLQUFLO1lBQ2IsSUFBSSxFQUFJLElBQUk7U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsZUFBRSxHQUFGLFVBQUcsS0FBYTtRQUNkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQ2hFLElBQUksT0FBTyxHQUFpQixJQUFJLGlCQUFPLEVBQU8sQ0FBQztRQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsVUFBQyxHQUFRLElBQUssT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFqQixDQUFpQixDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNILFNBQUM7QUFBRCxDQUFDLEFBckJELElBcUJDO0FBckJZLGdCQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIElPIHtcclxuXHJcbiAgcHJpdmF0ZSBzb2NrZXQ6IGFueTtcclxuICBwcml2YXRlIG9ic2VydmFibGVzOiBhbnkgPSB7fTtcclxuXHJcbiAgY29uc3RydWN0b3Ioc29ja2V0OiBhbnkpIHsgdGhpcy5zb2NrZXQgPSBzb2NrZXQ7IH1cclxuXHJcbiAgZW1pdChldmVudDogc3RyaW5nLCBkYXRhOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMuc29ja2V0LmVtaXQoJ01FOlJUOjE6Ly9ldmVudCcsIHtcclxuICAgICAgICBldmVudCA6IGV2ZW50LFxyXG4gICAgICAgIGRhdGEgIDogZGF0YVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvbihldmVudDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGlmICh0aGlzLm9ic2VydmFibGVzW2V2ZW50XSkgeyByZXR1cm4gdGhpcy5vYnNlcnZhYmxlc1tldmVudF07IH1cclxuICAgIGxldCBzdWJqZWN0OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcbiAgICB0aGlzLnNvY2tldC5vbihldmVudCwgKHJlczogYW55KSA9PiBzdWJqZWN0Lm5leHQocmVzKSk7XHJcbiAgICB0aGlzLm9ic2VydmFibGVzW2V2ZW50XSA9IHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICByZXR1cm4gdGhpcy5vYnNlcnZhYmxlc1tldmVudF07XHJcbiAgfVxyXG59XHJcbiJdfQ==