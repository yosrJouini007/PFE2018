import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef, NgZone } from "@angular/core";
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



class food {
    constructor(public name: string) { }
}

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
    PICK_DATE = "Choose Date";
    public selectedDateStr: string = "";
    public selectedTimeStr: string = "";
    PICK_HOUR = "Choose Hour";
    private dateStr;
    private hourStr;
    public fulldateStr: string = "";

    //textInput = new Subject<string>();

    public breakFast: Array<food>;
    public lunch: Array<food>;
    public dinner: Array<food>;
    public snack: Array<food>;
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

    ) {

        this.currentdate = new Date();
        this.breakFast = [];
        this.lunch = [];
        this.dinner = [];
        this.snack = [];


        //this.myItems = [];
        this.initDataItems();
    }


    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.addLayout.translateY = this.screenHeight;
        /*  this.searchInput$ = this.searchInput
          .debounceTime(100)
          .distinctUntilChanged()
          .subscribe(
            (data: any) => {
              let textField = <TextField>data.object;
              if (this.connexionState == "NONE") {
                this.store.dispatch(new appAction.NoInternetAction(new Date()));
              } else {
                this.zone.run(() => {
                  this.search(textField.text);
                });
              }
            },
            error => {
              console.log(error);
            }
          );*/



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

    public onTokenSelected(args) {
        //  this.logEvent("Selected Token: " + args.token.text);
        this.foodToken = args.token.text;
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
            this.breakFast.push(new food(this.foodToken));
        }
        else
            if (this.showLunch == true) {
                this.lunch.push(new food(this.foodToken));
            }
            else
                if (this.showSnack == true) {
                    this.snack.push(new food(this.foodToken));
                }
                else
                    if (this.showDinner == true) {
                        this.dinner.push(new food(this.foodToken));
                    }
        this.closeAdd();

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


    selectDate(fn) {
        picker
            .pickDate({
                title: this.PICK_DATE,
                theme: "dark",
                minDate: new Date(),
                startingDate: new Date()
            })
            .then((result: any) => {
                if (result) {
                    this.dateStr = result.day + "-" + result.month + "-" + result.year;
                    this.month = result.month + "-" + result.year;
                    this.selectedDateStr =
                        result.day + "/" + result.month + "/" + result.year;
                    this.dateTextHolder = this.selectedDateStr;
                    if (fn) fn();

                } else {
                }
            })
            .catch(error => {
                console.log("Error: " + error);
            });
    }

    pickDateTime() {
        this.selectDate(this.selectTime.bind(this));
    }


    selectTime() {
        picker
            .pickTime({
                title: this.PICK_HOUR,
                theme: "dark"
            })
            .then((result: any) => {
                if (result) {
                    this.hourStr = result.hour + ":" + result.minute;
                    this.selectedTimeStr = result.hour + ":" + result.minute;
                    // this.dateTextHolder =this.selectedTimeStr;
                    this.fulldateStr = moment(this.selectedDateStr + " " + this.selectedTimeStr, "mm/dd/yyyy hh:mm").format('LLLL');
                    this.dateTextHolder = this.fulldateStr;
                    // this.inputFieldEl.focus();


                } else {
                }
            })
            .catch(error => {
                console.log("Error: " + error);
            });
    }
    closeAdd() {

        this.showAdd = false;
        this.showSearch = true;
        // this.showDailyChart = true;
        this.addLayout
            .animate({
                translate: { x: 0, y: this.screenHeight },
                duration: 250,
                opacity: 0
            })
        // this.input.glucose.value = "";
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
