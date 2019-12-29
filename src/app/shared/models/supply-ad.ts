import { User } from './user';

export interface SupplyAd {
  id: string;
  type: string;
  food: string;
  quantity: number;
  quantityUnit: string;
  pricePerUnit: number;
  images: string[];
  video?: File;
  description: string;
  organic: string;
  expireDate: Date;
  createdAt: Date;
  views: number;
  contactClicks: number;
  owner: string;
  rating?: number;
  buyer?: User;
  status: string;
}
