import { TestBed, waitForAsync } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { TemperatureService, TemperatureUnits } from './temperature.service';

describe('온도 단위 변경 서비스(TemperatureService)', () => {
  let temperatureService: TemperatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    temperatureService = TestBed.inject(TemperatureService);
  });

  afterEach(() => {
    temperatureService.resetUnit();
  });

  it(
    '기본 단위는 섭씨(celsius)',
    waitForAsync(() => {
      temperatureService
        .getUnit()
        .pipe(take(1))
        .subscribe((unit) => {
          expect(unit).toBe(TemperatureUnits.celsius);
        });
    })
  );

  it(
    '토글 온도 단위(celsius -> fahrenheit)',
    waitForAsync(() => {
      temperatureService.toggleUnit();
      temperatureService
        .getUnit()
        .pipe(take(1))
        .subscribe((unit) => {
          expect(unit).toBe(TemperatureUnits.fahrenheit);
        });
    })
  );
});
