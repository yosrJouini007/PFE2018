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
//registerElement('PDFView', () => PDFView);
//import { PDFView } from 'nativescript-pdf-view';
import * as moment from "moment";
moment.locale("fr");
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout/absolute-layout";
import { Observable } from "tns-core-modules/data/observable";
import { FormsModule } from '@angular/forms';
import { Store } from "@ngrx/store";
import * as fromRoot from "./../shared/reducers";
import * as appAction from "./../shared/actions/app.actions";
import { setString, getString } from "tns-core-modules/application-settings/application-settings";




@Component({
    selector: "add-glucose",
    moduleId: module.id,
    templateUrl: "./add-glucose.component.html",
    styleUrls: ["./add-glucose.component.css"]
})
export class AddGlucoseComponent implements OnInit {

    month: string;
   
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
    public currentDate: Date;
    public currentDateHolder: string = "";
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
    chart: any[] = [];
    chartWeek: any[] = [];
    chartMonth: any[] = [];
    PLEASE_SELECT_DATE = "Vous devez sélectionner la date";
    PLEASE_SELECT_HOUR = "Vous devez sélectionner l'heure";
    //textInput = new Subject<string>();
    public sliderValue1 = 116;


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
    private _SourceDaily: ObservableArray<any>;
    private _SourceWeekly: ObservableArray<Data>;
    private _SourceMonthly: ObservableArray<Data>;

    constructor(
        private _page: Page,
        private router: RouterExtensions,
        private validateService: ValidateService,
        private store: Store<fromRoot.State>, ) {

        this.input = {

            glucose: {
                value: "",
                error: false
            },
        };
        this.chart = [
           /* {
                Date: "12:30",
                Mesure:2,
            }*/];
        this.chartWeek = [
            //{
            // Date: "7/03/2018",
            // Mesure: 6,
            //}
        ];
        this.chartMonth = [
        ];
        this.currentDate =new Date();
        this.currentDateHolder=moment(this.currentDate,"mm/dd/yyyy hh:mm").format('LLLL')
        
    }


    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.addLayout.translateY = this.screenHeight;
        let charts;
        charts= {
            chart: JSON.parse(getString("chart", "{}")),
            chartWeek: JSON.parse(getString("chartWeek", "{}")),
            chartMonth: JSON.parse(getString("chartMonth", "{}")),
            
        }
        this.initDataItems(charts.chart, this.chart);
        this.initDataItems(charts.chartWeek, this.chartWeek);
        this.initDataItems(charts.chartMonth, this.chartMonth);
        this._SourceDaily = new ObservableArray(this.chart);
        this._SourceWeekly = new ObservableArray(this.chartWeek);
        this._SourceMonthly = new ObservableArray(this.chartMonth);
        //this.saveAdd();
        //let textField = <TextField>this.inputFieldElement.nativeElement.object;


    }


    get SourceDaily(): ObservableArray<any> {
        return this._SourceDaily;
    }
    get SourceWeekly(): ObservableArray<any> {
        return this._SourceWeekly;
    }
    get SourceMonthly(): ObservableArray<any> {
        return this._SourceMonthly;
    }
    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }


    private initDataItems(args1, args2) {
        //this._items = new ObservableArray<any>();

        for (var i = 0; i < args1.length; i++) {
            args2.push(args1[i]);
        }
    }

    addGlucose() {
        this.dateTextHolder = this.currentDateHolder;
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
                title:this.currentDateHolder,
                theme: "dark",
               // minDate: new Date(),
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
                title:this.currentDateHolder,
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
        // this.input.glucose.value = "";
    }
    returnPress(args) {

        // if (this.validateInput()) {
        let textField = <TextField>args.object;

        console.log("onReturn");
        // this.input.glucose.value = Number(textField.text);
        this.mesure = Number(textField.text);
        this.saveAdd();

    }



    saveAdd() {

        if (!this.selectedDateStr) {
            this.store.dispatch(
                new appAction.ShowToastAction(this.PLEASE_SELECT_DATE)
            );
        } else if (!this.selectedTimeStr) {
            this.store.dispatch(
                new appAction.ShowToastAction(this.PLEASE_SELECT_HOUR)
            );
        } else {

            //this.mesure=parseFloat(this.input.glucose.value);
            this.date = this.selectedDateStr;
            this.chart.push({Date:this.selectedTimeStr,Mesure: this.mesure});
            setString("chart", JSON.stringify(this.chart));
            setString("mesure", JSON.stringify(this.mesure));//last Mesure
            this._SourceDaily.push(this.chart);
            let week = this.chart.reduce((a, b) => a + b.Mesure, 0) / this.chart.length;
            this.chartWeek.push({Date:this.date, Mesure:week});
            setString("chartWeek", JSON.stringify(this.chartWeek));
            this._SourceWeekly.push(this.chartWeek);
            let month = this.chartWeek.reduce((a, b) => a + b.Mesure, 0) / this.chartWeek.length;
            this.chartMonth.push({Date:this.month,Mesure:month});
            setString("chartMonth", JSON.stringify(this.chartMonth));
            this._SourceMonthly.push(this.chartMonth);
            /* this.data.map(item => {
                  return {
                      Date: item.Date,
                      Mesure: item.Mesure
                  }
              }).forEach(item => this.source.push(item));*/
            this.closeAdd();
        }




    }

    /*  private validateInput() {
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
