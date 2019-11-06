import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page/page";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
   
    constructor(private _page: Page, private router: RouterExtensions) {

    }

    ngOnInit(): void {
        this._page.actionBarHidden = true;
    }


    public goToRegister() {
        this.router.navigate(["/auth/register"], {
            clearHistory: true,
        });
    }
    public goToLogin() {
        this.router.navigate(["/auth/login"], {
            clearHistory: true,
        });
    }
}
