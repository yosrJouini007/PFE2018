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
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/distinctUntilChanged';
@Component({
    selector: "profil",
    moduleId: module.id,
    templateUrl: "./profil.component.html",
    styleUrls: ["./profil.component.css"]
})
export class ProfilComponent implements OnInit {
    showProfil: boolean = true;
    showBand: boolean = false;
    showSet: boolean = false;
    isEnabledSubscription: Subscription;
    isBluetoothEnabled = false;

    devices: any[] = [{
        UUID: '1111',
        name: 'test mip 1'
    }, {
        UUID: '2222',
        name: 'test mip 2'
    }];
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    @ViewChild("bandLayout") bandLayoutRef: ElementRef;
    @ViewChild("setLayout") setLayoutRef: ElementRef;
    @ViewChild("profilLayout") profilLayoutRef: ElementRef;

    private _sideDrawerTransition: DrawerTransitionBase;
    private get bandLayout(): AbsoluteLayout {
        return this.bandLayoutRef.nativeElement;
    }
    private get setLayout(): AbsoluteLayout {
        return this.setLayoutRef.nativeElement;
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
        bluetooth.setCharacteristicLogging(false);
    }

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        // this._page.actionBarHidden = true;
        this.bandLayout.translateY = this.screenHeight;
        /*    if (bluetooth.isBluetoothEnabled())
            {
                this.scan();
            }*/

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

    setBand() {
        // this.fixPermission()
        bluetooth.requestCoarseLocationPermission();

        this.isEnabledSubscription = this.listenToBluetoothEnabled()
            .subscribe(enabled => this.isBluetoothEnabled = enabled);
        this.scan();
        this.openSetLayout();
    }

}
