export interface DemandAd {
  id: string;
  foodtype: string;
  food: string;
  expectedamount: number;
  unit: string;
  priceperunit: number;
  description: string;
  organic: string;
  deadline: Date;
  timestamps: Date;
  views: number;
  contactClicks: number;
  owner: string;
}
