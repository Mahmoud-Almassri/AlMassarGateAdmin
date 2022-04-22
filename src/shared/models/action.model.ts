import { TaskType } from "../enums/task-type.enum";

export class ActionModel{
    approvalId:number;
    comments:string;
    actionType:TaskType;
    createdDate:Date;
    createdById:number;
    createdBy:string;
    taskName:string;
}