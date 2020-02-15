import { User } from './user';

export interface SupplyAd {
  id: string;
  type: string;
  food: string;
  quantity: number;
  quantityUnit: string;
  pricePerUnit: number;
  images: string[];
  description: string;
  organic: string;
  expireDate: string;
  createdAt: string;
  views: number;
  owner: string;
  rating?: number;
  buyer?: User;
  status: string;
}
