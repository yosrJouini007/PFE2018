"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appActions = require("../actions/app.actions");
exports.initialState = {
    user: {},
    lastAction: "",
    connexion: "none",
    started: false
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case "LOAD_FAILED":
            console.log(JSON.stringify(action.payload));
            return newState(state, {});
        case appActions.FIRE_ACTION:
            return newState(state, {
                lastAction: action.payload
            });
        case appActions.STARTED:
            return newState(state, {
                started: true
            });
        case appActions.SET_CONNEXION:
            return newState(state, {
                connexion: action.payload
            });
        case appActions.SET_USER:
            return newState(state, {
                user: action.payload
            });
        case appActions.RESET_USER:
            return newState(state, {
                user: {}
            });
        default:
            return state;
    }
}
exports.reducer = reducer;
exports.getLastAction = function (state) { return state.lastAction; };
exports.getCurrentUser = function (state) { return state.user; };
exports.getConnexionState = function (state) { return state.connexion; };
exports.getStartedState = function (state) { return state.started; };
var newState = function (state, newData) {
    return Object.assign({}, state, newData);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucmVkdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1EQUFxRDtBQVF4QyxRQUFBLFlBQVksR0FBVTtJQUNqQyxJQUFJLEVBQUUsRUFBRTtJQUNSLFVBQVUsRUFBRSxFQUFFO0lBQ2QsU0FBUyxFQUFFLE1BQU07SUFDakIsT0FBTyxFQUFFLEtBQUs7Q0FDZixDQUFDO0FBRUYsaUJBQXdCLEtBQW9CLEVBQUUsTUFBTTtJQUE1QixzQkFBQSxFQUFBLFFBQVEsb0JBQVk7SUFDMUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEIsS0FBSyxhQUFhO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzdDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLEtBQUssVUFBVSxDQUFDLFdBQVc7WUFDekIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3JCLFVBQVUsRUFBRSxNQUFNLENBQUMsT0FBTzthQUMzQixDQUFDLENBQUM7UUFDTCxLQUFLLFVBQVUsQ0FBQyxPQUFPO1lBQ3JCLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO2dCQUNyQixPQUFPLEVBQUUsSUFBSTthQUNkLENBQUMsQ0FBQztRQUNMLEtBQUssVUFBVSxDQUFDLGFBQWE7WUFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3JCLFNBQVMsRUFBRSxNQUFNLENBQUMsT0FBTzthQUMxQixDQUFDLENBQUM7UUFDTCxLQUFLLFVBQVUsQ0FBQyxRQUFRO1lBQ3RCLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO2dCQUNyQixJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU87YUFDckIsQ0FBQyxDQUFDO1FBQ0wsS0FBSyxVQUFVLENBQUMsVUFBVTtZQUN4QixNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtnQkFDckIsSUFBSSxFQUFFLEVBQUU7YUFDVCxDQUFDLENBQUM7UUFFTDtZQUNFLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztBQUNILENBQUM7QUE3QkQsMEJBNkJDO0FBRVksUUFBQSxhQUFhLEdBQUcsVUFBQyxLQUFZLElBQUssT0FBQSxLQUFLLENBQUMsVUFBVSxFQUFoQixDQUFnQixDQUFDO0FBQ25ELFFBQUEsY0FBYyxHQUFHLFVBQUMsS0FBWSxJQUFLLE9BQUEsS0FBSyxDQUFDLElBQUksRUFBVixDQUFVLENBQUM7QUFDOUMsUUFBQSxpQkFBaUIsR0FBRyxVQUFDLEtBQVksSUFBSyxPQUFBLEtBQUssQ0FBQyxTQUFTLEVBQWYsQ0FBZSxDQUFDO0FBQ3RELFFBQUEsZUFBZSxHQUFHLFVBQUMsS0FBWSxJQUFLLE9BQUEsS0FBSyxDQUFDLE9BQU8sRUFBYixDQUFhLENBQUM7QUFFL0QsSUFBTSxRQUFRLEdBQUcsVUFBQyxLQUFLLEVBQUUsT0FBTztJQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSBcInJlc2VsZWN0XCI7XHJcbmltcG9ydCAqIGFzIGFwcEFjdGlvbnMgZnJvbSBcIi4uL2FjdGlvbnMvYXBwLmFjdGlvbnNcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xyXG4gIHVzZXI6IGFueTtcclxuICBsYXN0QWN0aW9uOiBzdHJpbmc7XHJcbiAgY29ubmV4aW9uOiBzdHJpbmc7XHJcbiAgc3RhcnRlZDogYm9vbGVhbjtcclxufVxyXG5leHBvcnQgY29uc3QgaW5pdGlhbFN0YXRlOiBTdGF0ZSA9IHtcclxuICB1c2VyOiB7fSxcclxuICBsYXN0QWN0aW9uOiBcIlwiLFxyXG4gIGNvbm5leGlvbjogXCJub25lXCIsXHJcbiAgc3RhcnRlZDogZmFsc2VcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2VyKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcclxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICBjYXNlIFwiTE9BRF9GQUlMRURcIjpcclxuICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGFjdGlvbi5wYXlsb2FkKSk7XHJcbiAgICAgIHJldHVybiBuZXdTdGF0ZShzdGF0ZSAsIHt9KTtcclxuICAgIGNhc2UgYXBwQWN0aW9ucy5GSVJFX0FDVElPTjpcclxuICAgICAgcmV0dXJuIG5ld1N0YXRlKHN0YXRlLCB7XHJcbiAgICAgICAgbGFzdEFjdGlvbjogYWN0aW9uLnBheWxvYWRcclxuICAgICAgfSk7XHJcbiAgICBjYXNlIGFwcEFjdGlvbnMuU1RBUlRFRDpcclxuICAgICAgcmV0dXJuIG5ld1N0YXRlKHN0YXRlLCB7XHJcbiAgICAgICAgc3RhcnRlZDogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIGNhc2UgYXBwQWN0aW9ucy5TRVRfQ09OTkVYSU9OOlxyXG4gICAgICByZXR1cm4gbmV3U3RhdGUoc3RhdGUsIHtcclxuICAgICAgICBjb25uZXhpb246IGFjdGlvbi5wYXlsb2FkXHJcbiAgICAgIH0pO1xyXG4gICAgY2FzZSBhcHBBY3Rpb25zLlNFVF9VU0VSOlxyXG4gICAgICByZXR1cm4gbmV3U3RhdGUoc3RhdGUsIHtcclxuICAgICAgICB1c2VyOiBhY3Rpb24ucGF5bG9hZFxyXG4gICAgICB9KTtcclxuICAgIGNhc2UgYXBwQWN0aW9ucy5SRVNFVF9VU0VSOlxyXG4gICAgICByZXR1cm4gbmV3U3RhdGUoc3RhdGUsIHtcclxuICAgICAgICB1c2VyOiB7fVxyXG4gICAgICB9KTtcclxuXHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gc3RhdGU7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0TGFzdEFjdGlvbiA9IChzdGF0ZTogU3RhdGUpID0+IHN0YXRlLmxhc3RBY3Rpb247XHJcbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50VXNlciA9IChzdGF0ZTogU3RhdGUpID0+IHN0YXRlLnVzZXI7XHJcbmV4cG9ydCBjb25zdCBnZXRDb25uZXhpb25TdGF0ZSA9IChzdGF0ZTogU3RhdGUpID0+IHN0YXRlLmNvbm5leGlvbjtcclxuZXhwb3J0IGNvbnN0IGdldFN0YXJ0ZWRTdGF0ZSA9IChzdGF0ZTogU3RhdGUpID0+IHN0YXRlLnN0YXJ0ZWQ7XHJcblxyXG5jb25zdCBuZXdTdGF0ZSA9IChzdGF0ZSwgbmV3RGF0YSkgPT4ge1xyXG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3RGF0YSk7XHJcbn07XHJcbiJdfQ==