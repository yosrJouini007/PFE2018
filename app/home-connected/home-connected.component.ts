import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page/page";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home-connected.component.html",
    styleUrls: ["./home-connected.component.css"]
})
export class HomeConnectedComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    /* ***********************************************************
    * Use the sideDrawerTransition perty to change the open/close animation of the drawer.
    *************************************************************/
   constructor(private _page: Page, private router: RouterExtensions)
   {

   }

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
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
