import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CityService } from './city/city.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'wt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  pageTitle: string  = 'Weathery';
  city: string = '';
  cities: any[];
  errorMessage: string;
  imageWidth: number = 35;
  imageMargin: number = 2;
  lat: number;
  lng: number;
  countryFlag: string;

  constructor(private router: Router, 
              private cityService: CityService, 
              private toastrService: ToastrService){
                
  }

  ngOnInit() {
    
  }

  /*showPosition(position: any){
    this.getCityByCoords(position.coords.latitude, position.coords.longitude);
  }*/

  getCities(): void{

    var parsedCity = encodeURIComponent(this.city.trim());

    this.cityService.getCities(parsedCity).subscribe(
        cities => {
          this.cities = cities;
        },
        error => {
        this.errorMessage = <any>error;
        this.toastrService.error(/*this.titleCasePipe.transform(*/this.errorMessage/*)*/);
        }
    )
  }

  goToHome(): void{
    this.router.navigate(['home']);
  }

}
