import { User } from './user';
import { DemandAd } from './demand-ad';

export interface buyerAgreement {
  agreementId: string;
  farmer: User;
  ad: DemandAd;
  status: string;
  agreementDate: string;
  createdAt: string;
}