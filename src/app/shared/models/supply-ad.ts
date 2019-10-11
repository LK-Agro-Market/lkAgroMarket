export interface SupplyAd {
  id: string;
  type: string;
  food: string;
  quantity: number;
  quantityUnit: string;
  pricePerUnit: number;
  images: File[];
  video?: File;
  description: string;
  organic: boolean;
  expireDate: Date;
  createdAt: Date;
  views: number;
  contactClicks: number;
}
