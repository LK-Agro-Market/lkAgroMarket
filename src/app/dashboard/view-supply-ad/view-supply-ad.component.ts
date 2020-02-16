import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SupplyAd } from 'src/app/shared/models/supply-ad';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SupplyAdComment } from 'src/app/shared/models/supply-ad-comment';
import { ViewSupplyAdService } from './view-supply-ad.service';
import { Agreement } from 'src/app/shared/models/agreement';

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
  attempted = false;
  processing = false;

  get formControls() {
    return this.supplyAdForm.controls;
  }

  adComments: SupplyAdComment[];
  newComment: string = '';
  attemptedComment = false;
  processingComment = false;

  pendingAgreements: Agreement[];
  isViewerAgreed: boolean = false;
  viewersAgreement: Agreement;
  approvedAgreement: Agreement;
  agreementDate = new Date().toISOString().split('T')[0];
  attemptedAgreement = false;
  processingAgreement = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private viewSupplyAdService: ViewSupplyAdService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.supplyAdForm = this.formBuilder.group({
      quantity: [1, Validators.required],
      quantityUnit: ['kg', Validators.required],
      pricePerUnit: [50, Validators.required],
      description: ['', Validators.required],
      expireDate: [new Date().toISOString().split('T')[0], Validators.required]
    });

    this.subscriptions.push(
      this.route.params.subscribe(routeParams => {
        this.supplyAdId = routeParams.supplyAdId;
        this.viewSupplyAdService.increaseViewCount(this.supplyAdId);

        this.subscriptions.push(
          this.viewSupplyAdService
            .getAd(this.supplyAdId)
            .subscribe(supplyAd => {
              this.supplyAd = supplyAd;
              this.supplyAdForm.patchValue({
                quantity: supplyAd.quantity,
                quantityUnit: supplyAd.quantityUnit,
                pricePerUnit: supplyAd.pricePerUnit,
                description: supplyAd.description,
                expireDate: supplyAd.expireDate
              });

              this.subscriptions.push(
                this.viewSupplyAdService
                  .getAdOwner(supplyAd.owner)
                  .subscribe(owner => {
                    this.adOwnerUser = owner;
                  })
              );

              this.subscriptions.push(
                this.viewSupplyAdService
                  .getComments(supplyAd.id)
                  .subscribe(comments => {
                    this.adComments = comments;
                  })
              );

              this.subscriptions.push(
                this.viewSupplyAdService
                  .getPendingAgreements(supplyAd.id)
                  .subscribe(agreements => {
                    this.pendingAgreements = agreements;
                    this.isViewerAgreed =
                      agreements.filter(
                        agreement => agreement.buyer.uid == this.viewer.uid
                      ).length > 0;
                    if (this.isViewerAgreed == true) {
                      this.viewersAgreement = agreements.filter(
                        agreement => agreement.buyer.uid == this.viewer.uid
                      )[0];
                    }
                  })
              );

              this.subscriptions.push(
                this.viewSupplyAdService
                  .getApprovedAgreement(supplyAd.id)
                  .subscribe(agreement => {
                    this.approvedAgreement = agreement;
                  })
              );
            })
        );
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
      this.viewSupplyAdService.changeStatus(adId, 'deleted').subscribe(() => {
        this.processing = false;
        this.toastr.success('Advertisment is deleted');
        this.router.navigate(['farmer-dashboard']);
      })
    );
  }

  updateSupplyAd() {
    this.attempted = true;
    if (this.supplyAdForm.invalid) {
      return;
    }
    this.processing = true;
    this.subscriptions.push(
      this.viewSupplyAdService
        .updateAd(this.supplyAdId, this.supplyAdForm.value)
        .subscribe(() => {
          this.processing = false;
          this.attempted = false;
          this.toastr.success('Updated Ad Successfully');
        })
    );
  }

  markAsSold(adId: string) {
    this.processing = true;
    this.subscriptions.push(
      this.viewSupplyAdService.changeStatus(adId, 'sold').subscribe(() => {
        this.processing = false;
        this.toastr.success('Advertisment is marked as "sold"');
      })
    );
  }

  publishComment() {
    this.attemptedComment = true;
    if (this.newComment === '') {
      return;
    }
    this.processingComment = true;
    this.subscriptions.push(
      this.viewSupplyAdService
        .createComment(this.newComment, this.supplyAdId, this.viewer)
        .subscribe(() => {
          this.newComment = '';
          this.attemptedComment = false;
          this.processingComment = false;
          this.toastr.success('Published your comment');
        })
    );
  }

  agreeToBuy() {
    this.attempted = true;
    if (this.agreementDate === '') {
      return;
    }
    this.processingAgreement = true;
    this.subscriptions.push(
      this.viewSupplyAdService
        .createPendingAgreement(
          this.supplyAd,
          this.viewer,
          this.agreementDate
        )
        .subscribe(() => {
          this.toastr.success('Your agreement request sent to the farmer');
          this.processingAgreement = false;
        })
    );
  }

  cancelPendingAgreement() {
    this.processingAgreement = true;
    this.subscriptions.push(
      this.viewSupplyAdService
        .deletePendingAgreement(this.viewersAgreement.agreementId)
        .subscribe(() => {
          this.processingAgreement = false;
        })
    );
  }

  agreeToSell(agreementId: string) {
    this.processingAgreement = true;
    this.subscriptions.push(
      this.viewSupplyAdService.approveAgreement(agreementId, this.supplyAd.id).subscribe(() => {
        this.processingAgreement = false;
        this.toastr.success('You signed the agreement');
      })
    );
  }

  onRateFarmer($event) {
    this.subscriptions.push(
      this.viewSupplyAdService
        .rateUser(this.supplyAd.id, $event)
        .subscribe(() => {
          this.toastr.success('You rated the farmer');
        })
    );
  }
}
