export class Ad {
    id: number;
    userId: number;
    userFirstName: string;
    categoryId: number;
    categoryName?: string;
    subject: string;
    content: string;
    costTotal?: number;
    costHour?: number;
    date: Date;
    status: string;
}