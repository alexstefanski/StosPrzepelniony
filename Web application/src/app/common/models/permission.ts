import { Action } from "./action";

export class Permission {
    id: number;
    name: string;
    actions: Array<Action>;
}
