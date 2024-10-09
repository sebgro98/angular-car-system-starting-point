import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from '../models/car';
import { CarService } from '../services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  carForm: FormGroup;
  formBuilder = inject(FormBuilder)
  carService = inject(CarService)
  router = inject(Router)

  constructor() {
    this.carForm = this.formBuilder.group({
      make: ["", Validators.required],
      model: ["", Validators.required],
      description: ["", Validators.required]
    })
  }
  addCar() {
    this.carService.addCar(this.carForm.value).subscribe()
    this.router.navigate(['cars']);   
  }
  

}
