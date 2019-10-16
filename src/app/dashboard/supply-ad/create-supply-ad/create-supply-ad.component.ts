import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SupplyAdService } from '../supply-ad.service';

@Component({
  selector: 'app-create-supply-ad',
  templateUrl: './create-supply-ad.component.html',
  styleUrls: ['./create-supply-ad.component.scss']
})
export class CreateSupplyAdComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  supplyAdForm: FormGroup;
  attempted = false;
  processing = false;

  foods = {
    Fruits: [
      'Apple',
      'Avocado',
      'Banana',
      'Grape',
      'Lemon',
      'Mango',
      'Orange',
      'Papaya',
      'Pineapple',
      'Strawberry',
      'Watermelon'
    ],
    Vegitable: [
      'Beans',
      'Beetroots',
      'Cabbage',
      'Carrot',
      'Cucumber',
      'Garlic',
      'Tomato',
      'Onion'
    ]
  };
  types = Object.keys(this.foods);
  relatedFoods = [
    'Apple',
    'Avocado',
    'Banana',
    'Grape',
    'Lemon',
    'Mango',
    'Orange',
    'Papaya',
    'Pineapple',
    'Strawberry',
    'Watermelon'
  ];
  image1LL: String;
  image2LL: String;
  image3LL: String;
  image4LL: String;

  image1URL: String;
  image2URL: String;
  image3URL: String;
  image4URL: String;

  get formControls() {
    return this.supplyAdForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private supplyAdService: SupplyAdService
  ) {}

  ngOnInit() {
    this.supplyAdForm = this.formBuilder.group({
      type: ['', Validators.required],
      food: ['', Validators.required],
      quantity: [1, Validators.required],
      quantityUnit: ['kg', Validators.required],
      pricePerUnit: [50, Validators.required],
      image1: [null, Validators.required],
      image2: [null],
      image3: [null],
      image4: [null],
      description: ['', Validators.required],
      organic: [false, Validators.required],
      expireDate: [new Date(), Validators.required]
    });
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  retriveFoods() {
    this.relatedFoods = this.foods[this.formControls.type.value];
    this.supplyAdForm.controls.food.reset();
  }

  img1Preview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.supplyAdForm.patchValue({
      image1: file
    });
    this.supplyAdForm.get('image1').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.image1LL = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  img2Preview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.supplyAdForm.patchValue({
      image2: file
    });
    this.supplyAdForm.get('image2').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.image2LL = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  img3Preview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.supplyAdForm.patchValue({
      image3: file
    });
    this.supplyAdForm.get('image3').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.image3LL = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  img4Preview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.supplyAdForm.patchValue({
      image4: file
    });
    this.supplyAdForm.get('image4').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.image4LL = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  createSupplyAd() {
    this.attempted = true;
    if (this.supplyAdForm.invalid) {
      return;
    }
    this.processing = true;

    this.subscriptions.push(
      this.supplyAdService
        .uploadImg(this.formControls.image1.value)
        .subscribe(url => {
          this.image1URL = url;
        })
    );
    this.subscriptions.push(
      this.supplyAdService
        .uploadImg(this.formControls.image2.value)
        .subscribe(url => {
          this.image2URL = url;
        })
    );
    this.subscriptions.push(
      this.supplyAdService
        .uploadImg(this.formControls.image3.value)
        .subscribe(url => {
          this.image3URL = url;
        })
    );
    this.subscriptions.push(
      this.supplyAdService
        .uploadImg(this.formControls.image4.value)
        .subscribe(url => {
          this.image4URL = url;
        })
    );
  }
}
