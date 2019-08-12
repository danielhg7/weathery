import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CityService } from "../city/city.service";
import { ToastrService } from "ngx-toastr";

@Component({
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit{

    backgroundImage: string = 'assets/images/landscape.jpg';
    pageTitle: string = 'Weathery';
    pageSubtitle: string = 'Weather around the world.';

    lat: number;
    lng: number;
    city: string;
    countryFlag: string;
    
    constructor(private router: Router, 
        private cityService: CityService, 
        private toastrService: ToastrService){
          
    }

    ngOnInit(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              
              position => {
              
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                this.cityService.getCityByCoords(position.coords.latitude, position.coords.longitude).subscribe(
                  city => {
                    this.city = city.formattedAddress;
                    this.countryFlag = city.countryCode;
                    this.onSubmit();
                  }
                )
            
            });
          } else {
              console.log("Geolocation is not supported by this browser.");
          }
    }

    onSubmit(): void{
        this.router.navigate(['/weather'], { queryParams: { city: this.city, latitude: this.lat, longitude: this.lng, countryFlag: this.countryFlag }});
        this.city = '';
      }
}