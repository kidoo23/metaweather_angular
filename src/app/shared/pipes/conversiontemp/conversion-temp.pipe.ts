import { Pipe, PipeTransform } from '@angular/core';
import { TemperatureUnits } from '../../../core/services/temperature.service';

@Pipe({
  name: 'conversionTemp',
})
export class ConversionTempPipe implements PipeTransform {
  constructor() {}

  transform(temp: string, unit: TemperatureUnits): string {
    // 섭씨
    if (unit === TemperatureUnits.celsius) {
      return Number.parseFloat(temp).toFixed(0) + this.getUnitSign(unit);
    }

    // 화씨
    return (
      ((Number.parseFloat(temp) * 9) / 5 + 32).toFixed(0) +
      this.getUnitSign(unit)
    );
  }

  private getUnitSign(unit: TemperatureUnits): string {
    return unit === TemperatureUnits.celsius ? '°C' : '°F';
  }
}
