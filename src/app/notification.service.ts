import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public getUrl = "http://localhost:4000/api/Notifications";
  public getcountUrl = "http://localhost:4000/api/getNotificationcount";
  public setstatusUrl = "http://localhost:4000/api/updateNotifications";
  constructor(private _http:HttpClient) { }

  getNotifications(name) : Observable<any>
  {
    const param1 = new HttpParams().set('username' , name);
    return this._http.get(this.getUrl , {params : param1});
  }


  getFreshNotifications(username) : Observable<any>
  {
    const param1 = new HttpParams().set('username' , username);
    return this._http.get(this.getcountUrl  , {params : param1});
  }

  setStatus(username) : Observable<any>
  {

    return this._http.post(this.setstatusUrl , {'username' : username});
  }
}
