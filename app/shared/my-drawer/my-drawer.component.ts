import {
    Component,
    Input,
    OnInit,
    ElementRef,
    ViewChild,
    AfterViewInit
  } from "@angular/core";
  import { RouterExtensions } from "nativescript-angular/router";
  
  //Ui
  import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
  import { Page } from "ui/page";
  
  //Services 
  import { AuthService } from "../../auth/shared/auth.service";
  
  //Redux & RxJS
  import { Store } from "@ngrx/store";
  import * as fromRoot from "./../reducers";
  import * as appAction from "./../actions/app.actions";
  
  @Component({
    selector: "MyDrawer",
    moduleId: module.id,
    templateUrl: "./my-drawer.component.html",
    styleUrls: ["./my-drawer.component.css"]
  })
  export class MyDrawerComponent implements OnInit, AfterViewInit {
    user;
    user$;
    constructor(
      private routerExtensions: RouterExtensions,
      private authService: AuthService,
      private store: Store<fromRoot.State>,
      private eleRef: ElementRef,
      private page: Page
    ) { }
    
  
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
  
    @Input() selectedPage: string;
    ngOnDestroy() {
      this.user$.unsubscribe();
    }
    ngOnInit(): void {
      this.page.on(Page.unloadedEvent, event => {
        this.ngOnDestroy();
      });
      this.user$ = this.store.select(fromRoot.getUser).subscribe(user => {
        if (user) {
          this.user = user;
        } else {
          this.user = {};
        }
      });
    }
  
    ngAfterViewInit() {
    }
  
    logOut() {
      this.store.dispatch(new appAction.FireAction("logout"));
      setTimeout(() => {
        this.store.dispatch(new appAction.RestUserAction());
      }, 200);
    }
  
    isPageSelected(pageTitle: string): boolean {
      return pageTitle === this.selectedPage;
    }
    gotToEditAccount() {
      this.routerExtensions.navigate(["/auth/profil"], {
        queryParams: {
          mode: "edit"
        }
      });
    }
  
  }
  