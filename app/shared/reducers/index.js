"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("@ngrx/store");
var fromApp = require("./app.reducer");
var fromFood = require("./food.reducer");
var fromStep = require("./steps.reducer");
exports.reducers = {
    app: fromApp.reducer,
    food: fromFood.reducer,
    step: fromStep.reducer
};
function logger(reducer) {
    return function (state, action) {
        return reducer(state, action);
    };
}
exports.logger = logger;
exports.getAppState = store_1.createFeatureSelector("app");
exports.getFoodsState = store_1.createFeatureSelector("foods");
exports.getStepState = store_1.createFeatureSelector("steps");
exports.getUser = store_1.createSelector(exports.getAppState, fromApp.getCurrentUser);
exports.getConnexionState = store_1.createSelector(exports.getAppState, fromApp.getConnexionState);
exports.getStartedState = store_1.createSelector(exports.getAppState, fromApp.getStartedState);
exports.getLastAction = store_1.createSelector(exports.getAppState, fromApp.getLastAction);
exports.getFoods = store_1.createSelector(exports.getFoodsState, fromFood.getFoods);
exports.getSelectedFood = store_1.createSelector(exports.getFoodsState, fromFood.getSelectedFood);
exports.getSteps = store_1.createSelector(exports.getStepState, fromStep.getSteps);
exports.getSelectedStep = store_1.createSelector(exports.getStepState, fromStep.getSelectedStep);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQU1xQjtBQUVyQix1Q0FBeUM7QUFDekMseUNBQTJDO0FBQzNDLDBDQUE0QztBQVEvQixRQUFBLFFBQVEsR0FBNEI7SUFDL0MsR0FBRyxFQUFFLE9BQU8sQ0FBQyxPQUFPO0lBQ3BCLElBQUksRUFBRSxRQUFRLENBQUMsT0FBTztJQUN0QixJQUFJLEVBQUUsUUFBUSxDQUFDLE9BQU87Q0FDdkIsQ0FBQztBQUVGLGdCQUF1QixPQUE2QjtJQUNsRCxNQUFNLENBQUMsVUFBVSxLQUFZLEVBQUUsTUFBVztRQUN4QyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUM7QUFDSixDQUFDO0FBSkQsd0JBSUM7QUFFWSxRQUFBLFdBQVcsR0FBRyw2QkFBcUIsQ0FBZ0IsS0FBSyxDQUFDLENBQUM7QUFDMUQsUUFBQSxhQUFhLEdBQUcsNkJBQXFCLENBQWlCLE9BQU8sQ0FBQyxDQUFDO0FBQy9ELFFBQUEsWUFBWSxHQUFHLDZCQUFxQixDQUFpQixPQUFPLENBQUMsQ0FBQztBQUc5RCxRQUFBLE9BQU8sR0FBRyxzQkFBYyxDQUFDLG1CQUFXLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzlELFFBQUEsaUJBQWlCLEdBQUcsc0JBQWMsQ0FDN0MsbUJBQVcsRUFDWCxPQUFPLENBQUMsaUJBQWlCLENBQzFCLENBQUM7QUFDVyxRQUFBLGVBQWUsR0FBRyxzQkFBYyxDQUMzQyxtQkFBVyxFQUNYLE9BQU8sQ0FBQyxlQUFlLENBQ3hCLENBQUM7QUFDVyxRQUFBLGFBQWEsR0FBRyxzQkFBYyxDQUFDLG1CQUFXLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ25FLFFBQUEsUUFBUSxHQUFHLHNCQUFjLENBQUMscUJBQWEsRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFNUQsUUFBQSxlQUFlLEdBQUcsc0JBQWMsQ0FDM0MscUJBQWEsRUFDYixRQUFRLENBQUMsZUFBZSxDQUN6QixDQUFDO0FBQ1csUUFBQSxRQUFRLEdBQUcsc0JBQWMsQ0FDcEMsb0JBQVksRUFDWixRQUFRLENBQUMsUUFBUSxDQUNsQixDQUFDO0FBRVcsUUFBQSxlQUFlLEdBQUcsc0JBQWMsQ0FDM0Msb0JBQVksRUFDWixRQUFRLENBQUMsZUFBZSxDQUN6QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBY3Rpb25SZWR1Y2VyTWFwLFxyXG4gIGNyZWF0ZVNlbGVjdG9yLFxyXG4gIGNyZWF0ZUZlYXR1cmVTZWxlY3RvcixcclxuICBBY3Rpb25SZWR1Y2VyLFxyXG4gIE1ldGFSZWR1Y2VyXHJcbn0gZnJvbSBcIkBuZ3J4L3N0b3JlXCI7XHJcbmltcG9ydCB7IHN0b3JlRnJlZXplIH0gZnJvbSBcIm5ncngtc3RvcmUtZnJlZXplXCI7XHJcbmltcG9ydCAqIGFzIGZyb21BcHAgZnJvbSBcIi4vYXBwLnJlZHVjZXJcIjtcclxuaW1wb3J0ICogYXMgZnJvbUZvb2QgZnJvbSBcIi4vZm9vZC5yZWR1Y2VyXCI7XHJcbmltcG9ydCAqIGFzIGZyb21TdGVwIGZyb20gXCIuL3N0ZXBzLnJlZHVjZXJcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xyXG4gIGFwcDogZnJvbUFwcC5TdGF0ZTtcclxuICBmb29kOiBmcm9tRm9vZC5TdGF0ZTtcclxuICBzdGVwOiBmcm9tU3RlcC5TdGF0ZTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPFN0YXRlPiA9IHtcclxuICBhcHA6IGZyb21BcHAucmVkdWNlcixcclxuICBmb29kOiBmcm9tRm9vZC5yZWR1Y2VyLFxyXG4gIHN0ZXA6IGZyb21TdGVwLnJlZHVjZXJcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2dnZXIocmVkdWNlcjogQWN0aW9uUmVkdWNlcjxTdGF0ZT4pOiBBY3Rpb25SZWR1Y2VyPFN0YXRlPiB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdGF0ZTogU3RhdGUsIGFjdGlvbjogYW55KTogU3RhdGUge1xyXG4gICAgcmV0dXJuIHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldEFwcFN0YXRlID0gY3JlYXRlRmVhdHVyZVNlbGVjdG9yPGZyb21BcHAuU3RhdGU+KFwiYXBwXCIpO1xyXG5leHBvcnQgY29uc3QgZ2V0Rm9vZHNTdGF0ZSA9IGNyZWF0ZUZlYXR1cmVTZWxlY3Rvcjxmcm9tRm9vZC5TdGF0ZT4oXCJmb29kc1wiKTtcclxuZXhwb3J0IGNvbnN0IGdldFN0ZXBTdGF0ZSA9IGNyZWF0ZUZlYXR1cmVTZWxlY3Rvcjxmcm9tU3RlcC5TdGF0ZT4oXCJzdGVwc1wiKTtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VXNlciA9IGNyZWF0ZVNlbGVjdG9yKGdldEFwcFN0YXRlLCBmcm9tQXBwLmdldEN1cnJlbnRVc2VyKTtcclxuZXhwb3J0IGNvbnN0IGdldENvbm5leGlvblN0YXRlID0gY3JlYXRlU2VsZWN0b3IoXHJcbiAgZ2V0QXBwU3RhdGUsXHJcbiAgZnJvbUFwcC5nZXRDb25uZXhpb25TdGF0ZVxyXG4pO1xyXG5leHBvcnQgY29uc3QgZ2V0U3RhcnRlZFN0YXRlID0gY3JlYXRlU2VsZWN0b3IoXHJcbiAgZ2V0QXBwU3RhdGUsXHJcbiAgZnJvbUFwcC5nZXRTdGFydGVkU3RhdGVcclxuKTtcclxuZXhwb3J0IGNvbnN0IGdldExhc3RBY3Rpb24gPSBjcmVhdGVTZWxlY3RvcihnZXRBcHBTdGF0ZSwgZnJvbUFwcC5nZXRMYXN0QWN0aW9uKTtcclxuZXhwb3J0IGNvbnN0IGdldEZvb2RzID0gY3JlYXRlU2VsZWN0b3IoZ2V0Rm9vZHNTdGF0ZSwgZnJvbUZvb2QuZ2V0Rm9vZHMpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFNlbGVjdGVkRm9vZCA9IGNyZWF0ZVNlbGVjdG9yKFxyXG4gIGdldEZvb2RzU3RhdGUsXHJcbiAgZnJvbUZvb2QuZ2V0U2VsZWN0ZWRGb29kXHJcbik7XHJcbmV4cG9ydCBjb25zdCBnZXRTdGVwcyA9IGNyZWF0ZVNlbGVjdG9yKFxyXG4gIGdldFN0ZXBTdGF0ZSxcclxuICBmcm9tU3RlcC5nZXRTdGVwc1xyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFNlbGVjdGVkU3RlcCA9IGNyZWF0ZVNlbGVjdG9yKFxyXG4gIGdldFN0ZXBTdGF0ZSxcclxuICBmcm9tU3RlcC5nZXRTZWxlY3RlZFN0ZXBcclxuKTtcclxuXHJcblxyXG4iXX0=