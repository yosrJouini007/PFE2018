import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef, NgZone, OpaqueToken } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadAutoCompleteTextViewComponent } from "nativescript-ui-autocomplete/angular";
import { TokenModel } from "nativescript-ui-autocomplete";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page/page";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
import { Subject } from "rxjs";
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { screen } from "platform";
import { ObservableArray, ChangedData, ChangeType } from "tns-core-modules/data/observable-array/observable-array";
const ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
const picker = new ModalPicker();
import { isAndroid, isIOS } from "tns-core-modules/platform";
declare var android;
var application = require("application");
import { ValidateService } from "./validate.service";
import * as moment from "moment";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout/absolute-layout";
import { Observable } from "tns-core-modules/data/observable";
import { FormsModule } from '@angular/forms';
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import alimentation from "./data";
import { Store } from "@ngrx/store";
import { Progress } from "ui/progress";
import * as fromRoot from "./../shared/reducers";
import * as foodAction from "./../shared/actions/food.actions";
import * as LocalNotifications from "nativescript-local-notifications";
import {
    getBoolean,
    setBoolean,
    getString,
    setString,
    remove,
    clear
} from "application-settings";
import Data from './data';
@Component({
    selector: "alimentation",
    moduleId: module.id,
    templateUrl: "./alimentation.component.html",
    styleUrls: ["./alimentation.component.css"]
})
export class AlimentationComponent implements OnInit {
    private _items: ObservableArray<TokenModel>;
    month: string;
    public currentdate: Date;
    enableLunch: boolean = true;
    enableBreak: boolean = false;
    enableSnack: boolean = true;
    enableDinner: boolean = true;
    input: any;
    date: string;
    searchInput = new Subject<string>();
    private searchInput$;
    public myItems;
    showSuggession: boolean = false;
    showGoal: boolean = false;
    showRest: boolean = true;
    public height: number;
    public width: number;
    public dateTextHolder: string = "";
    public foodToken: string = "";
    public dateTextHolderDefaultText: string = "Choose the date";
    showAdd: boolean = false;
    showBreak: boolean = true;
    showSnack: boolean = false;
    showLunch: boolean = false;
    showDinner: boolean = false;
    showSearch: boolean = true;
    public breakFast: Array<any> = [];
    public lunch: Array<any>;
    public dinner: Array<any>;
    public snack: Array<any>;
    caloriesData: any;
    goalData: any;
    caloriesConsumed: number;
    restToConsume: number;
    goal: number;
    energie: any;
    totalCalories: number;
    glucide: any;
    proteines: any;
    lipides: any;
    src: any;
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    @ViewChild("addLayout") addLayoutRef: ElementRef;
    @ViewChild("autocmp") autocmp: RadAutoCompleteTextViewComponent;

    get dataItems(): ObservableArray<TokenModel> {
        return this._items;
    }

    private _sideDrawerTransition: DrawerTransitionBase;
    private get addLayout(): AbsoluteLayout {
        return this.addLayoutRef.nativeElement;
    }

    private get screenHeight(): number {
        return screen.mainScreen.heightDIPs;
    }
    private get screenWidth(): number {
        return screen.mainScreen.widthDIPs;
    }


    constructor(

        private _page: Page,
        private router: RouterExtensions,
        private validateService: ValidateService,
        private store: Store<fromRoot.State>,

    ) {
        this.input = {
            portion: {
                value: "1",
                error: false
            },
        }

        this.currentdate = new Date();
        this.breakFast = [];
        this.lunch = [];
        this.dinner = [];
        this.snack = [];
     
        /*   this.store.select(fromRoot.getFoods).subscribe((foods) => {
                 
                     this.initDataItems(foods);
                })*/
        this.initDataItems();

    }


    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.addLayout.translateY = this.screenHeight;
       
        let food;
        food = {
            breakfast: JSON.parse(getString("breakFast", "{}")),
            lunch: JSON.parse(getString("lunch", "{}")),
            dinner: JSON.parse(getString("dinner", "{}")),
            snack: JSON.parse(getString("snack", "{}"))
        }

        this.initFoodItems(food.breakfast, this.breakFast);
        this.initFoodItems(food.lunch, this.lunch);
        this.initFoodItems(food.dinner, this.dinner);
        this.initFoodItems(food.snack, this.snack);

        this.caloriesData = JSON.parse(getString("caloriesConsumedData", "{}"));
        this.goalData = JSON.parse(getString("goalsData", "{}"));
        this.caloriesConsumed = this.caloriesData.consumed;
        this.goal =Math.trunc(this.goalData.goalToConsume)
        // this.duration=this.stepsData.duration;
        this.restToConsume = this.caloriesData.restToConsume;
        //this.caloriesCounting();
       this.showNotifications(this.caloriesConsumed,this.goal);




    }



    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
    
  

    private initDataItems() {
        this._items = new ObservableArray<TokenModel>();

        for (var i = 0; i < Data.length; i++) {
            this._items.push(new TokenModel(Data[i].name, undefined));
        }
    }

    private initFoodItems(args1, args2) {
        //this._items = new ObservableArray<any>();

        for (var i = 0; i < args1.length; i++) {
            args2.push(args1[i]);
        }
    }


    /* private initDataItems(data) {
         this._items = new ObservableArray<TokenModel>();
 
         for (var i = 0; i < data.length; i++) {
             this._items.push(new TokenModel(data[i], undefined));
         }
     }*/

    public onDidAutoComplete(args) {
        this.foodToken = args.text;
        //  setString("food", JSON.stringify(args.text));
        for (var i = 0; i < Data.length; i++) {
            if (this.foodToken == Data[i].name) {
                this.energie = Data[i].energie;
                this.glucide = Data[i].glucide;
                this.lipides = Data[i].lipides;
                this.proteines = Data[i].proteines;
                this.src = Data[i].src;
            }
        }
        this.addLayout
            .animate({
                translate: { x: 0, y: 0 },
                duration: 200,
                opacity: 1
            })
        this.showAdd = true;
        this.showSearch = false;
        this.hideKeyboard();

    }
    saveFood() {

        if (this.showBreak == true) {
            this.breakFast.push(this.foodToken);

            setString("breakFast", JSON.stringify(this.breakFast));
        }
        else
            if (this.showLunch == true) {
                this.lunch.push(this.foodToken);
                setString("lunch", JSON.stringify(this.lunch));
            }
            else
                if (this.showSnack == true) {
                    this.snack.push(this.foodToken);
                    setString("snack", JSON.stringify(this.snack));
                }
                else
                    if (this.showDinner == true) {
                        this.dinner.push(this.foodToken);
                        setString("dinner", JSON.stringify(this.dinner));
                    }
        for (var i = 0; i < Data.length; i++) {
            if (this.foodToken == Data[i].name) {
                this.totalCalories = + Number(this.input.portion.value)*Number(Data[i].energie);
            }
        }
        this.input.portion.value="1";
        this.caloriesCounting();
        this.closeAdd();
     //   this.showNotifications(this.caloriesConsumed,this.goal);

    }

    caloriesCounting() {
        let calories;
        calories = {
            consumed:this.caloriesConsumed+ this.totalCalories,
            restToConsume: this.goal - this.caloriesConsumed,
        };
        setString("caloriesConsumedData", JSON.stringify(calories));
    }
    notification(): void {
        LocalNotifications.schedule([{
            id: 1,
            title: "Alimentation",
            body: "Bravo! Objectif atteint ",
            badge: 1,
            at: new Date(new Date().getTime() + (10 * 1000)) // 10 seconds from now
        }]);


        // adding a handler, so we can do something with the received notification.. in this case an alert
        LocalNotifications.addOnMessageReceivedCallback(data => {
            alert({
                title: " Notification",
                message: `Titre: ${data.title}, Description: ${data.body}`,
                okButtonText: "Ok"
            });
        });
    }
    showNotifications(calories,goal)
    {
        if (calories>goal)
        {
            this.showGoal=true;
            this.showRest=false;
            this.notification();
        }
    }


    showBreakLayout() {
        this.showBreak = true;
        this.showLunch = false;
        this.showDinner = false;
        this.showSnack = false;
        this.enableSnack = true;
        this.enableLunch = true;
        this.enableBreak = false;
        this.enableDinner = true;

    }

    showLunchLayout() {
        this.showBreak = false;
        this.showLunch = true;
        this.showDinner = false;
        this.showSnack = false;
        this.enableSnack = true;
        this.enableLunch = false;
        this.enableBreak = true;
        this.enableDinner = true;
    }
    showDinnerLayout() {
        this.showBreak = false;
        this.showLunch = false;
        this.showDinner = true;
        this.showSnack = false;
        this.enableSnack = true;
        this.enableLunch = true;
        this.enableBreak = true;
        this.enableDinner = false;
    }
    showSnackLayout() {
        this.showBreak = false;
        this.showLunch = false;
        this.showDinner = false;
        this.showSnack = true;
        this.enableSnack = false;
        this.enableLunch = true;
        this.enableBreak = true;
        this.enableDinner = true;
    }

    closeAdd() {

        this.showAdd = false;
        this.showSearch = true;
        this.addLayout
            .animate({
                translate: { x: 0, y: this.screenHeight },
                duration: 250,
                opacity: 0
            })
    }


    hideKeyboard() {
        if (isAndroid) {
            try {
                let activity = application.android.foregroundActivity;
                let Context = application.android.currentContext;
                let inputManager = Context.getSystemService(
                    android.content.Context.INPUT_METHOD_SERVICE
                );
                inputManager.hideSoftInputFromWindow(
                    activity.getCurrentFocus().getWindowToken(),
                    android.view.inputmethod.InputMethodManager.HIDE_NOT_ALWAYS
                );
            } catch (err) {
                console.log(err);
            }
        }
    }

}
