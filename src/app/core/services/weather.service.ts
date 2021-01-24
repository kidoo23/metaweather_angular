import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Weather, WeatherCondition } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private api: ApiService) {}

  getWeather(locationId: number): Observable<Weather> {
    return this.api
      .get(`/api/location/${locationId}`)
      .pipe(map((data) => this.convert(data)));
  }

  private convert(data: any): Weather {
    const consolidatedWeather = data.consolidated_weather[0];
    return {
      condition: this.mapStringToWeatherCondition(
        consolidatedWeather.weather_state_abbr
      ),
      formattedCondition: consolidatedWeather.weather_state_name,
      minTemp: consolidatedWeather.min_temp,
      maxTemp: consolidatedWeather.max_temp,
      temp: consolidatedWeather.the_temp,
      // minTemp: Number.parseFloat(consolidatedWeather.min_temp).toFixed(0),
      // maxTemp: Number.parseFloat(consolidatedWeather.max_temp).toFixed(0),
      // temp: Number.parseFloat(consolidatedWeather.the_temp).toFixed(0),
      locationId: data.woeid,
      created: consolidatedWeather.created,
      lastUpdated: new Date(),
      location: data.title,
    } as Weather;
  }

  private mapStringToWeatherCondition(input: string): WeatherCondition {
    let state: WeatherCondition;
    switch (input) {
      case 'sn':
        state = WeatherCondition.snow;
        break;
      case 'sl':
        state = WeatherCondition.sleet;
        break;
      case 'h':
        state = WeatherCondition.hail;
        break;
      case 't':
        state = WeatherCondition.thunderstorm;
        break;
      case 'hr':
        state = WeatherCondition.heavyRain;
        break;
      case 'lr':
        state = WeatherCondition.lightRain;
        break;
      case 's':
        state = WeatherCondition.showers;
        break;
      case 'hc':
        state = WeatherCondition.heavyCloud;
        break;
      case 'lc':
        state = WeatherCondition.lightCloud;
        break;
      case 'c':
        state = WeatherCondition.clear;
        break;
      default:
        state = WeatherCondition.unknown;
    }
    return state;
  }
}
