import { Component } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { ICityWeather } from '../weather/cityWeather';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'wt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle: string  = 'weathery';
  city: string;
  errorMessage: string;
  weather: ICityWeather;
  backgroundImage: string = 'src/assets/images/landscape.jpg';

  constructor(private weatherService: WeatherService,
              private toastrService: ToastrService
              /*private titleCasePipe: TitleCasePipe*/){

  }

  getCityWeather(): void{

    this.weatherService.getgetCityWeatherByName(this.city).subscribe(
      weather => {
          this.weather = weather;
          this.weather.main.temp = this.weather.main.temp - 273.15;

          if(this.weather.weather[0].main == 'Fog'){
            this.backgroundImage = 'src/assets/images/fog.jpg';
          }

          else if(this.weather.weather[0].description == 'few clouds'){
            this.backgroundImage = 'src/assets/images/fewClouds.jpg';
          }

          else if(this.weather.weather[0].description == 'scattered clouds'){
            this.backgroundImage = 'src/assets/images/scatteredClouds.jpg';
          }

          else if(this.weather.weather[0].description == 'broken clouds'){
            this.backgroundImage = 'src/assets/images/brokenClouds.jpg';
          }
          
          else if(this.weather.weather[0].description == 'light rain'){
            this.backgroundImage = 'src/assets/images/lightRain.jpg';
          }

          else if(this.weather.weather[0].description == 'shower rain'){
            this.backgroundImage = 'src/assets/images/showerRain.jpg';
          }

          else if(this.weather.weather[0].description == 'clear sky'){
            this.backgroundImage = 'src/assets/images/clearSky.jpg';
          }

      },
      error => {
        this.errorMessage = <any>error;
        this.toastrService.error(/*this.titleCasePipe.transform(*/this.errorMessage/*)*/);
      }
    );
  }

  goBack(): void{
    this.weather = undefined;
    this.city = '';
  }
}
