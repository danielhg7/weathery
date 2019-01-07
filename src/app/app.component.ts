import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CityService } from './city/city.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'wt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  pageTitle: string  = 'Weathery';
  city: string = '';
  cities: any[];
  errorMessage: string;
  imageWidth: number = 35;
  imageMargin: number = 2;

  constructor(private router: Router, 
              private cityService: CityService, 
              private toastrService: ToastrService){

  }

  onSubmit(): void{
    this.router.navigate(['/weather'], { queryParams: { city: this.city }});
    this.city = '';
  }

  getCities(): void{
    this.cityService.getCities(this.city).subscribe(
        cities => {
          for(var i=0; i<cities.predictions.length; i++){
            cities.predictions[i].description = cities.predictions[i].description.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
          }
          this.cities = cities.predictions;
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
