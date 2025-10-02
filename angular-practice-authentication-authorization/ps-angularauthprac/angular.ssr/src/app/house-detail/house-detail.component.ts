import { Component, OnInit, inject, input, signal } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { House } from '../types/house';
import { HouseService } from '../Services/house.service';

@Component({
  selector: 'app-house-detail',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './house-detail.component.html',
})
export class HouseDetailComponent implements OnInit {
  private readonly houseService = inject(HouseService);

  house = signal<House>({ id: 0, address: '', country: '', description: '', photo: '', price: 0});
  error = signal<string>('');
  // Get the id from the route parameter
  id = input.required<number>();

  ngOnInit() {
      if (this.id()) {
        this.getHouse(this.id());
      }
  }

  private getHouse(id: number) {
    this.houseService.getHouse(id).subscribe({
      next: (house) => this.house.set(house),
      error: () => this.error.set('Failed to load house details')
    });
  }
}
