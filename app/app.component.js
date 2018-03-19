"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
// Redux & RxJS
var store_1 = require("@ngrx/store");
var fromRoot = require("./shared/reducers");
var appAction = require("./shared/actions/app.actions");
var sdk_1 = require("./shared/sdk");
var application_settings_1 = require("application-settings");
//Services
var sdk_2 = require("./shared/sdk");
var AppComponent = (function () {
    // private API_URL = API_URL;
    function AppComponent(store, router, loopBackAuth, guestsApi) {
        this.store = store;
        this.router = router;
        this.loopBackAuth = loopBackAuth;
        this.guestsApi = guestsApi;
        // LoopBackConfig.setBaseURL(API_URL.replace("/api/", ""));
        /* LoopBackConfig.setApiVersion("api");
         connectivity.startMonitoring((connectionType: number) => {
           switch (connectionType) {
             case connectivity.connectionType.none:
               this.store.dispatch(new appAction.SetConnexionAction("NONE"));
               break;
             case connectivity.connectionType.wifi:
               this.store.dispatch(new appAction.SetConnexionAction("WIFI"));
               break;
             case connectivity.connectionType.mobile:
               this.store.dispatch(new appAction.SetConnexionAction("MOBILE"));
               break;
             default:
               break;
           }
         });*/
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var user = this.loopBackAuth.getCurrentUserData();
        if (this.loopBackAuth.getCurrentUserData()) {
            this.loadProfile();
        }
        // Load current session after the OS or User kill the app
        /*
        let currentSessionSTR = getString("current_session", "");
        try {
          let currentSession = JSON.parse(currentSessionSTR);
          this.store.dispatch(
            new sessionAction.SelectAction(currentSession.startAt)
          );
    
          console.log(currentSession.startAt);
          this.store.dispatch(
            new stopWatchAction.StartAction({
              gym: {}
            })
          );
        } catch (e) {
          console.log("current session error");
          console.log(e);
        }
        */
        this.store.select(fromRoot.getLastAction).subscribe(function (action) {
            if (action == "logout") {
                _this.router.navigate(["home"], {
                    clearHistory: true,
                    transition: {
                        name: "slide"
                    }
                });
                _this.store.dispatch(new appAction.RestUserAction());
                application_settings_1.remove("guest_profile");
                application_settings_1.remove("phoneNumber");
            }
            else if (action == "login") {
                var user_1 = _this.loopBackAuth.getCurrentUserData();
                _this.loadProfile();
            }
        });
        this.isFirstTime = application_settings_1.getBoolean("isFirstTime", true);
        application_settings_1.setBoolean("isFirstTime", false);
        //First load after the Install
        if (this.isFirstTime) {
            this.router.navigate(["/alimentation"], {
                clearHistory: true,
                transition: {
                    name: "fade",
                    duration: 200,
                    curve: "linear"
                }
            });
        }
        else {
            // Load Gym page from the the second load
            this.router.navigate(["/alimentation"], {
                transition: {
                    clearHistory: true,
                    name: "fade",
                    duration: 200,
                    curve: "linear"
                }
            });
        }
    };
    AppComponent.prototype.loadProfile = function () {
        var _this = this;
        var _userId = this.loopBackAuth.getCurrentUserId();
        console.log("_userId");
        console.log(_userId);
        this.guestsApi
            .findOne({
            where: {
                userId: { eq: _userId }
            }
        })
            .subscribe(function (profile) {
            application_settings_1.setString("guest_profile", JSON.stringify(profile));
            _this.store.dispatch(new appAction.SetUserAction(profile));
        }, function (error) {
            var profile = application_settings_1.getString("guest_profile", "{}");
            try {
                var profileJSON = JSON.parse(profile);
                _this.store.dispatch(new appAction.SetUserAction(profileJSON));
            }
            catch (e) {
                console.log('Error : ' + JSON.stringify(e));
            }
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            templateUrl: "app.component.html"
        }),
        __metadata("design:paramtypes", [store_1.Store,
            router_1.RouterExtensions,
            sdk_1.LoopBackAuth,
            sdk_2.GuestsApi])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0RBQStEO0FBRS9ELGVBQWU7QUFDZixxQ0FBb0M7QUFDcEMsNENBQThDO0FBQzlDLHdEQUEwRDtBQUsxRCxvQ0FBNEQ7QUFFNUQsNkRBTzhCO0FBRTlCLFVBQVU7QUFDVixvQ0FBeUM7QUFPekM7SUFFQyw2QkFBNkI7SUFDNUIsc0JBQ1UsS0FBNEIsRUFDNUIsTUFBd0IsRUFDeEIsWUFBMEIsRUFDMUIsU0FBb0I7UUFIcEIsVUFBSyxHQUFMLEtBQUssQ0FBdUI7UUFDNUIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUU3QiwyREFBMkQ7UUFDM0Q7Ozs7Ozs7Ozs7Ozs7OztjQWVNO0lBQ1AsQ0FBQztJQUVELCtCQUFRLEdBQVI7UUFBQSxpQkFvRUM7UUFuRUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLENBQUM7UUFFRCx5REFBeUQ7UUFDekQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQWtCRTtRQUVGLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ3hELEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUM3QixZQUFZLEVB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QzlDLENBQUM7UUFDSCxDQUFDLENBQ0YsQ0FBQztJQUNOLENBQUM7SUE1SFUsWUFBWTtRQUp4QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLG9CQUFvQjtTQUNsQyxDQUFDO3lDQUtpQixhQUFLO1lBQ0oseUJBQWdCO1lBQ1Ysa0JBQVk7WUFDZixlQUFTO09BUG5CLFlBQVksQ0E2SHhCO0lBQUQsbUJBQUM7Q0FBQSxBQTdIRCxJQTZIQztBQTdIWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbi8vIFJlZHV4ICYgUnhKU1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tIFwiQG5ncngvc3RvcmVcIjtcbmltcG9ydCAqIGFzIGZyb21Sb290IGZyb20gXCIuL3NoYXJlZC9yZWR1Y2Vyc1wiO1xuaW1wb3J0ICogYXMgYXBwQWN0aW9uIGZyb20gXCIuL3NoYXJlZC9hY3Rpb25zL2FwcC5hY3Rpb25zXCI7XG5cbi8vUGxhdGZvcm0gJiBzZXR0aW5ncyBcbi8vaW1wb3J0IHsgQVBJX1VSTCB9IGZyb20gXCIuL3NoYXJlZC9zZXR0aW5ncy9zZXR0aW5ncy5zdGF0aWNcIjtcbmltcG9ydCAqIGFzIGNvbm5lY3Rpdml0eSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XG5pbXBvcnQgeyBMb29wQmFja0NvbmZpZywgTG9vcEJhY2tBdXRoIH0gZnJvbSBcIi4vc2hhcmVkL3Nka1wiO1xuXG5pbXBvcnQge1xuICBnZXRCb29sZWFuLFxuICBzZXRCb29sZWFuLFxuICBzZXRTdHJpbmcsXG4gIGdldFN0cmluZyxcbiAgY2xlYXIsXG4gIHJlbW92ZVxufSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcblxuLy9TZXJ2aWNlc1xuaW1wb3J0IHsgR3Vlc3RzQXBpIH0gZnJvbSBcIi4vc2hhcmVkL3Nka1wiO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJucy1hcHBcIixcbiAgdGVtcGxhdGVVcmw6IFwiYXBwLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHJpdmF0ZSBpc0ZpcnN0VGltZTtcbiAvLyBwcml2YXRlIEFQSV9VUkwgPSBBUElfVVJMO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHN0b3JlOiBTdG9yZTxmcm9tUm9vdC5TdGF0ZT4sXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgcHJpdmF0ZSBsb29wQmFja0F1dGg6IExvb3BCYWNrQXV0aCxcbiAgICBwcml2YXRlIGd1ZXN0c0FwaTogR3Vlc3RzQXBpXG4gICkge1xuICAgLy8gTG9vcEJhY2tDb25maWcuc2V0QmFzZVVSTChBUElfVVJMLnJlcGxhY2UoXCIvYXBpL1wiLCBcIlwiKSk7XG4gICAvKiBMb29wQmFja0NvbmZpZy5zZXRBcGlWZXJzaW9uKFwiYXBpXCIpO1xuICAgIGNvbm5lY3Rpdml0eS5zdGFydE1vbml0b3JpbmcoKGNvbm5lY3Rpb25UeXBlOiBudW1iZXIpID0+IHtcbiAgICAgIHN3aXRjaCAoY29ubmVjdGlvblR5cGUpIHtcbiAgICAgICAgY2FzZSBjb25uZWN0aXZpdHkuY29ubmVjdGlvblR5cGUubm9uZTpcbiAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBhcHBBY3Rpb24uU2V0Q29ubmV4aW9uQWN0aW9uKFwiTk9ORVwiKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLndpZmk6XG4gICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLlNldENvbm5leGlvbkFjdGlvbihcIldJRklcIikpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGNvbm5lY3Rpdml0eS5jb25uZWN0aW9uVHlwZS5tb2JpbGU6XG4gICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLlNldENvbm5leGlvbkFjdGlvbihcIk1PQklMRVwiKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7Ki9cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGxldCB1c2VyID0gdGhpcy5sb29wQmFja0F1dGguZ2V0Q3VycmVudFVzZXJEYXRhKCk7XG4gICAgaWYgKHRoaXMubG9vcEJhY2tBdXRoLmdldEN1cnJlbnRVc2VyRGF0YSgpKSB7XG4gICAgICB0aGlzLmxvYWRQcm9maWxlKCk7XG4gICAgfVxuXG4gICAgLy8gTG9hZCBjdXJyZW50IHNlc3Npb24gYWZ0ZXIgdGhlIE9TIG9yIFVzZXIga2lsbCB0aGUgYXBwXG4gICAgLypcbiAgICBsZXQgY3VycmVudFNlc3Npb25TVFIgPSBnZXRTdHJpbmcoXCJjdXJyZW50X3Nlc3Npb25cIiwgXCJcIik7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBjdXJyZW50U2Vzc2lvbiA9IEpTT04ucGFyc2UoY3VycmVudFNlc3Npb25TVFIpO1xuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgbmV3IHNlc3Npb25BY3Rpb24uU2VsZWN0QWN0aW9uKGN1cnJlbnRTZXNzaW9uLnN0YXJ0QXQpXG4gICAgICApO1xuXG4gICAgICBjb25zb2xlLmxvZyhjdXJyZW50U2Vzc2lvbi5zdGFydEF0KTtcbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgIG5ldyBzdG9wV2F0Y2hBY3Rpb24uU3RhcnRBY3Rpb24oe1xuICAgICAgICAgIGd5bToge31cbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coXCJjdXJyZW50IHNlc3Npb24gZXJyb3JcIik7XG4gICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG4gICAgKi9cblxuICAgIHRoaXMuc3RvcmUuc2VsZWN0KGZyb21Sb290LmdldExhc3RBY3Rpb24pLnN1YnNjcmliZShhY3Rpb24gPT4ge1xuICAgICAgaWYgKGFjdGlvbiA9PSBcImxvZ291dFwiKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcImhvbWVcIl0sIHtcbiAgICAgICAgICBjbGVhckhpc3Rvcnk6IHRydWUsXG4gICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgbmFtZTogXCJzbGlkZVwiXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLlJlc3RVc2VyQWN0aW9uKCkpO1xuICAgICAgICByZW1vdmUoXCJndWVzdF9wcm9maWxlXCIpO1xuICAgICAgICByZW1vdmUoXCJwaG9uZU51bWJlclwiKTtcbiAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09IFwibG9naW5cIikge1xuICAgICAgICBsZXQgdXNlciA9IHRoaXMubG9vcEJhY2tBdXRoLmdldEN1cnJlbnRVc2VyRGF0YSgpO1xuICAgICAgICB0aGlzLmxvYWRQcm9maWxlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmlzRmlyc3RUaW1lID0gZ2V0Qm9vbGVhbihcImlzRmlyc3RUaW1lXCIsIHRydWUpO1xuICAgIHNldEJvb2xlYW4oXCJpc0ZpcnN0VGltZVwiLCBmYWxzZSk7XG5cbiAgICAvL0ZpcnN0IGxvYWQgYWZ0ZXIgdGhlIEluc3RhbGxcbiAgICBpZiAodGhpcy5pc0ZpcnN0VGltZSkge1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2FsaW1lbnRhdGlvblwiXSwge1xuICAgICAgICBjbGVhckhpc3Rvcnk6IHRydWUsXG4gICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICBuYW1lOiBcImZhZGVcIixcbiAgICAgICAgICBkdXJhdGlvbjogMjAwLFxuICAgICAgICAgIGN1cnZlOiBcImxpbmVhclwiXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBMb2FkIEd5bSBwYWdlIGZyb20gdGhlIHRoZSBzZWNvbmQgbG9hZFxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2FsaW1lbnRhdGlvblwiXSwge1xuICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlLFxuICAgICAgICAgIG5hbWU6IFwiZmFkZVwiLFxuICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgICAgY3VydmU6IFwibGluZWFyXCJcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbG9hZFByb2ZpbGUoKSB7XG4gICAgbGV0IF91c2VySWQgPSB0aGlzLmxvb3BCYWNrQXV0aC5nZXRDdXJyZW50VXNlcklkKCk7XG4gICAgY29uc29sZS5sb2coXCJfdXNlcklkXCIpO1xuICAgIGNvbnNvbGUubG9nKF91c2VySWQpO1xuICAgIHRoaXMuZ3Vlc3RzQXBpXG4gICAgICAuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgdXNlcklkOiB7IGVxOiBfdXNlcklkIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIChwcm9maWxlOiBhbnkpID0+IHtcbiAgICAgICAgICBzZXRTdHJpbmcoXCJndWVzdF9wcm9maWxlXCIsIEpTT04uc3RyaW5naWZ5KHByb2ZpbGUpKTtcbiAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBhcHBBY3Rpb24uU2V0VXNlckFjdGlvbihwcm9maWxlKSk7XG4gICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgIGxldCBwcm9maWxlID0gZ2V0U3RyaW5nKFwiZ3Vlc3RfcHJvZmlsZVwiLCBcInt9XCIpO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgcHJvZmlsZUpTT04gPSBKU09OLnBhcnNlKHByb2ZpbGUpO1xuICAgICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgYXBwQWN0aW9uLlNldFVzZXJBY3Rpb24ocHJvZmlsZUpTT04pKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgOiAnICsgSlNPTi5zdHJpbmdpZnkoZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKTtcbiAgfVxufVxuIl19