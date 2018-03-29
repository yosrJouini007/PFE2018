import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page/page";
import { Pedometer } from "nativescript-pedometer";
@Component({
    selector: "Steps",
    moduleId: module.id,
    templateUrl: "./calories.component.html",
    styleUrls: ["./calories.component.css"]
})
export class CaloriesComponent implements OnInit {
    steps:any;
    startDate:any;
    endDate:any;
    kilometre:number;
    floors:number;
    duration:number;
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

   
   constructor(private _page: Page, private router: RouterExtensions)
   {
//this.kilometre=0;
   }

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
      //  this.stepCounting();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }


 stepCounting(){
    let pedometer = new Pedometer();

    pedometer.isStepCountingAvailable().then(avail => {
      alert(avail ? "your device have a step sensor" : "your device doesn't have a step sensor");
    });
    let midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    pedometer.startUpdates({
       fromDate:midnight,
       //toDate: new Date(); //  default: now
        onUpdate: result => {
          this.steps=result.steps;
          this.endDate=result.endDate;
          this.startDate=result.startDate;
          this.stepconvert(result.steps);
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
 stepconvert(args)
 {
    this.kilometre=args/1250;
    this.floors=args/20;
    this.duration=(args/1250)*9.4;
 }
}
