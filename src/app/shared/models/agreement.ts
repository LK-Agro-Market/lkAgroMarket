import { User } from './user';

export interface Agreement {
  agreementId: string;
  buyer: User;
  adId: string;
  status: string;
  agreementDate: string;
  createdAt: string;
}
