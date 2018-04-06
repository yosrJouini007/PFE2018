import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page/page";
import { Pedometer } from "nativescript-pedometer";
import { Store } from "@ngrx/store";
import * as fromRoot from "./../shared/reducers";
import * as stepAction from "./../shared/actions/steps.actions";
import { getString, setString } from "tns-core-modules/application-settings/application-settings";
@Component({
    selector: "Steps",
    moduleId: module.id,
    templateUrl: "./steps.component.html",
    styleUrls: ["./steps.component.css"]
})
export class StepsComponent implements OnInit {
    stepsData: any;
    steps: any;
    startDate: any;
    endDate: any;
    kilometre: number;
    floors: number;
    duration: number;
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;


    constructor(private _page: Page,
        private router: RouterExtensions,
        private store: Store<fromRoot.State>,
    ) {
        //this.kilometre=0;

    }

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.stepsData = JSON.parse(getString("stepsData", "{}"));
        this.steps = this.stepsData.number;
        this.kilometre = this.stepsData.kilometre;
        this.duration = this.stepsData.duration;
        this.floors = this.stepsData.floors;

        this.stepCounting();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }


    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }


    stepCounting() {
        let pedometer = new Pedometer();

        /*  pedometer.isStepCountingAvailable().then(avail => {
              alert(avail ? "your device have a step sensor" : "your device doesn't have a step sensor");
          });*/
        let midnight = new Date();
        midnight.setHours(0, 0, 0, 0);
        pedometer.startUpdates({
            // fromDate: midnight,
            //toDate: new Date(); //  default: now
            onUpdate: result => {
                /*  this.store.select(fromRoot.getSteps).subscribe((steps) => {
                
                    this.steps=steps;
                 })*/
                this.steps = this.stepsData.number + result.steps;
                this.endDate = result.endDate;
                this.startDate = result.startDate;
                this.stepconvert(this.stepsData.number + result.steps);
                let steps;
                steps = {
                    number: this.steps,
                    floors: this.floors,
                    duration:Math.trunc(this.duration+((Math.abs(this.endDate - this.startDate))/1000)/60),
                    kilometre: this.kilometre,
                };
               
                setString("stepsData", JSON.stringify(steps));

                // console.log(`Pedometer update: ${JSON.stringify(result)}`);
            }
        }).then(() => {
            console.log("Pedometer updates started.");
            // this.stepconvert(this.steps);


        }, err => {
            console.log("Error: " + err);
        });
        //  this.kilometre=parseInt(this.steps)/1250;
    }
    stepconvert(args) {
        this.kilometre =Math.trunc(args / 1250);
        this.floors = Math.trunc(args / 20);
        // this.duration = (args / 1250) * 9.4;
    }
}
