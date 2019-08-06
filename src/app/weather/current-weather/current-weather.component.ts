import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IWeather } from '../weather';

@Component({
  selector: 'wt-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit,OnChanges {

  @Input() weather: IWeather;
  @Input() timestamp: string;
  @Input() city: string;
  @Input() currentCountryFlag: string;

  constructor() { }

  ngOnInit() {
    console.log(this.city);
  }

  ngOnChanges() {
    console.log(this.city);
  }

}
