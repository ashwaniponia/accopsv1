import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User1 } from "./User1";
import { Updatetheuser } from "./updatetheuser";
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private _getUrl = "/api/viewusers";
  private _remApi = "/api/removeuser";
  private _addApi = "/api/adduser";
  private _getUserUrl = "/api/updateuser/get";
  private _post = "/api/updateuser/post";

  constructor(private _http:HttpClient
  ) { }


  postUser(ans : Updatetheuser) : Observable<any>
  {
    return this._http.post(this._post , {'form' : ans});
  }

  getUsers() : Observable<User1[]>
  {
    return this._http.get<User1[]>(this._getUrl);
  }

  getUserinfo(username : string) : Observable<Updatetheuser>
  {
    const param1 = new HttpParams().set('username' , username);
    const arr =  this._http.get<Updatetheuser>(this._getUserUrl , {params : param1});
    console.log(arr);
    return arr;
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
