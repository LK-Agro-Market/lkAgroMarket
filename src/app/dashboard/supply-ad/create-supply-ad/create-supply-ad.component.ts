import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, forkJoin } from 'rxjs';

import { SupplyAdService } from '../supply-ad.service';
import { SupplyAd } from 'src/app/shared/models/supply-ad';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-create-supply-ad',
  templateUrl: './create-supply-ad.component.html',
  styleUrls: ['./create-supply-ad.component.scss']
})
export class CreateSupplyAdComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  user: User = JSON.parse(localStorage.getItem('user'));
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
  image1LL: String = '';
  image2LL: String = '';
  image3LL: String = '';
  image4LL: String = '';

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
      image1: ['', Validators.required],
      image2: [''],
      image3: [''],
      image4: [''],
      description: ['', Validators.required],
      organic: ['', Validators.required],
      expireDate: [new Date().toISOString().split('T')[0], Validators.required]
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

  imgPreview(event, imageNum) {
    const file = (event.target as HTMLInputElement).files[0];
    const change: Object = {};
    change[imageNum] = file;
    this.supplyAdForm.patchValue(change);
    this.supplyAdForm.get(imageNum).updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      if (imageNum === 'image1') {
        this.image1LL = reader.result as string;
      } else if (imageNum === 'image2') {
        this.image2LL = reader.result as string;
      } else if (imageNum === 'image3') {
        this.image3LL = reader.result as string;
      } else {
        this.image4LL = reader.result as string;
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  createSupplyAd() {
    this.attempted = true;
    if (this.supplyAdForm.invalid) {
      return;
    }
    this.processing = true;

    const adId = this.supplyAdService.getAdId();
    let uploadTasks = [
      this.supplyAdService.uploadImg(
        this.formControls.image1.value,
        'image1',
        adId
      )
    ];
    if (this.image2LL !== '') {
      uploadTasks.push(
        this.supplyAdService.uploadImg(
          this.formControls.image2.value,
          'image2',
          adId
        )
      );
    }
    if (this.image3LL !== '') {
      uploadTasks.push(
        this.supplyAdService.uploadImg(
          this.formControls.image3.value,
          'image3',
          adId
        )
      );
    }
    if (this.image4LL !== '') {
      uploadTasks.push(
        this.supplyAdService.uploadImg(
          this.formControls.image4.value,
          'image4',
          adId
        )
      );
    }
    this.subscriptions.push(
      forkJoin(uploadTasks).subscribe(urls => {
        const supplyAd: SupplyAd = {
          id: adId,
          type: this.formControls.type.value,
          food: this.formControls.food.value,
          quantity: this.formControls.quantity.value,
          quantityUnit: this.formControls.quantityUnit.value,
          pricePerUnit: this.formControls.pricePerUnit.value,
          images: urls,
          description: this.formControls.description.value,
          organic: this.formControls.organic.value,
          expireDate: this.formControls.expireDate.value,
          createdAt: new Date(),
          views: 0,
          contactClicks: 0,
          owner: this.user.uid
        };
        this.subscriptions.push(
          this.supplyAdService.createAd(supplyAd).subscribe(() => {
            this.attempted = false;
            this.processing = false;
          })
        );
      })
    );
  }
}
