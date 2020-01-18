import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SupplyAd } from 'src/app/shared/models/supply-ad';
import { SupplyAdService } from '../supply-ad.service';
import { CommentService } from '../comment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SupplyAdComment } from 'src/app/shared/models/supply-ad-comment';

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

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private supplyAdService: SupplyAdService,
    private commentService: CommentService,
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
              this.supplyAdService
                .getAdOwner(supplyAd.owner)
                .subscribe(owner => {
                  this.adOwnerUser = owner;
                })
            );

            this.subscriptions.push(
              this.commentService
                .getComments(supplyAd.id)
                .subscribe(comments => {
                  this.adComments = comments;
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
      this.supplyAdService.changeStatus(adId, 'deleted').subscribe(() => {
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
      this.supplyAdService
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
      this.supplyAdService.changeStatus(adId, 'sold').subscribe(() => {
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
    this.commentService
      .createComment(this.newComment, this.supplyAdId, this.viewer)
      .subscribe(() => {
        this.newComment = '';
        this.attemptedComment = false;
        this.processingComment = false;
        this.toastr.success('Published your comment');
      });
  }
}
