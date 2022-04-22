import { ChecklistAnswer, ChecklistQuestion } from "../../loockups/models/lookups.model";

export class ChecklistQuestionGroup{
    groupTitleId:number;
    groupTitleName:string;
    checkListQuestions:ChecklistQuestion[];
}
export class SubmitQcModel{
    approvalId:number;
    comments:string;
    checkListAnswes:ChecklistAnswer[];
}
