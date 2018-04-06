import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page/page";
import { getString } from "tns-core-modules/application-settings/application-settings";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home-connected.component.html",
    styleUrls: ["./home-connected.component.css"]
})
export class HomeConnectedComponent implements OnInit {
  steps: any;
  caloriesBurned:any;
  caloriesConsumed:any;
  mesure:any;
  
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

   constructor(private _page: Page, private router: RouterExtensions)
   {

   }

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        let stepsData=JSON.parse(getString("stepsData", "{}"));
        this.steps=stepsData.number;
        let caloriesBurnedData=JSON.parse(getString("caloriesBurnedData", "{}"));
        this.caloriesBurned=caloriesBurnedData.burned;
        let caloriesConsumedData=JSON.parse(getString("caloriesConsumedData", "{}"));
        this.caloriesConsumed=caloriesConsumedData.consumed;
        this.mesure=JSON.parse(getString("mesure", "{}"));

    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

 
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
    public goToSugar() {
        this.router.navigate(["/add-glucose"], {
          clearHistory: true,
        });
      }
      public goToFood() {
        this.router.navigate(["/alimentation"], {
          clearHistory: true,
        });
      }
      public goToSteps() {
        this.router.navigate(["/steps"], {
        });
      }

      public goToCalories() {
        this.router.navigate(["/calories"], {
        });
      }
 
}
