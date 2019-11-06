import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page/page";
import { getString, getBoolean, setString, remove } from "tns-core-modules/application-settings/application-settings";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout/absolute-layout";
import { screen } from "platform";
import * as moment from "moment";
moment.locale("fr");

@Component({
  selector: "Home",
  moduleId: module.id,
  templateUrl: "./home-connected.component.html",
  styleUrls: ["./home-connected.component.css"]
})
export class HomeConnectedComponent implements OnInit {
  historyData: any;
  steps: any;
  caloriesBurned: any;
  caloriesConsumed: any;
  mesure: any;
  public history: Array<any>=[];
  showHistory: boolean = false;
  showHome: boolean = true;
  public currentDate: Date;
  public currentDateHolder: string = "";

  @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
  @ViewChild("historyLayout") historyLayoutRef: ElementRef;

  private _sideDrawerTransition: DrawerTransitionBase;
  private get historyLayout(): AbsoluteLayout {
    return this.historyLayoutRef.nativeElement;
  }

  private get screenHeight(): number {
    return screen.mainScreen.heightDIPs;
  }

  constructor(private _page: Page, private router: RouterExtensions) {
    this.currentDate = new Date();
    this.currentDateHolder = moment(this.currentDate, "mm/dd/yyyy hh:mm").format('LLLL')
    let date=new Date('2018-04-18T10:20:30Z');
    this.history = [{mesure:2,date:date, steps:32,caloriesBurned:16,caloriesConsumed:110,day:this.currentDateHolder}];
  }

  ngOnInit(): void {
    this._sideDrawerTransition = new SlideInOnTopTransition();
    this.historyLayout.translateY = this.screenHeight;
    if (!getBoolean("authenticated", false)) {
      this.router.navigate(["auth/login"], { clearHistory: true });
    }
    let stepsData = JSON.parse(getString("stepsData", "{}"));
    this.steps = stepsData.number;
    let caloriesBurnedData = JSON.parse(getString("caloriesBurnedData", "{}"));
    this.caloriesBurned = caloriesBurnedData.burned;
    let caloriesConsumedData = JSON.parse(getString("caloriesConsumedData", "{}"));
    this.caloriesConsumed = caloriesConsumedData.consumed;
    this.mesure = JSON.parse(getString("mesure", "{}")).mesure;
    this.historyData = JSON.parse(getString("history", "{}"));
    this.initFoodItems(this.historyData, this.history);
    this.saveHistory();

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
  saveHistory() {
    //  let midnight = new Date();

    //  midnight.setHours(24, 0, 0, 0);
    // if (midnight == this.currentDate) 
    let length = this.history.length;
    let lastDate =new Date (this.history[length - 1].date).getDate();
    if (this.currentDate.getDate()!= lastDate) {
      this.history.push({
        mesure: this.mesure, caloriesBurned: this.caloriesBurned, caloriesConsumed: this.caloriesConsumed,
        steps: this.steps, day: this.currentDateHolder,date:this.currentDate
      });
      setString("history", JSON.stringify(this.history));
    }
    else if (this.history[length-1].mesure!=this.mesure||this.history[length-1].steps!=this.steps||this.history[length-1].caloriesConsumed!=this.caloriesConsumed||this.history[length-1].caloriesBurned!=this.caloriesBurned)
    {
      this.history.pop();
      this.history.push({
        mesure: this.mesure, caloriesBurned: this.caloriesBurned, caloriesConsumed: this.caloriesConsumed,
        steps: this.steps, day: this.currentDateHolder,date:this.currentDate
      });
      setString("history", JSON.stringify(this.history));
    }
  }
  private initFoodItems(args1, args2) {
    //this._items = new ObservableArray<any>();

    for (var i = 0; i < args1.length; i++) {
      args2.push(args1[i]);
    }
  }
  goToHistory() {
    this.historyLayout
      .animate({
        translate: { x: 0, y: 0 },
        duration: 200,
        opacity: 1
      })
    this.showHistory = true;
    this.showHome = false;

  }
  closeHistory() {

    this.showHistory = false;
    this.showHome = true;
    this.historyLayout
      .animate({
        translate: { x: 0, y: this.screenHeight },
        duration: 250,
        opacity: 0
      })
  }

}
