import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { LocationService } from '../core/services/location.service';

@Injectable({
  providedIn: 'root',
})
export class ExistsLocationGuard implements CanActivate {
  constructor(
    private router: Router, //
    private location: LocationService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.location.getCurrentLocation().pipe(
      take(1),
      map((location) => Object.keys(location).length !== 0),
      tap((exists) => {
        if (!!!exists) {
          this.router.navigateByUrl('/location');
        }
      })
    );
  }
}
