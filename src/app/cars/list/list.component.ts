import { Component, inject } from '@angular/core';
import { CarService } from '../services/car.service';
import { Car } from '../models/car';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
 carService = inject(CarService)
 cars$: Observable<Car[]> | undefined;

 constructor() {
  this.loadAllCars();
 }

 loadAllCars() {
  this.cars$ = this.carService.getAllCars();
}
 
 deleteCar(id: any) {
  this.carService.deleteCar(id).subscribe(() => {this.loadAllCars();})
 }

}
