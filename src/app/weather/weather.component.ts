import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Weather } from '../core/models/weather.model';
import {
  TemperatureService,
  TemperatureUnits,
} from '../core/services/temperature.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  weather: Weather;
  temperature$: Observable<TemperatureUnits>;

  constructor(
    private route: ActivatedRoute, //
    private temperature: TemperatureService
  ) {}

  ngOnInit(): void {
    this.temperature$ = this.temperature.getUnit();
    this.route.data.pipe(map((data) => data.weather)).subscribe((weather) => {
      this.weather = weather;
    });
  }
}
