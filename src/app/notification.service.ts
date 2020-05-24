import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public getUrl = "http://localhost:4000/api/Notifications";
  constructor(private _http:HttpClient) { }

  getNotifications(name) : Observable<any>
  {
    const param1 = new HttpParams().set('username' , name);
    return this._http.get(this.getUrl , {params : param1});
  }
}
