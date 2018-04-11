import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page/page";
import { Pedometer } from "nativescript-pedometer";
import { getString, setString } from "tns-core-modules/application-settings/application-settings";
@Component({
    selector: "Steps",
    moduleId: module.id,
    templateUrl: "./calories.component.html",
    styleUrls: ["./calories.component.css"]
})
export class CaloriesComponent implements OnInit {
    caloriesData:any;
    goalData:any;
    stepsData:any;
    startDate:any;
    endDate:any;
    caloriesBurned:number;
    restToBurn:number;
    goal:number;
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
      this.caloriesData=JSON.parse(getString("caloriesBurnedData", "{}"));
      this.goalData=JSON.parse(getString("goalsData", "{}"));
      this.caloriesBurned=this.caloriesData.burned;
      this.goal=Math.trunc(this.goalData.goalToBurn);
     // this.duration=this.stepsData.duration;
      this.restToBurn=this.caloriesData.restToBurn;
      this.caloriesCounting();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
        
    }

    
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }


 caloriesCounting(){
   
  this.stepsData=JSON.parse(getString("stepsData", "{}"));
  let calories;
  calories = {
    burned:Number(this.stepsData.number)/2,
    restToBurn:this.goal-Number(this.stepsData.number)/2,
  };
  setString("caloriesBurnedData", JSON.stringify(calories));
 }
 
 stepconvert(args)
 {
    //this.kilometre=args/1250;
   // this.floors=args/20;
    this.duration=(args/1250)*9.4;
 }
}
