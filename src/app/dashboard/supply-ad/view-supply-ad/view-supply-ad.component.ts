import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SupplyAd } from 'src/app/shared/models/supply-ad';
import { SupplyAdService } from '../supply-ad.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-supply-ad',
  templateUrl: './view-supply-ad.component.html',
  styleUrls: ['./view-supply-ad.component.scss']
})
export class ViewSupplyAdComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  viewer: User = JSON.parse(localStorage.getItem('user'));
  currentTime = new Date().toISOString().split('T')[0];

  adOwnerUser: User;
  supplyAdId: string;
  supplyAd: SupplyAd;
  supplyAdForm: FormGroup;

  get formControls() {
    return this.supplyAdForm.controls;
  }

  attempted = false;
  processing = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private supplyAdService: SupplyAdService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.supplyAdForm = this.formBuilder.group({
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

    this.subscriptions.push(
      this.route.params.subscribe(routeParams => {
        this.supplyAdId = routeParams.supplyAdId;
        this.subscriptions.push(
        this.supplyAdService.getAd(this.supplyAdId).subscribe(supplyAd => {
          this.supplyAd = supplyAd;

          this.supplyAdForm.patchValue({
            quantity: supplyAd.quantity,
            quantityUnit: supplyAd.quantityUnit,
            pricePerUnit: supplyAd.pricePerUnit,
            description: supplyAd.description,
            expireDate: supplyAd.expireDate
          });

          this.subscriptions.push(
            this.supplyAdService.getAdOwner(supplyAd.owner).subscribe( owner => {
              this.adOwnerUser = owner;
            })
          );
        }));
      })
    );
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  deleteAd(adId: string) {
    this.processing = true;
    this.subscriptions.push(
      this.supplyAdService.changeStatus(adId, 'deleted').subscribe(() => {
        this.processing = false;
        this.toastr.success('Advertisment is deleted');
        this.router.navigate(['farmer-dashboard']);
      })
    );
  }

  markAsSold(adId: string) {
    this.processing = true;
    this.subscriptions.push(
      this.supplyAdService.changeStatus(adId, 'sold').subscribe(() => {
        this.processing = false;
        this.toastr.success('Advertisment is marked as "sold"');
      })
    );
  }

  updateSupplyAd() {
    this.attempted = true;
    if (this.supplyAdForm.invalid) {
      return;
    }
    this.processing = true;
    this.subscriptions.push(this.supplyAdService.updateAd(this.supplyAdId, this.supplyAdForm.value).subscribe(() => {
      this.processing = false;
      this.attempted = false;
    }));
  }
}