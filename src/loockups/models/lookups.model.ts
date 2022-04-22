export class ChecklistQuestion {
  public id: number;
  public answerId?: number;
  public answerValue?: number;
  public questionEnumId: number;
  public questionText: string;
  public questionProperties: string;
  public groupTitleId: number;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}
export class ChecklistAnswer {
  public answerId?: number;
  public approvalId: number;
  public checklistQuestionId: number;
  public answer: number;

}
export class UserRoles {
  public roleId: number;
  public userId: number;
}
export class Part {
  public id: number;
  public partNumber: string;
  public partName: string;
  public available: number;
  public priceForUnit: number;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}
export class Project {
  public ProjectName: string;
  public ClientName: string;
  public Status: number;
  public SubStatus: number;
  public PendingAt: string;
}
export class Task {
  public Title: string;
  public RoleId: number;
  public Status: number;
  public ModifiedDate: Date;
  public ModifiedById: number;
}

export class BusinessStatus {
  public id: number;
  public name: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}

export class Country {
  public id: number;
  public name: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}
export class Nationality {
  public id: number;
  public name: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}

export class City {
  public id: number;
  public name: string;
  public countryId: number;
  public countryName: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}
export class BusinessClassifications {
  public id: number;
  public sectorId: number;
  public subSectorId: number;
  public groupId: number;
  public filterId: number;
  public businessId: number;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}

export class Sector {
  public id: number;
  public name: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}

export class SubSector {
  public id: number;
  public name: string;
  public status: number;
  public sectorId: number;
  public sectorName: string;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}

export class Groups {
  public id: number;
  public name: string;
  public status: number;
  public subSectorId: number;
  public subSectorName: string;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}

export class Filters {
  public id: number;
  public name: string;
  public status: number;
  public groupId: number;
  public groupName: string;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}

export class JobTitle {
  public id: number;
  public name: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}

export class TitleField {
  public id: number;
  public name: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}

export class TitleLevel {
  public id: number;
  public name: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}
export class Nationalities {
  public id: number;
  public name: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}

export class NoOfEmployee {
  public id: number;
  public name: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}

export class CorporateType {
  public id: number;
  public name: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}
export class Contacts {
  public id: number;
  public name: string;
  public url: string;
  public imageUrl: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}
export class BasicModel {
  public id: number;
  public name: string;
}

export class ContactUs {
  public name: string;
  public email: string;
  public subject: string;
  public message: String;
}
export class AppSettings {
  id:number;
  aboutUsTitle: string;
  aboutUsDescription: string;
  aboutUsVision: string;
  aboutUsMision: string;
  contactUsEmail: string;
  contactUsMobileNo: string;
  contactUsLatitude: string;
  contactUsLongitude: string;
  contactUsTitleAR: string;
  aboutUsTitleAR: string;
  aboutUsDescriptionAR: string;
  aboutUsVisionAR: string;
  aboutUsMisionAR: string;
  address: string;
  contactUsTitle: string;
  createdById:number;
  modifiedById:number;


}
