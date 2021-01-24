import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export enum TemperatureUnits {
  celsius = 'celsius',
  fahrenheit = 'fahrenheit',
}

@Injectable({
  providedIn: 'root',
})
export class TemperatureService {
  constructor() {}

  private temperatureUnitSubject = new BehaviorSubject<TemperatureUnits>(
    this.init()
  );

  private temperatureUnit$ = this.temperatureUnitSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  protected init(): TemperatureUnits {
    return TemperatureUnits.celsius;
  }

  public toggleUnit(): void {
    const currentUnit = this.temperatureUnitSubject.getValue();
    const changedUnit =
      currentUnit === TemperatureUnits.celsius
        ? TemperatureUnits.fahrenheit
        : TemperatureUnits.celsius;

    this.temperatureUnitSubject.next(changedUnit);
  }

  public getUnit(): Observable<TemperatureUnits> {
    return this.temperatureUnit$;
  }

  public resetUnit(): void {
    this.temperatureUnitSubject.next(TemperatureUnits.celsius);
  }
}
