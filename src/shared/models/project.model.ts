import { ProjectFile } from "./project-file.model";

export class Project{
    id:number;
    specsFileName:string;
    layoutFileName:string;
    paymentTermsFileName:string;
    numberOfPanels:number;
    designReference:string;
    projectName:string;
    clientName:string;
    projectGuid:string;
    technicalProposalFileName:string;
    financialProposalFileName:string;
    subStatus:number;
    technicalProposalProof:string;
    financialProposalProof:string;
    ironPhaseStartDate:Date;
    ironPhaseEndDate:Date;
    electricityPhaseStartDate:Date;
    electricityPhaseEndDate:Date;
    projectStartDate:Date;
    projectEndDate:Date;
    projectFiles:ProjectFile[];
}
