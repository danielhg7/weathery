import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})

export class ErrorComponent implements OnInit{

    pageTitle: string;
    pageSubtitle: string;
    backgroundImage: string = 'src/assets/images/nowhere.jpg';

    constructor(private activatedRoute: ActivatedRoute){

    }

    ngOnInit() {
        this.pageTitle = 'Error';
        this.pageSubtitle = 'Location not found.';
    }

}