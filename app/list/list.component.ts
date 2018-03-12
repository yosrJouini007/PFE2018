import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page/page";
class Country {
    constructor(public name: string) { }
}

let meals = ["Burger", "Breakfast", "Dinner", "Chicken", "Cyprus", "Lunch",
    "Pizza", "Spaghetti", "Milk", ];
@Component({
    selector: "List",
    moduleId: module.id,
    templateUrl: "./list.component.html",
  //  styleUrls: ["./home.component.css"]
})
export class ListComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
   public countries: Array<Country>;
   
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
   constructor(private _page: Page, private router: RouterExtensions)
   {
    this.countries = [];

    for (let i = 0; i < meals.length; i++) {
        this.countries.push(new Country(meals[i]));
    }
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
    public onItemTap(args) {
        console.log("Item Tapped at cell index: " + args.index);
    }


}
