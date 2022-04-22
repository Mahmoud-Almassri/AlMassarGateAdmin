import { TaskType } from "../enums/task-type.enum";
import { Role } from "./role.model";

export class Task {
    taskEnumId: number;
    title: string;
    roleId: number;
    readOnlyControlsNumbers: number[];
    requiredControlsNumbers: number[];
    nextTaskIds: number[];
    prevTaskIds: number[];
    orderId: number;
    taskType: TaskType;
    checkWithTasksNumbers: number[];
    role: Role;
}
