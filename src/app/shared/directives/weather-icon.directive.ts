import { Directive, ElementRef, Input } from '@angular/core';
import { WeatherCondition } from '../../core/models/weather.model';

@Directive({
  selector: '[appWeatherIcon]',
})
export class WeatherIconDirective {
  constructor(
    private el: ElementRef //
  ) {}

  @Input()
  set appWeatherIcon(condition: WeatherCondition) {
    const icon = this._mapConditionToIcon(condition);
    this.el.nativeElement.className = 'icon ' + icon;
  }

  private _mapConditionToIcon(condition: WeatherCondition): string {
    let icon: string;

    switch (condition) {
      case WeatherCondition.clear:
      case WeatherCondition.lightCloud:
        icon = 'w_clear';
        break;
      case WeatherCondition.hail:
      case WeatherCondition.snow:
      case WeatherCondition.sleet:
        icon = 'w_snow';
        break;
      case WeatherCondition.heavyCloud:
        icon = 'w_cloudy';
        break;
      case WeatherCondition.heavyRain:
      case WeatherCondition.lightRain:
      case WeatherCondition.showers:
        icon = 'w_rainy';
        break;
      case WeatherCondition.thunderstorm:
        icon = 'w_thunderstorm';
        break;
      case WeatherCondition.unknown:
        icon = 'w_clear';
        break;
    }
    return icon;
  }
}
