import { tasks_v1 } from "googleapis";
import { Project } from "./project.model";
import { Task } from "./task.model";

export class Approval {
    id: number;
    projectId: number;
    taskId: number;
    status: number;
    actionDate: Date;
    receivedDate: Date;
    task: Task;
    project: Project;
}
