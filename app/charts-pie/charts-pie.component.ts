import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page/page";
import { DataService } from './data-service/data.service';
import {Country } from './data-service/data';
import { ObservableArray } from "tns-core-modules/data/observable-array";


@Component({
    selector: "Charts",
    moduleId: module.id,
    providers: [DataService],
    templateUrl: "./charts-pie.component.html",
  //  styleUrls: ["./home.component.css"]
})
export class ChartsPieComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;
    private _Source: ObservableArray<Country>;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
   constructor(private _page: Page, private router: RouterExtensions,private _dataService: DataService)
   {

   }
   
   get Source(): ObservableArray<Country> {
    return this._Source;
}

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this._Source = new ObservableArray(this._dataService.getCategoricalSource());
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

 
}
