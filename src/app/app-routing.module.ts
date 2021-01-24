import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'location',
    pathMatch: 'full',
  },
  {
    path: 'location',
    loadChildren: () => import('./location').then((m) => m.LocationModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings').then((m) => m.SettingsModule),
  },
  {
    path: 'weather',
    loadChildren: () => import('./weather').then((m) => m.WeatherModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
