import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  TemperatureService,
  TemperatureUnits,
} from '../core/services/temperature.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor(
    private temperatureService: TemperatureService //
  ) {}

  temperatureUnits = TemperatureUnits;
  temperatureUnit$: Observable<TemperatureUnits>;

  ngOnInit(): void {
    this.temperatureUnit$ = this.temperatureService.getUnit();
  }

  onToggle(): void {
    this.temperatureService.toggleUnit();
  }
}
