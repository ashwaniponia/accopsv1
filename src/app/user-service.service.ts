import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User1 } from "./User1";
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private _getUrl = "/api/viewusers";
  private _remApi = "/api/removeuser";
  private _addApi = "/api/adduser";

  constructor(private _http:HttpClient
  ) { }


  getUsers() : Observable<User1[]>
  {
    return this._http.get<User1[]>(this._getUrl);
  }

  removeUser(id): Observable<any> {
   return this._http.get(`${this._remApi}/delete/${id}`);
  } 

  addUser(address,city,company,country,firstname,lastname,orgcode,postalcode,username): Observable<any>{
    
    let img = "ABC",totaldeals =0,acceptedeals=0,rejecteddeals=0,dealspending=0,maxval=1000,Hide=true,Hide1=false
    const obj ={
      username,img,company,address,city,country,firstname,lastname,orgcode,postalcode,totaldeals,acceptedeals,rejecteddeals,dealspending,maxval,Hide,Hide1
    };
    return this._http.post(`${this._addApi}`,obj)
  }
}
