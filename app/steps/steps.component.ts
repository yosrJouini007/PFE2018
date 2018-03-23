import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page/page";

@Component({
    selector: "Steps",
    moduleId: module.id,
    templateUrl: "./steps.component.html",
    styleUrls: ["./steps.component.css"]
})
export class StepsComponent implements OnInit {

    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

   
   constructor(private _page: Page, private router: RouterExtensions)
   {

   }

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }


 
}
