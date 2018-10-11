import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { ICity } from "./city";
import { tap, catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class CityService {

    //private citiesApiUrl = 'https://andruxnet-world-cities-v1.p.mashape.com';
    private googleCitiesApi = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
    private googleGeocodeApi = 'https://maps.googleapis.com/maps/api/geocode/json';
    private googleApiKey = 'AIzaSyDe4NiqieYdjwWF2FdTIrDHIEIKzs4gBbY';

    constructor(private http: HttpClient) {}

    getCities(value: string): Observable<any> {

        let params = new HttpParams().set('input', value).set('types', '(cities)').set('key', this.googleApiKey);

        return this.http.get<any>(this.googleCitiesApi, { params: params }).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getLocation(value: string): Observable<any> {

        let params = new HttpParams().set('address', value).set('key', this.googleApiKey);

        return this.http.get<any>(this.googleGeocodeApi, { params: params }).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';

        if(err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        }

        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `${err.error.message}`;
        }

        console.error(errorMessage);
        return throwError(errorMessage);
    }
}