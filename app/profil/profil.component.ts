import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page/page";
import { SlidesComponent } from "nativescript-ngx-slides/slides/app/slides/slides.component";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout/absolute-layout";
import { screen } from "platform";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
import bluetooth = require('nativescript-bluetooth');
import { Peripheral } from 'nativescript-bluetooth';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { Subscription } from 'rxjs/Subscription';
import { Switch } from "ui/switch";
import 'rxjs/add/operator/distinctUntilChanged';
import * as LocalNotifications from "nativescript-local-notifications";
const ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
const picker = new ModalPicker();
import * as moment from "moment";
moment.locale("fr");
class reminder {
    constructor(public name: string, public date: string) { }
}
@Component({
    selector: "profil",
    moduleId: module.id,
    templateUrl: "./profil.component.html",
    styleUrls: ["./profil.component.css"]
})
export class ProfilComponent implements OnInit {
    //Layouts variables
    showProfil: boolean = true;
    showBand: boolean = false;
    showNotification: boolean = false;
    showSet: boolean = false;
    showReminder: boolean = false;
    listReminders: boolean = false;

    //Bluetooth Variables
    isEnabledSubscription: Subscription;
    isBluetoothEnabled = false;
    devices: any[] = [{
        UUID: '1111',
        name: 'test mip 1'
    }, {
        UUID: '2222',
        name: 'test mip 2'
    }];

    public reminders: Array<reminder>;
    public firstSwitchState = "Activer";


    // Date variables
    public dateTextHolder: string = "";
    public dateTextHolderDefaultText: string = "Choose the date";
    public currentDate: Date;
    public currentDateHolder: string = "";
    public selectedDateStr: string = "";
    public selectedTimeStr: string = "";
    private dateStr;
    private hourStr;
    public fulldateStr: string = "";
    public ID: number;
    PLEASE_SELECT_DATE = "Vous devez sélectionner la date";
    PLEASE_SELECT_HOUR = "Vous devez sélectionner l'heure";


    input: any;
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    @ViewChild("bandLayout") bandLayoutRef: ElementRef;
    @ViewChild("notificationLayout") notificationLayoutRef: ElementRef;
    @ViewChild("setLayout") setLayoutRef: ElementRef;
    @ViewChild("reminderLayout") reminderLayoutRef: ElementRef;
    @ViewChild("profilLayout") profilLayoutRef: ElementRef;
    @ViewChild("inputTitle") inputTitleElement: ElementRef;
    @ViewChild("inputDesc") inputDescElement: ElementRef;

    private get inputTitleEl(): TextField {
        return this.inputTitleElement.nativeElement;
    }
    private get inputDescEl(): TextField {
        return this.inputDescElement.nativeElement;
    }
    private _sideDrawerTransition: DrawerTransitionBase;

    private get bandLayout(): AbsoluteLayout {
        return this.bandLayoutRef.nativeElement;
    }
    private get notificationLayout(): AbsoluteLayout {
        return this.notificationLayoutRef.nativeElement;
    }
    private get setLayout(): AbsoluteLayout {
        return this.setLayoutRef.nativeElement;
    }
    private get reminderLayout(): AbsoluteLayout {
        return this.reminderLayoutRef.nativeElement;
    }
    private get profilLayout(): StackLayout {
        return this.profilLayoutRef.nativeElement;
    }
    private get screenHeight(): number {
        return screen.mainScreen.heightDIPs;
    }
    private get screenWidth(): number {
        return screen.mainScreen.widthDIPs;
    }

    constructor(private _page: Page, private router: RouterExtensions) {

        this.input = {

            title: {
                value: "",
                error: false
            },
            description: {
                value: "",
                error: false
            },
        };
        this.reminders = [];

        bluetooth.setCharacteristicLogging(false);
        this.currentDate = new Date();
        this.currentDateHolder = moment(this.currentDate, "mm/dd/yyyy hh:mm").format('LLLL')
    }

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        // this._page.actionBarHidden = true;
        this.bandLayout.translateY = this.screenHeight;
        this.notificationLayout.translateY = this.screenHeight;
        /*    if (bluetooth.isBluetoothEnabled())
            {
                this.scan();
            }*/

    }
    selectDate(fn) {
        picker
            .pickDate({
                title: this.currentDateHolder,
                theme: "dark",
                // minDate: new Date(),
                startingDate: new Date()
            })
            .then((result: any) => {
                if (result) {
                    this.dateStr = result.day + "-" + result.month + "-" + result.year;
                    // this.month = result.month + "-" + result.year;
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
        this.focusTitle();
    }


    selectTime() {
        picker
            .pickTime({
                title: this.currentDateHolder,
                theme: "dark"
            })
            .then((result: any) => {
                if (result) {
                    this.hourStr = result.hour + ":" + result.minute;
                    this.selectedTimeStr = result.hour + ":" + result.minute;
                    // this.dateTextHolder =this.selectedTimeStr;
                    this.fulldateStr = this.selectedDateStr + " " + this.selectedTimeStr;
                    this.dateTextHolder = this.fulldateStr;


                } else {
                }
            })
            .catch(error => {
                console.log("Error: " + error);
            });
    }
    public onFirstChecked(args) {
        let firstSwitch = <Switch>args.object;
        if (firstSwitch.checked) {
            this.firstSwitchState = "Activer";
        } else {
            this.firstSwitchState = "Désactiver";
        }
    }


    showWithSound(title, description): void {
        LocalNotifications.schedule([{
            id: 1,
            title: title,
            body: description,
            badge: 1,
            at: new Date(new Date(this.fulldateStr).getTime()) // 5 seconds from now
        }]);


        // adding a handler, so we can do something with the received notification.. in this case an alert
        LocalNotifications.addOnMessageReceivedCallback(data => {
            alert({
                title: " Votre Rappel",
                message: `Titre: ${data.title}, Description: ${data.body}`,
                okButtonText: "Ok"
            });
        });

        this.reminders.push(new reminder(title, this.selectedTimeStr));
        this.listReminders = true;
        this.closeReminderLayout();
    }



    cancelAll(): void {
        LocalNotifications.cancelAll();
    }
    onItemTap() {
        LocalNotifications.getScheduledIds().then(id => {
            alert({
                title: " Votre Rappel",
                message: `Supprimer`,
                okButtonText: "Ok"
            });
            LocalNotifications.cancel(id);
        }

        )
    }


    focusTitle() {
        this.inputTitleEl.focus();

    }

    focusDesc() {
        this.inputDescEl.focus();

    }


    public listenToBluetoothEnabled(): Observable<any> {
        return new Observable(observer => {
            bluetooth.isBluetoothEnabled()
                .then(enabled => observer.next(enabled))

            let intervalHandle = setInterval(
                () => {
                    bluetooth.isBluetoothEnabled()
                        .then(enabled => observer.next(enabled))
                }
                , 1000);

            // stop checking every second on unsubscribe
            return () => clearInterval(intervalHandle);
        })
            .distinctUntilChanged();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }


    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
    scan() {
        this.devices = [];

        bluetooth.startScanning({
            seconds: 3,
            // serviceUUIDs: ['ffe5'],
            // serviceUUIDs: ['0000ffe5-0000-1000-8000-00805f9b34fb'],
            onDiscovered: (peripheral: Peripheral) => {
                if (peripheral.name) {
                    //console.log(`UUID: ${peripheral.UUID} name: ${peripheral.name}`)
                    this.devices.push(peripheral);
                }
            }
        })
    }
    connect(UUID: string) {
        bluetooth.connect({
            UUID: UUID,
            onConnected: (peripheral: Peripheral) => {
                alert('Connecté :)');
                // this.router.navigate(['mipcontroller', UUID]);
            },
            onDisconnected: (peripheral: Peripheral) => {
                //  this.router.navigate(['mipscan']);
            }
        })
    }
    public goToRegister() {
        this.router.navigate(["/auth/register"], {
            clearHistory: true,
        });
    }
    gotToEditAccount() {
        this.router.navigate(["/auth/profil"], {
            queryParams: {
                mode: "edit"
            }
        });
    }

    public openBandLayout() {
        this.bandLayout
            .animate({
                translate: { x: 0, y: 0 },
                duration: 200,
                opacity: 1
            })
        this.showBand = true;
        this.showProfil = false;

    }

    closeBandLayout() {

        this.showBand = false;
        this.showProfil = true;
        this.bandLayout
            .animate({
                translate: { x: 0, y: this.screenHeight },
                duration: 250,
                opacity: 0
            })
    }
    public openNotificationLayout() {
        this.notificationLayout
            .animate({
                translate: { x: 0, y: 0 },
                duration: 200,
                opacity: 1
            })
        this.showNotification = true;
        this.showProfil = false;

    }

    closeNotificationLayout() {

        this.showNotification = false;
        this.showProfil = true;
        this.notificationLayout
            .animate({
                translate: { x: 0, y: this.screenHeight },
                duration: 250,
                opacity: 0
            })
    }
    public openSetLayout() {
        this.setLayout
            .animate({
                translate: { x: 0, y: 0 },
                duration: 200,
                opacity: 1
            })
        this.showBand = false;
        this.showSet = true;


    }

    closeSetLayout() {

        this.showBand = true;
        this.showSet = false;
        this.setLayout
            .animate({
                translate: { x: 0, y: this.screenHeight },
                duration: 250,
                opacity: 0
            })
    }
    openReminderLayout() {
        this.dateTextHolder = this.currentDateHolder;
        this.reminderLayout
            .animate({
                translate: { x: 0, y: 0 },
                duration: 200,
                opacity: 1
            })
        this.showReminder = true;
        this.showProfil = false;


    }

    closeReminderLayout() {

        this.showProfil = true;
        this.showReminder = false;
        this.reminderLayout
            .animate({
                translate: { x: 0, y: this.screenHeight },
                duration: 250,
                opacity: 0
            })
    }

    setBand() {
        // this.fixPermission()
        bluetooth.requestCoarseLocationPermission();

        this.isEnabledSubscription = this.listenToBluetoothEnabled()
            .subscribe(enabled => this.isBluetoothEnabled = enabled);
        this.scan();
        this.openSetLayout();
    }

}
