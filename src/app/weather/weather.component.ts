import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { IWeather } from "./weather";
import { WeatherService } from "./weather.service";
import { ToastrService } from "ngx-toastr";
import { CityService } from "../city/city.service";
import { Router, Params, ActivatedRoute } from "@angular/router";
import { IDay } from "./day";

 @Component({
     templateUrl: './weather.component.html',
     styleUrls: ['./weather.component.css']
 })
export class WeatherComponent implements OnInit{
    city: string;
    errorMessage: string;
    weather: any;
    currentWeather: IWeather;
    hourlyWeather: IWeather[];
    dailyWeather: IWeather[];
    hourlySummary: string;
    dailySummary: string;
    backgroundImage: string = 'assets/images/landscape.jpg';
    countryClass: string;
    cities: any[];
    location: string;
    currentLatitude: number = 0.00;
    currentLongitude: number = 0.00;
    currentTimestamp: string;
    browserLang: string;
    day: IDay = {
        weathers:[],
        date:'',
        dayOfWeek:''
    };
    daysOfWeek: string[] = [
        'domingo',
        'lunes',
        'martes',
        'miercoles',
        'jueves',
        'viernes',
        'sabado'
    ]
    days: IDay[] = [];
    currentWeathers: IWeather[];
    
    baseCountryFlag: string = 'https://www.countryflags.io/';
    flag32: string = "/shiny/32.png";
    lat: number;
    lng: number;
    countryFlag: string;

    showHourly: boolean = true;
    showDaily: boolean = false;

    hourlyIcon: string;
    dailyIcon: string;

    @Output() markerDragged: EventEmitter<any> = new EventEmitter<any>();

    constructor(private weatherService: WeatherService,
                private toastrService: ToastrService,
                private cityService: CityService,
                private router: Router,
                private activatedRoute: ActivatedRoute){
        this.currentWeathers = [];
        this.activatedRoute.paramMap.subscribe(
            params => {
                console.log("Initializing");
            }
        )
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

        this.styleMap();

        this.getBrowserLanguage();

        this.activatedRoute.queryParams.subscribe(params => {
            this.lat = parseFloat(params.latitude);
            this.lng = parseFloat(params.longitude);
            this.countryFlag = this.baseCountryFlag + params.countryFlag + this.flag32;
            this.getLocation(params.city);
        });

    }

    markerClicked(event):void{

        console.log(event);
    }

    onSubmit(): void{
        this.router.navigate(['/weather'], { queryParams: { city: this.city, latitude: this.lat, longitude: this.lng, countryFlag: this.countryFlag  }});
        this.city = '';
      }

    onDragEnd(event):void{
        
        console.log(event.coords.lat + " - " + event.coords.lng);

        this.lat=event.coords.lat;
        this.lng=event.coords.lng;

        this.cityService.getCityByCoords(event.coords.lat, event.coords.lng).subscribe(
            city => {

                if(city != null){
                    this.city = city.formattedAddress;
                    this.lat = city.latitude;
                    this.lng = city.longitude;
                    this.countryFlag = city.countryCode;
                    this.onSubmit();
                }
                
                else{
                    this.toastrService.error("Place not found", "Click to dismiss", {extendedTimeOut: 0});
                }
            }
        )
        //this.markerDragged.emit({ latitude: event.coords.lat, longitude: event.coords.lng});
    }

    onMapClick(event): void{


        this.cityService.getCityByCoords(event.coords.lat, event.coords.lng).subscribe(
            city => {
                if(city !== null){
                    console.log(city.formattedAddress);
                    this.city = city.formattedAddress;
                    this.lat = city.latitude;
                    this.lng = city.longitude;
                    this.countryFlag = city.countryCode;
                    this.onSubmit();
                }

                else{
                    this.toastrService.error("Place not found", "Click to dismiss", {extendedTimeOut: 0});
                }
            }
        )

        console.log(event);
    }

    styleMap(): void{

        let element = document.getElementsByClassName("agm-map-container-inner").item(0);
        element.id = "mapStyler";

        document.getElementById("mapStyler").style.position = "absolute";
        document.getElementById("mapStyler").style.overflow = "hidden";
        document.getElementById("mapStyler").style.margin = "7rem 0rem";
        document.getElementById("mapStyler").style.borderRadius = "10px";
    }

    getCityWeather(): void{

        this.weatherService.getWeatherByLocation(this.currentLatitude, this.currentLongitude, this.browserLang).subscribe(
            weather => {
                if(weather.alerts !== null){
                    console.log("ALERTSSSSS!!!!!!!!!!!!!!");
                }
                this.day = {
                    weathers:[],
                    date:'',
                    dayOfWeek:''
                };
                this.days = [];
                this.currentWeathers = [];
                this.weather = weather;
                this.currentWeather = weather.currently;
                this.hourlyWeather = weather.hourly.data;
                this.dailyWeather = weather.daily.data;
                this.hourlySummary = weather.hourly.summary;
                this.hourlyIcon = weather.hourly.icon;
                this.dailySummary = weather.daily.summary;
                this.dailyIcon = weather.daily.icon;
                this.convertTimes(this.hourlyWeather, weather.offset);
                this.validateBackground();
                this.validateUvIndex(this.currentWeather);
                this.validateWindBearing(this.currentWeather);
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

        var offsetHalf = offset % 1;

        var hours = date.getUTCHours() + (Math.floor(offset));

        if(hours > 23) {
            hours = hours - 24;
        }

        else if(hours < 0){
            hours = hours + 24;
        }

        var minutes;

        if(offsetHalf > 0){
            minutes = date.getUTCMinutes() + 30;
        }

        else{
            minutes = date.getUTCMinutes();
        }

        if(minutes > 59){
            minutes = minutes - 60;
        }

        minutes = '0' + minutes;
        
        if(hours < 10){
            var formattedTime = "0" + hours + ':' + minutes.substr(-2);
        }

        else{
            var formattedTime = hours + ':' + minutes.substr(-2);
        }

        this.currentTimestamp = formattedTime;
    }

    buildTimestamp(weather: IWeather, offset: number): void{

        var date = new Date(weather.time*1000);

        var year = date.getUTCFullYear();
        var month = date.getUTCMonth() + 1;
        var day = date.getUTCDate();

        var hours = date.getUTCHours() + offset;

        if(hours > 23) {
            hours = hours - 24;
            day++;
        }

        else if(hours < 0){
            hours = hours + 24;
            day--;
        }

        var minutes = "0" + date.getUTCMinutes();

        if(hours < 10){
            var formattedTime = '0' + hours + ':' + minutes.substr(-2);
        }

        else{
            var formattedTime = hours + ':' + minutes.substr(-2);
        }

        weather.timeString = formattedTime;
        this.currentTimestamp = formattedTime;
    }

    getLocation(city: string): void{

        var parsedCity = encodeURIComponent(city.trim());

        this.cityService.getLocation(parsedCity).subscribe(
            location => {
                if(location != null && location.longitude != null 
                    && location.latitude != null){
                    this.city = city;
                    this.currentLatitude = location.latitude;
                    this.currentLongitude = location.longitude;
                    this.lat = this.currentLatitude;
                    this.lng = this.currentLongitude;
                    this.countryFlag = this.baseCountryFlag + location.countryCode + this.flag32;
                    this.getCityWeather();
                }

                else{
                    this.router.navigate(['/error']);
                    //this.toastrService.error('Please enter a valid location');
                }
                
            },
            error => {
                this.errorMessage = <any>error;
                this.toastrService.error(/*this.titleCasePipe.transform(*/this.errorMessage/*)*/);
            }
        )
    }

    clickHourly(event): void{

        var activeLink = document.getElementsByClassName("nav-link active");

        for(var i=0; i < activeLink.length; i++){
            activeLink.item(i).className = "nav-link";
        }

        if(event.target.className.indexOf("active") === -1){
            event.target.className += " active";
        }
        
        if(!this.showHourly){
            this.showHourly = !this.showHourly;
            this.showDaily = !this.showDaily;
        }
        
    }

    clickDaily(event): void{

        var activeLink = document.getElementsByClassName("nav-link active");

        for(var i=0; i < activeLink.length; i++){
            activeLink.item(i).className = "nav-link";
        }

        if(event.target.className.indexOf("active") === -1){
            event.target.className += " active";
        }

        if(!this.showDaily){
            this.showHourly = !this.showHourly;
            this.showDaily = !this.showDaily;
        }
    }

    getBrowserLanguage(): void{
        this.browserLang = navigator.language.split('-')[0];
        console.log(this.browserLang);
    }

    validateUvIndex(weather: IWeather): void{
        if(weather.uvIndex <= 2){
            weather.uvIndexDescription = 'Bajo';
        }
        else if(weather.uvIndex < 6){
            weather.uvIndexDescription = 'Moderado';
        }
        else if(weather.uvIndex < 8){
            weather.uvIndexDescription = 'Alto';
        }
        else if(weather.uvIndex < 11){
            weather.uvIndexDescription = 'Muy alto';
        }
        else{
            weather.uvIndexDescription = 'Extremadamente alto';
        }
    }

    validateWindBearing(weather: IWeather): void{
        if(weather.windBearing > 348.75 || weather.windBearing <= 11.25){
            weather.windBearingDescription = 'N';
        }

        else if(weather.windBearing > 11.25 && weather.windBearing <= 33.75){
            weather.windBearingDescription = 'NNE';
        }

        else if(weather.windBearing > 33.75 && weather.windBearing <= 56.25){
            weather.windBearingDescription = 'NE';
        }

        else if(weather.windBearing > 56.25 && weather.windBearing <= 78.75){
            weather.windBearingDescription = 'ENE';
        }

        else if(weather.windBearing > 78.75 && weather.windBearing <= 101.25){
            weather.windBearingDescription = 'E';
        }

        else if(weather.windBearing > 101.25 && weather.windBearing <= 123.75){
            weather.windBearingDescription = 'ESE';
        }

        else if(weather.windBearing > 123.75 && weather.windBearing <= 146.25){
            weather.windBearingDescription = 'SE';
        }

        else if(weather.windBearing > 146.25 && weather.windBearing <= 168.75){
            weather.windBearingDescription = 'SSE';
        }

        else if(weather.windBearing > 168.75 && weather.windBearing <= 191.25){
            weather.windBearingDescription = 'S';
        }

        else if(weather.windBearing > 191.25 && weather.windBearing <= 213.75){
            weather.windBearingDescription = 'SSO';
        }

        else if(weather.windBearing > 213.75 && weather.windBearing <= 236.25){
            weather.windBearingDescription = 'SO';
        }
        
        else if(weather.windBearing > 236.25 && weather.windBearing <= 258.75){
            weather.windBearingDescription = 'OSO';
        }

        else if(weather.windBearing > 258.75 && weather.windBearing <= 281.25){
            weather.windBearingDescription = 'O';
        }

        else if(weather.windBearing > 281.25 && weather.windBearing <= 303.75){
            weather.windBearingDescription = 'ONO';
        }
        
        else if(weather.windBearing > 303.75 && weather.windBearing <= 326.25){
            weather.windBearingDescription = 'NO';
        }

        else if(weather.windBearing > 326.25 && weather.windBearing <= 348.75){
            weather.windBearingDescription = 'NNO';
        }
    }

    validateBackground(): void{
        if(this.currentWeather.icon == 'partly-cloudy-day'){
            this.backgroundImage = 'assets/images/partly-cloudy-day.jpg';
        }
        else if(this.currentWeather.icon == 'partly-cloudy-night'){
            this.backgroundImage = 'assets/images/partly-cloudy-night.jpg';
        }
        else if(this.currentWeather.icon == 'clear-day'){
            this.backgroundImage = 'assets/images/clear-day.jpg';
        }
        else if(this.currentWeather.icon == 'clear-night'){
            this.backgroundImage = 'assets/images/clear-night.jpg';
        }
        else if(this.currentWeather.icon == 'rain'){
            this.backgroundImage = 'assets/images/lightRain.jpg';
        }
        else if(this.currentWeather.icon == 'cloudy'){
            this.backgroundImage = 'assets/images/cloudy.jpg';
        }
        else if(this.currentWeather.icon == 'wind'){
            this.backgroundImage = 'assets/images/wind.jpg';
        }
        else if(this.currentWeather.icon == 'fog'){
            this.backgroundImage = 'assets/images/fog.jpg';
        }
    }

    convertTimes(weathers: IWeather[], offset: number): void{

        var firstDate = new Date(weathers[0].time * 1000);
        var pivotDay = firstDate.getUTCDate();
        var firstDayOfWeek = firstDate.getUTCDay();
        var firstDayHours = firstDate.getUTCHours() + offset;

        if(firstDayHours > 23) {
            firstDayHours-=24;
            pivotDay++;
            firstDayOfWeek = (firstDayOfWeek+1)%7;
        }

        else if(firstDayHours < 0){
            firstDayHours+=24;
            pivotDay--;
            firstDayOfWeek = (firstDayOfWeek-1)%7;
        }

        for(var i=0; i<weathers.length; i++){
            
            this.buildTimestamp(weathers[i], offset);
            this.validateUvIndex(weathers[i]);
            this.validateWindBearing(weathers[i]);

            var currentDate = new Date(weathers[i].time * 1000);
            var currentDay = currentDate.getUTCDate();
            var currentDayOfWeek = currentDate.getUTCDay();
            var currentDayHours = currentDate.getUTCHours() + offset;

            if(currentDayHours > 23) {
                currentDayHours-=24;
                currentDay++;
                currentDayOfWeek = (currentDayOfWeek+1)%7;
            }

            else if(currentDayHours < 0){
                currentDayHours+=24;
                currentDay--;
                currentDayOfWeek = (currentDayOfWeek-1)%7;
            }

            if(currentDay != pivotDay){
                this.day.weathers = this.currentWeathers;
                this.day.date = pivotDay + '/' + (firstDate.getUTCMonth()+1) + '/' + firstDate.getUTCFullYear();
                this.day.dayOfWeek = this.daysOfWeek[firstDayOfWeek];
                let copy = Object.assign({}, this.day)
                this.days.push(copy);
                this.currentWeathers = [];
                pivotDay = currentDay;
                firstDate = currentDate;
                firstDayOfWeek = currentDayOfWeek;
                this.currentWeathers.push(weathers[i]);
            }

            else{
                this.currentWeathers.push(weathers[i]);
                if(i == (weathers.length-1)){
                    this.day.weathers = this.currentWeathers;
                    this.day.date = pivotDay + '/' + (firstDate.getUTCMonth()+1) + '/' + firstDate.getUTCFullYear();
                    this.day.dayOfWeek = this.daysOfWeek[firstDayOfWeek];
                    let copy = Object.assign({}, this.day)
                    this.days.push(copy);
                }
            }
        }
    }

    isLocality(location: any): boolean{

        for(var i=0; i < location.types.length; i++){
            if(location.types[i] == 'locality'){
                return true;
            }
        }

        return false;
    }

    ngCollapse(index: number){

        var hourly = document.getElementById('hourlyTable'+index);
        var arrow = document.getElementById('buttonArrow'+index);

        if(hourly.style.display == 'block'){
            hourly.style.display = 'none';
            arrow.className = 'fa fa-angle-down';
        }
        
        else{
            hourly.style.display = 'block';
            hourly.style.animation = 'slide-down .9s ease-out';
            hourly.style.webkitAnimation = 'slide-down 1s ease-out';
            arrow.className = 'fa fa-angle-up';
        }
    }
}