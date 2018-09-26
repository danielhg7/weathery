import { Component } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { ICityWeather } from '../weather/cityWeather';
import { Router } from '@angular/router';

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

  constructor(private weatherService: WeatherService){

  }

  getCityWeather(): void{
    this.weatherService.getgetCityWeatherByName(this.city).subscribe(
      weather => {
          this.weather = weather;
          this.weather.main.temp = this.weather.main.temp - 273.15;

          if(this.weather.weather[0].main == 'Clear'){
            this.backgroundImage = 'src/assets/images/clear.jpg';
          }

          else if(this.weather.weather[0].main == 'Fog'){
            this.backgroundImage = 'src/assets/images/fog.jpg';
          }

          else if(this.weather.weather[0].description == 'few clouds'){
            this.backgroundImage = 'src/assets/images/fewClouds.jpg';
          }

          else if(this.weather.weather[0].description == 'scattered clouds'){
            this.backgroundImage = 'src/assets/images/scatteredClouds.jpg';
          }

          else if(this.weather.weather[0].description == 'shower rain'){
            this.backgroundImage = 'src/assets/images/showerRain.jpg';
          }

          else if(this.weather.weather[0].description == 'clear sky'){
            this.backgroundImage = 'src/assets/images/clearSky.jpg';
          }

      },
      error => this.errorMessage = <any>error
    );
  }

  goBack(): void{
    this.weather = undefined;
    this.city = '';
  }
}
