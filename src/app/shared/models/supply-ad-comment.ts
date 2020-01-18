import { User } from './user';

export interface SupplyAdComment {
  commentId: string;
  supplyAdId: string;
  content: string;
  user: User;
  createdAt: string;
}
