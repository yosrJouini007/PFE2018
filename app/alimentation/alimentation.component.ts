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
import {
    getBoolean,
    setBoolean,
    getString,
    setString,
    remove,
    clear
} from "application-settings";

@Component({
    selector: "alimentation",
    moduleId: module.id,
    templateUrl: "./alimentation.component.html",
    styleUrls: ["./alimentation.component.css"]
})
export class AlimentationComponent implements OnInit {
    private _items: ObservableArray<TokenModel>;
    private food = ["Lait", "Jus d'orange", "Pain", "Kaki", "Céreales", "Beurre", "Confiture", "Chocolat", "Pizza", "Spaghetti",
        "Couscous", "Sandwitch", "Soufflet", "Croustina", "Chocotom", "Lait de Poule", "Banane",
        "Fraise", "Escalope", "Poulet", "Viande", "Salade", "Yaourt", "Fromage",
        "Crépe", "Cake", "Gateau", "Croissant", "Boeuf"];
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
    connexionState: any;
    address: string = "";
    showSuggession: boolean = false;
    public height: number;
    public width: number;
    public dateTextHolder: string = "";
    public foodToken: string = "";
    //public breakFast=[];
    // public lunch=[];
    //public dinner=[];
    //public snack=[];
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
    caloriesConsumedData: any;
    consumed: number;
    rest: number;
    goal: number;
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
        
        this.caloriesConsumedData = JSON.parse(getString("caloriesConsumedData", "{}"));
        this.consumed = 750;
        this.goal = 1500;
        // this.duration=this.stepsData.duration;
        this.rest = this.caloriesConsumedData.rest;
        this.CaloriesCounting();




    }



    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    private initDataItems() {
        this._items = new ObservableArray<TokenModel>();

        for (var i = 0; i < this.food.length; i++) {
            this._items.push(new TokenModel(this.food[i], undefined));
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
    onProgressBarLoaded(args) {
        let myProgressBar = <Progress>args.object;

        myProgressBar.value = this.consumed;
        myProgressBar.maxValue = this.goal;

        /*setInterval(function() {
            myProgressBar.value += 2;
        }, 300);*/
    }
    onValueChanged(args) {
        let progressBar = <Progress>args.object;

        console.log("Value changed for " + progressBar);
        console.log("New value: " + progressBar.value);
    }
    saveFood() {

        if (this.showBreak == true) {
            this.breakFast.push(this.foodToken);
            setString("breakFast", JSON.stringify(this.breakFast));
        }
        else
            if (this.showLunch == true) {
                this.lunch.push(this.foodToken );
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
        this.closeAdd();

    }

    CaloriesCounting() {
        let calories;
        calories = {
            consumed: this.consumed,
            goal: this.goal,
            rest: this.goal - this.consumed,
        };
        setString("caloriesConsumedData", JSON.stringify(calories));
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
