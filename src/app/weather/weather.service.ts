import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { ICityWeather } from "./cityWeather";

@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    private baseUrl = 'http://192.168.1.89:8000';
    private url;

    constructor(private http: HttpClient) {}

    getWeatherByLocation(latitude: number, longitude: number, lang: string): Observable<any> {

        this.url = this.baseUrl + '/api/forecast';
        var params = new HttpParams().set('latitude', latitude.toString())
                                    .set('longitude', longitude.toString());

        if(lang){
            params = params.set('lang', lang).set('units', 'si');
        }

        else{
            params = params.set('units', 'si');
        }

        return this.http.get<any>(this.url, { params: params }).pipe(
            tap(data => data),
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