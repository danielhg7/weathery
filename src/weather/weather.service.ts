import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { ICityWeather } from "./cityWeather";

@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    private weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';

    constructor(private http: HttpClient) {}

    getgetCityWeatherByName(city: string): Observable<ICityWeather> {

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        let params = new HttpParams().set('q', city).set('appid', '25e473e910feaf92d205315541ffe0d8');

        return this.http.get<ICityWeather>(this.weatherUrl, { headers: headers, params: params }).pipe(
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