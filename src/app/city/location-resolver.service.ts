import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { CityService } from "./city.service";

@Injectable({
    providedIn: 'root'
})

export class LocationResolver implements Resolve<any>{

    constructor(private cityService: CityService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

        return this.cityService.getLocation(encodeURIComponent(route.queryParamMap.get('city').trim()));
    }
}