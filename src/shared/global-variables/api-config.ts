import { HttpHeaders } from '@angular/common/http';

export const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
    })
};


export const httpFormDataOptions = {
    headers: new HttpHeaders({
    })
};
































export enum Controllers {
  Auth = 'Auth/',
  User = 'User/',
  Employee = 'Employee/',
  Business = 'Business/',
  CheckListQuestion = 'CheckListQuestion/',
  Group = 'Group/',
  Part = 'Part/',
  BusinessStatus = 'BusinessStatus/',
  Country = 'Country/',
  City = 'City/',
  CorporateType = 'CorporateType/',
  Filters = 'Filters/',
  Groups = 'Groups/',
  JobTitle = 'JobTitle/',
  Nationality = 'Nationality/',
  NoOfEmployee = 'NoOfEmployee/',
  Sector = 'Sector/',
  SubSector = 'SubSector/',
  TitleField = 'TitleField/',
  TitleLevel = 'TitleLevel/',
  Person = 'Person/',
  ContactUS = 'ContactUs/',
  Contacts = 'Contacts/',
  AppSettings = 'AppSettings/',
  Approval = "Approval/",
  Lookup = "Lookup/",
  Project = "Project/",
  Task = "Task/",
  File = "File/",
  Action = "Action/"
}
































































































































export enum Actions {
  GetList = 'GetList',
  GetRequestsList = 'GetRequestsList',
  GetFilteredItems = 'GetFilteredItems',
  GetById = 'GetById',
  Get = 'Get',
  GetByParentId = 'GetByParentId',
  GetAllItems = 'GetAllItems',
  GetAllItemsWithImages = 'GetAllItemsWithImages',
  GetItemsBySetId = 'GetItemsBySetId',
  PostItem = 'Create',
  AddUserGroup = 'AddUserGroup',
  PostRange = 'PostRange',
  EditItem = 'Update',
  EditItemStatus = 'UpdateStatus',
  DeleteSetItem = 'DeleteSetItem',
  EditRange = 'EditRange',
  RemoveItemById = 'RemoveItemById',
  RemoveItem = 'Delete',
  RemoveUserRole = 'RemoveUserRole',
  DeletePersonJob = 'DeletePersonJob',
  DeleteBusinessPartner = 'DeleteBusinessPartner',
  DeleteBoardOfDirector = 'DeleteBoardOfDirector',
  RemoveItemImage = 'DeleteItemImage',
  RemoveRange = 'RemoveRange',
  Login = 'Login',
  UpdateStatus = 'UpdateStatus',
  UpdateUserInfo = 'UpdateUserInfo',
  SendSingleUserNotification = 'SendSingleUserNotification',
  PodcastAllUsersNotification = 'PodcastAllUsersNotification',
  PodcastMultiUsersNotification = 'PodcastMultiUsersNotification',
  AddItemImages = 'AddItemImages',
  GetItemByIdWithRelated = 'GetItemByIdWithRelated',
  GetSubCategoryUsers = 'GetSubCategoryUsers',
  GetAllMainBranches = 'GetAllMainBranches',
  // GetRoles = 'GetRoles',
  GetRoles = 'GetUserRoles',
  GetBaseRoles = 'GetRoles',
  GetUsersRoles = 'GetUsersRolesList',
  GetSearchUsersRolesList = 'GetSearchUsersRolesList',
  GetSearchList = 'GetSearchList',
  GetUsers = 'GetUsers',
  GetLookupsByParent = 'GetLookupsByParent',
  UpdateEmployeeInfo = "UpdateEmployeeInfo",
  AddBoardOfDirector = "AddBoardOfDirector",
  EditBoardOfDirector = "EditBoardOfDirector",
  AddBusinessPartner = "AddBusinessPartner",
  EditBusinessPartner = "EditBusinessPartner",
  AddBusinessClassifications = "AddBusinessClassification",
  EditBusinessClassifications = "EditBusinessClassification",
  AddPersonJob = "AddPersonJob",
  EditPersonJob = "EditPersonJob",
  ChangePassword = "ChangePassword",
  UpdateProject = "UpdateProject",
  GetActionsByProjectId = "GetActionsByProjectId",
  AddFile = "AddFile",
  SubmitQcForm = "SubmitQcForm",
  GetAllRecordsWithAnswers = "GetAllRecordsWithAnswers",
  Register = "Register"
}
