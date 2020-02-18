import { User } from './user';

export interface Notification {
    notificationId: string;
    content: string;
    url: string;
    receiverId: string;
    relatedUser: User;
    createdAt: string;
}
