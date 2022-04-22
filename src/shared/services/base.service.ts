import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, Controllers, httpFormDataOptions, httpOptions } from '../global-variables/api-config';
import { environment } from '../../environments/environment';
import { BaseModel } from '../models/models';
import { UserModel } from '../../users-management/models/user.model';
import { EntitiesEnum } from '../enums/entities.enum';
import { Lookup } from '../models/lookup.model';
import { ActionModel } from '../models/action.model';
const apiPreLink = environment.apiPreLink;
@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) {

  }

  public getAllItems(controllerName: string): Observable<any> {
    return this.http.get(apiPreLink + controllerName + Actions.GetAllItems);
  }
  public getSpecificAction(controllerName: string,actionName:string): Observable<any> {
    return this.http.get(apiPreLink + controllerName + actionName);
  }
  public getAllMainBranches(): Observable<any> {
    return this.http.get(apiPreLink + Controllers.Business + Actions.GetAllMainBranches);
  }
  public getAllItemsWithImages(controllerName: string, subCategoryId: number): Observable<any> {
    return this.http.get(apiPreLink + controllerName + Actions.GetAllItemsWithImages + '/' + subCategoryId);
  }
  public getItemsBySetId(controllerName: string, setId: number): Observable<any> {
    return this.http.get(apiPreLink + controllerName + Actions.GetItemsBySetId + '/' + setId);
  }
  public getSubCategoryUsers(controllerName: string, subCategoryId: number): Observable<any> {
    return this.http.get(apiPreLink + controllerName + Actions.GetSubCategoryUsers + '/' + subCategoryId);
  }

  public getList(controllerName: string, baseSearch): Observable<any> {
    return this.http.post<any>(apiPreLink + controllerName + Actions.GetList, JSON.stringify(baseSearch), httpOptions);
  }
  public getRequestsList(controllerName: string, baseSearch): Observable<any> {
    return this.http.post<any>(apiPreLink + controllerName + Actions.GetRequestsList, JSON.stringify(baseSearch), httpOptions);
  }
  // public getRoles(): Observable<BaseModel[]> {
  //   return this.http.get<BaseModel[]>(apiPreLink + Controllers.Business + Actions.GetRoles, httpOptions);
  // }
  public getUsersRoles(): Observable<any[]> {
    return this.http.get<BaseModel[]>(apiPreLink + Controllers.Group + Actions.GetList, httpOptions);
  }
  public GetSearchUsersRolesList(controllerName: string, baseSearch): Observable<any> {

    return this.http.post<any>(apiPreLink + controllerName + Actions.GetList, JSON.stringify(baseSearch), httpOptions);
  }
  public GetSearchProjectsList(controllerName: string, baseSearch): Observable<any> {

    return this.http.post<any>(apiPreLink + controllerName + Actions.GetSearchList, JSON.stringify(baseSearch), httpOptions);
  }
  public GetSearchTasksList(controllerName: string, baseSearch): Observable<any> {

    return this.http.post<any>(apiPreLink + controllerName + Actions.GetSearchList, JSON.stringify(baseSearch), httpOptions);
  }
  public getRoles(): Observable<any[]> {
    return this.http.get<BaseModel[]>(apiPreLink + Controllers.Group + Actions.GetRoles, httpOptions);
  }
  public getUsers(): Observable<any[]> {
    return this.http.get<BaseModel[]>(apiPreLink + Controllers.Group + Actions.GetUsers, httpOptions);
  }
  public getUserRoles(): Observable<BaseModel[]> {
    return this.http.get<BaseModel[]>(apiPreLink + Controllers.User + Actions.GetBaseRoles, httpOptions);
  }
  public getLookupsPyParent(parentId: EntitiesEnum): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(apiPreLink + Controllers.Lookup + Actions.GetLookupsByParent + '?parentId=' + parentId, httpOptions);
  }

  public getFilteredItems(controllerName: string, baseSearch): Observable<any> {

    return this.http.post<any>(apiPreLink + controllerName + Actions.GetFilteredItems, JSON.stringify(baseSearch), httpOptions);
  }

  public getById(controllerName: string, id: number): Observable<any> {
    return this.http.get(apiPreLink + controllerName + Actions.GetById + '/' + id);
  }
  public getNews(controllerName: string): Observable<any> {
    return this.http.get(apiPreLink + controllerName + Actions.Get);
  }
  public getActionsByProjectId(projectId:number): Observable<ActionModel[]> {
    return this.http.get<ActionModel[]>(apiPreLink + Controllers.Action + Actions.GetActionsByProjectId+'?projectId='+projectId);
  }
  public getByIdWithRelated(controllerName: string, id: number): Observable<any> {
    return this.http.get(apiPreLink + controllerName + Actions.GetItemByIdWithRelated + '/' + id);
  }
  public getByParentId(controllerName: string, parentId: number): Observable<any> {
    return this.http.get(apiPreLink + controllerName + Actions.GetByParentId + '/' + parentId);
  }

  public postItem(controllerName: string, actionName: string, postObject: any): Observable<any> {
    return this.http.post(apiPreLink + controllerName + actionName, JSON.stringify(postObject), httpOptions);
  }
  public patchItem(controllerName: string, actionName: string, patchObject: any): Observable<any> {
    return this.http.patch(apiPreLink + controllerName + actionName, patchObject, httpFormDataOptions);
  }
  public postContactWithFile(contact, file): Observable<any> {
    const formData = new FormData();
    formData.append('name', contact.name);
    formData.append('url', contact.url);
    formData.append('isClient', contact.isClient);
    formData.append('status', contact.status);
    formData.append('file', file);
    return this.http.post(apiPreLink + Controllers.Contacts + Actions.PostItem, formData);
  }
  public updateContactWithFile(contact, file): Observable<any> {
    const formData = new FormData();
    formData.append('id', contact.id);
    formData.append('name', contact.name);
    formData.append('url', contact.url);
    formData.append('isClient', contact.isClient);
    formData.append('status', contact.status);
    formData.append('file', file);
    return this.http.post(apiPreLink + Controllers.Contacts + Actions.EditItem, formData);
  }
  public postItemImages(controllerName: string, actionName: string, itemId: number, itemImages: FormData): Observable<any> {

    return this.http.post(apiPreLink + controllerName + actionName + '/' + itemId, itemImages, { responseType: 'text' });
  }

  public PostRange(controllerName: string, actionName: string, postObject: any): Observable<any> {
    return this.http.post(apiPreLink + controllerName + actionName, JSON.stringify(postObject), httpOptions);
  }
  public getDashboardData(): Observable<any> {
    return this.http.get(apiPreLink + 'Auth/GetDashboardData');
  }
  public editItem(controllerName: string, editObject: any): Observable<any> {
    return this.http.post(apiPreLink + controllerName + Actions.EditItem, JSON.stringify(editObject), httpOptions);
  }
  public updateStatus(controllerName: string, id: number): Observable<any> {
    return this.http.post(apiPreLink + controllerName + Actions.UpdateStatus, id, httpOptions);
  }
  public updateProject(project: any): Observable<any> {
    return this.http.patch(apiPreLink + Controllers.Project + Actions.UpdateProject, project, httpFormDataOptions);
  }
  public updateUserInfo(user: UserModel): Observable<any> {
    return this.http.post(apiPreLink + Controllers.User + Actions.UpdateUserInfo, user, httpOptions);
  }
  public editRange(controllerName: string, editObject: any): Observable<any> {
    return this.http.put(apiPreLink + controllerName + Actions.EditRange, JSON.stringify(editObject), httpOptions);
  }

  public removeItemById(controllerName: string, id: number): Observable<any> {
    return this.http.get(apiPreLink + controllerName + Actions.RemoveItemById + '/' + id);
  }

  public removeItem(controllerName: string, id: number): Observable<any> {
    return this.http.get(apiPreLink + controllerName + Actions.RemoveItem + '/' + id);
  }
  public RemoveUserRole(controllerName: string, userRoles): Observable<any> {
    return this.http.post(apiPreLink + controllerName + Actions.RemoveUserRole, JSON.stringify(userRoles), httpOptions);
  }
  public deletePersonJob(id: number): Observable<any> {
    return this.http.get(apiPreLink + Controllers.Business + Actions.DeletePersonJob + '/' + id);
  }
  public deleteBoardOfDirector(id: number): Observable<any> {
    return this.http.get(apiPreLink + Controllers.Business + Actions.DeleteBoardOfDirector + '/' + id);
  }
  public deleteBusinessPartner(id: number): Observable<any> {
    return this.http.get(apiPreLink + Controllers.Business + Actions.DeleteBusinessPartner + '/' + id);
  }
  public removeItemImage(controllerName: string, id: number): Observable<any> {
    return this.http.get(apiPreLink + controllerName + Actions.RemoveItemImage + '/' + id);
  }

  public removeRange(controllerName: string, postobject: any): Observable<any> {
    return this.http.post(apiPreLink + controllerName + Actions.RemoveRange, JSON.stringify(postobject), httpOptions);
  }

  public toggleAllItems(from, to): Observable<any> {
    return this.http.get(apiPreLink + 'Item/ToggleAllProducts/' + from + '/' + to);
  }
  public registEmployee(regist) {
    return this.http.post(apiPreLink + Controllers.Employee + 'Register', JSON.stringify(regist), httpOptions)
  }
  public importFromExcel(excelFile) {
    return this.http.post(apiPreLink + Controllers.Business + 'ImportExcelData', excelFile, httpFormDataOptions)
  }

  public getEmployeeRoles(employeeId) {
    return this.http.get(apiPreLink + Controllers.Employee + 'GetEmployeeRoles/' + employeeId)
  }

  public AddEmployeeRoles(userRole) {
    return this.http.post(apiPreLink + Controllers.Employee + 'AddEmployeeRole/', JSON.stringify(userRole), httpOptions);
  }
  public removeEmployeeRoles(userRole) {
    return this.http.post(apiPreLink + Controllers.Employee + 'RemoveEmployeeRole/', JSON.stringify(userRole), httpOptions);
  }
  public downloadFile(fileName: string) {
    return this.http.get(apiPreLink + Controllers.File + 'Download?file='+fileName, {
      reportProgress: true,
      responseType: 'blob'
    });
  }
   public downloadQrCode(qrCode: string) {
    return this.http.post(apiPreLink + Controllers.Project + 'CreateQRCode?qRCode='+qrCode,{}, {
      reportProgress: true,
      responseType: 'blob'
    });
  }

  public getAppSettings() {
    return this.http.get(apiPreLink + 'AppSettings/GetAppSettings')
  }
}
