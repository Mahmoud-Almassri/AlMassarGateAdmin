export class UserModel {
    public id: number;
    public fullName: string;
    public userName: string;
    public email: string;
    public phoneNumber: string;
    public address: string;
    public isActive: boolean;
    public remainingSubscription?: number;
    public remainingSubscriptionModifiedDate?: Date;
}