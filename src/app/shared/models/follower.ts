import { User } from './user';

export interface Follower {
    follower: string;
    following: User;
}
