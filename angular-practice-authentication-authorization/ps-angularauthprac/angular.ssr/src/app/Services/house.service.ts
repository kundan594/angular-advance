import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { House } from '../types/house';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  public readonly http = inject(HttpClient);

  getHouses(): Observable<House[]> {
    return this.http.get<House[]>('api/houses');
  }

  getHouse(id: number) {
    return this.http.get<House>(`api/houses/${id}`);
  }

  postHouse(house: House) {
    return this.http.post('api/houses', house);
  }
}
