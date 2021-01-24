import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Weather } from '../core/models/weather.model';
import { LocationService } from '../core/services/location.service';
import { WeatherService } from '../core/services/weather.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherResolver implements Resolve<Weather> {
  constructor(
    private locationService: LocationService, //
    private weatherService: WeatherService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Weather> {
    return this.locationService.getCurrentLocation().pipe(
      take(1),
      switchMap((location) => {
        return this.weatherService.getWeather(location.woeid).pipe(take(1));
      })
    );
  }
}
