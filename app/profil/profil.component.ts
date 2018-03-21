import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page/page";
import { SlidesComponent } from "nativescript-ngx-slides/slides/app/slides/slides.component";

@Component({
    selector: "profil",
    moduleId: module.id,
    templateUrl: "./profil.component.html",
    styleUrls: ["./profil.component.css"]
})
export class ProfilComponent implements OnInit {

    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private _page: Page, private router: RouterExtensions) {

    }

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        // this._page.actionBarHidden = true;
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }


    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    public goToRegister() {
        this.router.navigate(["/auth/register"], {
            clearHistory: true,
        });
    }
    gotToEditAccount() {
        this.router.navigate(["/auth/profil"], {
            queryParams: {
                mode: "edit"
            }
        });
    }
}
