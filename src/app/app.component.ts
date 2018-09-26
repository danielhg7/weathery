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

  constructor(private weatherService: WeatherService){

  }

  getCityWeather(): void{
    this.weatherService.getgetCityWeatherByName(this.city).subscribe(
      weather => {
          this.weather = weather;
          this.weather.main.temp = this.weather.main.temp - 273.15;
      },
      error => this.errorMessage = <any>error
    );
  }

  goBack(): void{
    this.weather = undefined;
    this.city = '';
  }
}
