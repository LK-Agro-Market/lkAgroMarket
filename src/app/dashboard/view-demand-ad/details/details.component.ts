import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { DemandAd } from 'src/app/shared/models/demand-ad';
import { DemandAdService } from 'src/app/dashboard/demand-ad/demand-ad.service';
import { buyerAgreement } from 'src/app/shared/models/buyer-agreement';





@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  constructor(private route:ActivatedRoute,
    private viewAdservice:DemandAdService) {}

agreementDate = new Date().toISOString().split('T')[0];
viewer: User = JSON.parse(localStorage.getItem('user'));
demandAdid:string;
demandAd:DemandAd;
adOwner:User;
currentTime = new Date().toISOString().split('T')[0];
isAgree:boolean=false;



  ngOnInit() {
    this.route.params.subscribe(routeParams=>{
      this.demandAdid=routeParams.demandAdid;
      this.viewAdservice.getdemandad(this.demandAdid).subscribe(demandAd => {
        this.demandAd = demandAd;
       this.viewAdservice.getUser(demandAd.owner).subscribe(user=>{
        this.adOwner=user; 
       // console.log(demandAd)   
           });
        });
    })
  }
agreetoBuy(){
  if(this.agreementDate===''){
    return;
  }
  this.isAgree=!this.isAgree;
  this.viewAdservice.createagreement(this.demandAd,this.viewer,this.agreementDate)
}

}
