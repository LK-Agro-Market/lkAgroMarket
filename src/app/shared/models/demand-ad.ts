export  interface DemandAd {
  id: string;
  foodtype: string;
  food: string;
  expectedamount: number;
  priceperunit: number;
  description: string;
  organic: string;
  deadline: Date;
  timestamps: Date;
  views: number;
  contactClicks: number;
  owner: string;
}
