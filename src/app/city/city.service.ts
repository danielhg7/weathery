import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { ICity } from "./city";
import { tap, catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class CityService {

    private baseUrl = 'http://localhost:8085';
    private url;

    constructor(private http: HttpClient) {}

    getCities(value: string): Observable<any> {
        
        this.url = this.baseUrl + '/api/cities';
        
        let params = new HttpParams().set('input', value);

        return this.http.get<any>(this.url, {params: params }).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getLocation(value: string): Observable<any> {

        this.url = this.baseUrl + '/api/location';

        let params = new HttpParams().set('address', value);

        return this.http.get<any>(this.url, { params: params }).pipe(
            tap(data => data),
            catchError(this.handleError)
        );
    }

    getCityByCoords(latitude: any, longitude: any){

        this.url = this.baseUrl + '/api/location/coords';

        let params = new HttpParams().set('latitude', latitude).set('longitude', longitude);

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