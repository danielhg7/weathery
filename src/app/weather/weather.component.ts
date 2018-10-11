import { Component } from "@angular/core";
import { IWeather } from "./weather";
import { WeatherService } from "./weather.service";
import { ToastrService } from "ngx-toastr";
import { CityService } from "../city/city.service";
import { Router, Params, ActivatedRoute } from "@angular/router";

 @Component({
     templateUrl: './weather.component.html',
     styleUrls: ['./weather.component.css']
 })
export class WeatherComponent{
    city: string;
    errorMessage: string;
    weather: any;
    currentWeather: IWeather;
    backgroundImage: string = 'src/assets/images/landscape.jpg';
    countryClass: string;
    cities: any[];
    location: string;
    currentLatitude: number = 0.00;
    currentLongitude: number = 0.00;
    currentTimestamp: string;
    browserLang: string;

    constructor(private weatherService: WeatherService,
                private toastrService: ToastrService,
                private cityService: CityService,
                private router: Router,
                private activatedRoute: ActivatedRoute
                /*private titleCasePipe: TitleCasePipe*/){

    }

    /*getCityWeather(): void{

    this.weatherService.getCityWeatherByName(this.city).subscribe(
        weather => {
            this.weather = weather;
            this.weather.main.temp = this.weather.main.temp - 273.15;
            this.countryClass = " flag-icon-" + this.weather.sys.country.toLocaleLowerCase();

            if(this.weather.weather[0].description == 'fog'){
            this.backgroundImage = 'src/assets/images/fog.jpg';
            }

            else if(this.weather.weather[0].description == 'mist'){
            this.backgroundImage = 'src/assets/images/mist.jpg';
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

            else if(this.weather.weather[0].description == 'heavy intensity rain'){
            this.backgroundImage = 'src/assets/images/heavyIntensityRain.jpg';
            }

            else if(this.weather.weather[0].description == 'clear sky'){
            this.backgroundImage = 'src/assets/images/clearSky.jpg';
            }

        },
        error => {
        this.errorMessage = <any>error;
        this.toastrService.error(/*this.titleCasePipe.transform(*///this.errorMessage/*)*//*);
        /*}
    );
    }*/

    ngOnInit() {

        this.getBrowserLanguage();

        this.activatedRoute.queryParams.subscribe(params => {
            let city = params.city;
            console.log(city);
            this.city = city;
            this.getLocation(city);
        });
    }

    getCityWeather(): void{

        this.weatherService.getWeatherByLocation(this.currentLatitude, this.currentLongitude, this.browserLang).subscribe(
            weather => {
                this.weather = weather;
                this.currentWeather = weather.currently;
                this.validateBackground();
                this.validateUvIndex();
                this.buildCurrentTimestamp(weather.offset);
            },
            error => {
                this.errorMessage = <any>error;
                this.toastrService.error(/*this.titleCasePipe.transform(*/this.errorMessage/*)*/);
            }
        );
    }

    goBack(): void{
        this.router.navigate(['/home']);
    }

    buildCurrentTimestamp(offset: number): void{

    var date = new Date();

    var hours = date.getUTCHours() + offset;

    if(hours > 23) {
        hours = hours - 24;
    }

    else if(hours < 0){
        hours = hours + 24;
    }

    var minutes = "0" + date.getUTCMinutes();

    var seconds = "0" + date.getUTCSeconds();

    if(hours < 10){
        var formattedTime = "0" + hours + ':' + minutes.substr(-2);
    }

    else{
        var formattedTime = hours + ':' + minutes.substr(-2);
    }


    this.currentTimestamp = formattedTime;
    }

    getLocation(city: string): void{
        this.cityService.getLocation(city).subscribe(
            location => {
                this.location = location.results[0];
                this.currentLatitude = location.results[0].geometry.location.lat;
                this.currentLongitude = location.results[0].geometry.location.lng;
                this.getCityWeather();
            },
            error => {
                this.errorMessage = <any>error;
                this.toastrService.error(/*this.titleCasePipe.transform(*/this.errorMessage/*)*/);
            }
        )
    }

    getBrowserLanguage(): void{
        this.browserLang = navigator.language.split('-')[0];
        console.log(this.browserLang);
    }

    validateUvIndex(): void{
        if(this.currentWeather.uvIndex <= 2){
            this.currentWeather.uvIndexDescription = 'Bajo';
        }
        else if(this.currentWeather.uvIndex < 6){
            this.currentWeather.uvIndexDescription = 'Moderado';
        }
        else if(this.currentWeather.uvIndex < 8){
            this.currentWeather.uvIndexDescription = 'Alto';
        }
        else if(this.currentWeather.uvIndex < 11){
            this.currentWeather.uvIndexDescription = 'Muy alto';
        }
        else{
            this.currentWeather.uvIndexDescription = 'Extremadamente alto';
        }
    }

    validateBackground(): void{
        if(this.currentWeather.icon == 'partly-cloudy-day'){
            this.backgroundImage = 'src/assets/images/partly-cloudy-day.jpg';
        }
        else if(this.currentWeather.icon == 'partly-cloudy-night'){
            this.backgroundImage = 'src/assets/images/partly-cloudy-night.jpg';
        }
        else if(this.currentWeather.icon == 'clear-day'){
            this.backgroundImage = 'src/assets/images/clear-day.jpg';
        }
        else if(this.currentWeather.icon == 'clear-night'){
            this.backgroundImage = 'src/assets/images/clear-night.jpg';
        }
        else if(this.currentWeather.icon == 'rain'){
            this.backgroundImage = 'src/assets/images/lightRain.jpg';
        }
        else if(this.currentWeather.icon == 'cloudy'){
            this.backgroundImage = 'src/assets/images/cloudy.jpg';
        }
        else if(this.currentWeather.icon == 'wind'){
            this.backgroundImage = 'src/assets/images/wind.jpg';
        }
        else if(this.currentWeather.icon == 'fog'){
            this.backgroundImage = 'src/assets/images/fog.jpg';
        }
    }
}