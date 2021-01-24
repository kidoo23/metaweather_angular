import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExistsLocationGuard } from './exists-location.guard';
import { WeatherComponent } from './weather.component';
import { WeatherResolver } from './weather.resolver';

const routes: Routes = [
  {
    path: '',
    component: WeatherComponent,
    canActivate: [ExistsLocationGuard],
    resolve: {
      weather: WeatherResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeatherRoutingModule {}
