import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { Location } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private api: ApiService) {}

  private locationSubject = new BehaviorSubject<Location>({} as Location);

  private location$ = this.locationSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  searchLocation(city: string): Observable<Location> {
    return this.api //
      .get('/api/location/search', { query: city })
      .pipe(
        map((data) => this.convert(data)),
        map((locations) => locations[0] || ({} as Location)),
        tap((location) => {
          Object.keys(location).length !== 0
            ? this.locationSubject.next(location)
            : this.locationSubject.next(null);
        })
      );
  }

  getCurrentLocation(): Observable<Location> {
    return this.location$;
  }

  private convertGPS(gps: string): { latitude: number; longitude: number } {
    const [latitude, longitude] = gps.split(',');
    return {
      latitude: Number(latitude),
      longitude: Number(longitude),
    };
  }

  private convert(sources: any[]): Location[] {
    const context = this;
    return sources.map((source) => {
      return {
        ...source,
        locationType: source.location_type,
        woeid: Number(source.woeid),
        ...context.convertGPS(source.latt_long),
      };
    });
  }
}
