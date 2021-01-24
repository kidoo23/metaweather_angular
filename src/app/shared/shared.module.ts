import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WeatherIconDirective } from './directives/weather-icon.directive';
import { ConversionTempPipe } from './pipes/conversiontemp/conversion-temp.pipe';

@NgModule({
  declarations: [ConversionTempPipe, WeatherIconDirective],
  imports: [CommonModule],
  exports: [ConversionTempPipe, WeatherIconDirective],
})
export class SharedModule {}
