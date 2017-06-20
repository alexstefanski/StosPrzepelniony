import { Permission } from './permission';
export class Admin {
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    permission: Permission;
    edited: boolean = false;
}
