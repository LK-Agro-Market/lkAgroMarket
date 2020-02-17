import { User } from './user';
import { SupplyAd } from './supply-ad';

export interface Agreement {
  agreementId: string;
  buyer: User;
  ad: SupplyAd;
  status: string;
  agreementDate: string;
  createdAt: string;
}
