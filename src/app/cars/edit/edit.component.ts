import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../car.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from '../models/car';

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

  car: Car | null = this.carService.getCarById(Number(this.id))

  constructor() {
    this.carForm = this.formBuilder.group({
      make: [this.car?.make, Validators.required],
      model: [this.car?.model, Validators.required],
      description: [this.car?.description, Validators.required],
    })
  }

  updateCar() {
    this.carService.updateCar({...this.carForm.value, id: Number(this.id)})
    this.router.navigate(['cars'])
  }

}
