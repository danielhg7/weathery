import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './home/welcome.component';
import { WeatherComponent } from './weather/weather.component';
import { ErrorComponent } from './error/error.component';
import { CurrentWeatherComponent } from './weather/current-weather/current-weather.component';
import { AgmCoreModule } from '@agm/core';
import { FloorPipe } from './util/pipe/decimal-floor.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    WeatherComponent,
    ErrorComponent,
    CurrentWeatherComponent,
    FloorPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'weather', component: WeatherComponent },
      { path: 'error', component: ErrorComponent},
      { path: 'home', component: WelcomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCmt5tRRBAZVwPZ6PZBzOEflBNg_-2K3s8'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
