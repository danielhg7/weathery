import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { IWeather } from "./weather";
import { WeatherService } from "./weather.service";

@Injectable({
    providedIn: 'root'
})

export class WeatherResolver implements Resolve<IWeather>{

    browserLang: string;

    constructor(private weatherService: WeatherService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

        this.browserLang = navigator.language.split('-')[0];
        return this.weatherService.getWeatherByLocation(+route.queryParamMap.get('latitude'), 
                                                        +route.queryParamMap.get('longitude'),
                                                        this.browserLang);
    }
}