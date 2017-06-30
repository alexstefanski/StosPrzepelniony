export class MessageList {
    senderId: number;
    receiverId: number;
    date: Date; 
    ad: { adId: number, subject: string };
    user: { userId: number, firstName: string, lastName: string};
    lastMessage: { user: { userId: number}, content: string };
}
