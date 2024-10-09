import { inject, Injectable } from '@angular/core';
import { Car } from '../models/car';
import { CARS } from '../data/cars';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  // private cars: Car[] = CARS;
  // private currentId: number = this.cars.length;

  private httpClient = inject(HttpClient)

  public getCarById(id: any | null): Observable<Car> {
    return this.httpClient.get<Car>(`http://localhost:3000/cars/${id}`)
   
  }

  public getAllCars(): Observable<Car[]> {
    return this.httpClient.get<Car[]>("http://localhost:3000/cars")
  }

  public addCar(car: Car): Observable<Car>  {
    return this.httpClient.post<Car>("http://localhost:3000/cars", car);
  }

  public updateCar(updatedCar: Car, id: any): Observable<Car>  {
    return this.httpClient.put<Car>(`http://localhost:3000/cars/${id}`, updatedCar);
  }

  public deleteCar(id: any | null) {
    return this.httpClient.delete<Car>(`http://localhost:3000/cars/${id}`);
  }
}
