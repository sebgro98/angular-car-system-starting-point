import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../services/car.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from '../models/car';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  route = inject(ActivatedRoute)
  carService = inject(CarService)
  router = inject(Router)
  formBuilder = inject(FormBuilder)
  carForm: FormGroup;
  id = this.route.snapshot.paramMap.get('id')

  car$: Observable<Car> = this.carService.getCarById(this.id)

  constructor() {
    this.carForm = this.formBuilder.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      description: ['', Validators.required],
    })

    this.car$.subscribe((car) => {
      if(car){
        this.carForm.patchValue({
          make: car.make,
          model: car.model,
          description: car.description
        })
      }
    })
  }

  updateCar() {
    this.carService.updateCar(this.carForm.value, this.id).subscribe()
    this.router.navigate(['cars'])
  }

}
