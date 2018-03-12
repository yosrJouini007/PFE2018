import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page/page";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
import { Subject } from "rxjs";
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { screen } from "platform";
import { Data } from './data';
import { ObservableArray, ChangedData, ChangeType } from "tns-core-modules/data/observable-array/observable-array";
const ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
const picker = new ModalPicker();
import { isAndroid, isIOS } from "tns-core-modules/platform";
declare var android;
var application = require("application");
import { registerElement } from "nativescript-angular/element-registry";
import { ValidateService } from "./validate.service";
registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab);
import * as moment from "moment";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout/absolute-layout";
import { Observable } from "tns-core-modules/data/observable";



@Component({
    selector: "add-glucose",
    moduleId: module.id,
    templateUrl: "./add-glucose.component.html",
    styleUrls: ["./add-glucose.component.css"]
})
export class AddGlucoseComponent implements OnInit {

    month: string;
    public currentdate: Date;
    enableDay: boolean = false;
    enableWeek: boolean = true;
    enableMonth: boolean = true;
    input: any;
    date: string;
    glucose: string;
    mesure: number;
    public height: number;
    public width: number;
    public dateTextHolder: string = "";
    public dateTextHolderDefaultText: string = "Choose the date";
    showAdd: boolean = false;
    showWeeklyChart: boolean = false;
    showMonthlyChart: boolean = false;
    showDailyChart: boolean = true;
    PICK_DATE = "Choose Date";
    public selectedDateStr: string = "";
    public selectedTimeStr: string = "";
    PICK_HOUR = "Choose Hour";
    private dateStr;
    private hourStr;
    public fulldateStr: string = "";
    private data = [];
    chart: Data[] = [];
    chartWeek: Data[] = [];
    chartMonth: Data[] = [];
    //textInput = new Subject<string>();


    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    @ViewChild("addLayout") addLayoutRef: ElementRef;
    @ViewChild("chartLayout") chartLayoutRef: ElementRef;
    @ViewChild("inputField") inputFieldElement: ElementRef;

    private _sideDrawerTransition: DrawerTransitionBase;
    private get addLayout(): AbsoluteLayout {
        return this.addLayoutRef.nativeElement;
    }
    private get chartLayout(): StackLayout {
        return this.chartLayoutRef.nativeElement;
    }
    private get inputFieldEl(): TextField {
        return this.inputFieldElement.nativeElement;
    }
    private get screenHeight(): number {
        return screen.mainScreen.heightDIPs;
    }
    private get screenWidth(): number {
        return screen.mainScreen.widthDIPs;
    }
    private _SourceDaily: ObservableArray<Data>;
    private _SourceWeekly: ObservableArray<Data>;
    private _SourceMonthly: ObservableArray<Data>;

    constructor(
        private _page: Page,
        private router: RouterExtensions,
        private validateService: ValidateService, ) {

        this.input = {

            glucose: {
                value:0,
                error: false
            },
        };
        this.chart = [
           {
                Date: "12:30",
                Mesure:2,
            }];
        this.chartWeek = [
            //{
            // Date: "7/03/2018",
            // Mesure: 6,
            //}
        ];
        this.chartMonth = [
        ];
    }


    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.addLayout.translateY = this.screenHeight;
        //  this._Source = new ObservableArray(this.getCategoricalSource());
        this._SourceDaily = new ObservableArray(this.chart);
        this._SourceWeekly = new ObservableArray(this.chartWeek);
        this._SourceMonthly = new ObservableArray(this.chartMonth);
        //this.saveAdd();
       // let textField = <TextField>this.inputFieldElement.nativeElement.object;


    }


    get SourceDaily(): ObservableArray<Data> {
        return this._SourceDaily;
    }
    get SourceWeekly(): ObservableArray<Data> {
        return this._SourceWeekly;
    }
    get SourceMonthly(): ObservableArray<Data> {
        return this._SourceMonthly;
    }
    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }




    addGlucose() {
        this.dateTextHolder = this.dateTextHolderDefaultText;
        this.addLayout
            .animate({
                translate: { x: 0, y: 0 },
                duration: 200,
                opacity: 1
            })
        this.showAdd = true;
        // this.showDailyChart = false;
    }
    showDayChart() {
        this.showDailyChart = true;
        this.showWeeklyChart = false;
        this.showMonthlyChart = false;
        this.enableMonth = true;
        this.enableDay = false;
        this.enableWeek = true;
    }

    showWeekChart() {
        this.showWeeklyChart = true;
        this.showDailyChart = false;
        this.showMonthlyChart = false;
        this.enableMonth = true;
        this.enableDay = true;
        this.enableWeek = false;
    }
    showMonthChart() {
        this.showWeeklyChart = false;
        this.showDailyChart = false;
        this.showMonthlyChart = true;
        this.enableMonth = false;
        this.enableDay = true;
        this.enableWeek = true;
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
    addFocus() {
        this.inputFieldEl.focus();

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
                   this.addFocus();

                } else {
                }
            })
            .catch(error => {
                console.log("Error: " + error);
            });
    }
    closeAdd() {

        this.showAdd = false;
        // this.showDailyChart = true;
        this.addLayout
            .animate({
                translate: { x: 0, y: this.screenHeight },
                duration: 250,
                opacity: 0
            })
         //   this.mesure= this.input.glucose.value;
         
       // this.input.glucose.value = "";
    }
    returnPress(args) {

        // if (this.validateInput()) {
            let textField = <TextField>args.object;

        console.log("onReturn");
       // this.input.glucose.value = Number(textField.text);
        this.mesure= Number(textField.text) ;
        this.saveAdd();
    }
    // this.addText = textField.text;
    //}
    /* private validateInput() {
         let Valide = true;
         if (
             this.validateService.isNumber(this.input.glucose.value)
          ) {
             this.input.glucose.error = false;
         } else {
             this.input.glucose.error = true;
             Valide = false;
         }
         return Valide;
     }*/

    saveAdd() {
        let result: ChangedData<number>;

        //  if (this.validateInput()) {

        /*    this._SourceDaily.on(ObservableArray.changeEvent, (args: ChangedData<number>) => {
    
                result = args;
    
            })*/

          
        this.date = this.selectedDateStr;
     // this.mesure = this.input.glucose.value;
        this.chart.push(new Data(this.selectedTimeStr, this.mesure));
        this._SourceDaily.push(new Data(this.selectedTimeStr, this.mesure));
        let week = this.chart.reduce((a, b) => a + b.Mesure, 0) / this.chart.length;
        this.chartWeek.push(new Data(this.date, week));
        this._SourceWeekly.push(new Data(this.date, week));
        let month = this.chartWeek.reduce((a, b) => a + b.Mesure, 0) / this.chartWeek.length;
        this.chartMonth.push(new Data(this.month, month));
        this._SourceMonthly.push(new Data(this.month, month));
        // this.chart.push( new Data(this.date,this.mesure));

        /* this.data.map(item => {
              return {
                  Date: item.Date,
                  Mesure: item.Mesure
              }
          }).forEach(item => this.source.push(item));*/
        this.closeAdd();




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
