import { EntitiesEnum } from "../enums/entities.enum";

export class Lookup {
    id: number;
    key: string;
    value: number;
    parentId: EntitiesEnum;
}