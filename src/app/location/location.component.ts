import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationService } from '../core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent {
  constructor(private location: LocationService, private router: Router) {}

  cityField = new FormControl();

  search(): void {
    this.location.searchLocation(this.cityField.value).subscribe((location) => {
      if (Object.keys(location).length !== 0) {
        this.router.navigateByUrl('/weather');
        return;
      }

      alert('not found!!');
    });
  }
}
