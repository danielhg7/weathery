import { Component } from "@angular/core";

@Component({
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent {

    backgroundImage: string = 'assets/images/landscape.jpg';
    pageTitle: string = 'Weathery';
    pageSubtitle: string = 'Weather around the world.';
}