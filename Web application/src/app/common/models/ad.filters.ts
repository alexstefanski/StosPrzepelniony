export class AdFilters {
    userId?: number;
    categoryId?: Array<number>;
    subject?: string;
    content?: string;
    costTotal?: { min?: number, max?: number};
    costHour?: { min?: number, max?: number};
}