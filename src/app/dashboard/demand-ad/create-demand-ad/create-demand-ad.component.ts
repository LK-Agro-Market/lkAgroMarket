import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DemandAd } from 'src/app/shared/models/demand-ad';
import { DemandAdService } from '../demand-ad.service';
import { Subscription, forkJoin } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-demand-ad',
  templateUrl: './create-demand-ad.component.html',
  styleUrls: ['./create-demand-ad.component.scss']
})
export class CreateDemandAdComponent implements OnInit, OnDestroy {
  subcriptions: Subscription[];
  buyerAdform: FormGroup;
  user: User = JSON.parse(localStorage.getItem('user'));
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
  Foodtypes = Object.keys(this.foods);

  constructor(
    private formbuilder: FormBuilder,
    private demandadservice: DemandAdService,
    private toastr: ToastrService
  ) {}
  get formControls() {
    return this.buyerAdform.controls;
  }

  ngOnInit() {
    this.buyerAdform = this.formbuilder.group({
      foodtype: ['', Validators.required],
      food: ['', Validators.required],
      expectedamount: ['1Kg', Validators.required],
      priceperunit: ['50', Validators.required],
      description: ['', Validators.required],
      organic: ['', Validators.required],
      deadline: [new Date().toISOString().split('T')[0], Validators.required]
    });
  }

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
  ngOnDestroy() {}
  retriveFoods() {
    this.relatedFoods = this.foods[this.formControls.foodtype.value];
    this.buyerAdform.controls.food.reset();
  }

  createBuyerAd() {
    const adID = this.demandadservice.getdemandAdid();
    const demandAD: DemandAd = {
      id: adID,
      foodtype: this.formControls.foodtype.value,
      food: this.formControls.food.value,
      expectedamount: this.formControls.expectedamount.value,
      priceperunit: this.formControls.priceperunit.value,
      description: this.formControls.description.value,
      organic: this.formControls.organic.value,
      deadline: this.formControls.deadline.value,
      timestamps: new Date(),
      views: 0,
      contactClicks: 0,
      owner: this.user.uid
    };

    this.attempted = true;
    if (this.buyerAdform.invalid) {
      return;
    }
    this.processing = false;

    this.demandadservice.createBuyerad(demandAD);
    this.toastr.success('Submitted successfully');
    this.buyerAdform.reset();
    this.attempted = false;
  }
}