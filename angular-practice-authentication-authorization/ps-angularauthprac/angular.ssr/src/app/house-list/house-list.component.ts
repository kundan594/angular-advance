import {Component, effect, inject, signal} from '@angular/core';
import { Router } from '@angular/router';

import {House} from '../types/house';
import {HouseService} from '../Services/house.service';
import {AuthService} from '../Services/auth.service';

@Component({
  selector: 'app-house-list',
  imports: [],
  templateUrl: './house-list.component.html',
})
export class HouseListComponent {
  public readonly houseService = inject(HouseService);
  public readonly auth = inject(AuthService);
  public readonly router = inject(Router);

  houses = signal<House[]>([]);
  error = signal<string>('');

  public authenticated = this.auth.isAuthenticated;
  public canAdd = this.auth.canAdd;

  private fetchHousesEffect = effect(() => {
    if (this.authenticated()) {
      this.houseService.getHouses().subscribe({
        next: (h) => (this.houses.set(h)),
        error: () => this.error.set('Failed to load house details')
      })
    }
  });

  navigateToHouse(id: number) {
    this.router.navigate([`/house/${id}`]);
  }

  addHouse() {
    const maxId = Math.max(...this.houses().map(house => house.id), 0);

    const newHouse: House = {
      id: maxId + 1,
      address: '32 Valley Way, New York',
      country: 'USA',
      description: '',
      photo: '',
      price: 1000000,
    };
    this.houses.set([...this.houses(), newHouse]);
    this.houseService.postHouse(newHouse);
  }
}
