import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page/page";

@Component({
    selector: "intro",
    moduleId: module.id,
    templateUrl: "./intro.component.html",
    styleUrls: ["./intro.component.css"]
})
export class IntroComponent implements OnInit {
    slideDetails = [
        {
          title: "Gérer Votre Diabéte",
          description:
            "Craignez-vous l'hyperglycémie ou encore l'hypoglycémie ? On suivra votre santéet on vous prévenira de vos chutes glycémiques.Comme on vous disposera d'un suivi journalier,hebdomadaire et mensuel de votre état de santé"
        },
        {
          title: "Garder la forme",
          description:
            "On vous aide à atteindre vos objectifs,à suivre vos progrés et à garder votrebien étre.On suivra vos moments actifs et on vous guidera avec des informations utiles afin de rester en forme et en bonne santé"
        },
        {
          title: "Améliorer votre quotidien",
          description:
            "Une montre connectée à votre application synchronisera vos données et vous offrira une expérience exclusive.Un coach éléctronique attaché au poignet vous facilitera la vie tout en gérant votre santé et satisfaisant vos besoins quotidiens"
        }
      ];
   

  

  
    constructor(private _page: Page, private router: RouterExtensions) {

    }

    ngOnInit(): void {
        this._page.actionBarHidden = true;
    }


    public goToHome() {
        this.router.navigate(["/home-connected"], {
            clearHistory: true,
        });
    }
    
}
