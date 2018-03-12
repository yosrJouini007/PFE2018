"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var index_1 = require("./index");
var FireLoop = (function () {
    function FireLoop(socket, models) {
        this.socket = socket;
        this.models = models;
        this.references = {};
    }
    FireLoop.prototype.ref = function (model) {
        var name = model.getModelName();
        model.models = this.models;
        this.references[name] = new index_1.FireLoopRef(model, this.socket);
        return this.references[name];
    };
    return FireLoop;
}());
exports.FireLoop = FireLoop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlyZUxvb3AuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGaXJlTG9vcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9CQUFvQjtBQUNwQixpQ0FBc0M7QUFFdEM7SUFJRSxrQkFBb0IsTUFBVyxFQUFVLE1BQXlCO1FBQTlDLFdBQU0sR0FBTixNQUFNLENBQUs7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUYxRCxlQUFVLEdBQVEsRUFBRSxDQUFDO0lBRXdDLENBQUM7SUFFL0Qsc0JBQUcsR0FBVixVQUFjLEtBQVU7UUFDdEIsSUFBSSxJQUFJLEdBQVcsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksbUJBQVcsQ0FBSSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9ELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDSCxlQUFDO0FBQUQsQ0FBQyxBQVpELElBWUM7QUFaWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXHJcbmltcG9ydCB7IEZpcmVMb29wUmVmIH0gZnJvbSAnLi9pbmRleCc7XHJcblxyXG5leHBvcnQgY2xhc3MgRmlyZUxvb3Age1xyXG5cclxuICBwcml2YXRlIHJlZmVyZW5jZXM6IGFueSA9IHt9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNvY2tldDogYW55LCBwcml2YXRlIG1vZGVsczogeyBnZXQ6IEZ1bmN0aW9uIH0pIHt9XHJcblxyXG4gIHB1YmxpYyByZWY8VD4obW9kZWw6IGFueSk6IEZpcmVMb29wUmVmPFQ+IHtcclxuICAgIGxldCBuYW1lOiBzdHJpbmcgPSBtb2RlbC5nZXRNb2RlbE5hbWUoKTtcclxuICAgIG1vZGVsLm1vZGVscyA9IHRoaXMubW9kZWxzO1xyXG4gICAgdGhpcy5yZWZlcmVuY2VzW25hbWVdID0gbmV3IEZpcmVMb29wUmVmPFQ+KG1vZGVsLCB0aGlzLnNvY2tldCk7XHJcbiAgICByZXR1cm4gdGhpcy5yZWZlcmVuY2VzW25hbWVdO1xyXG4gIH1cclxufVxyXG4iXX0=