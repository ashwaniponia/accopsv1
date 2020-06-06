import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User1 } from "./User1";
import { Updatetheuser } from "./updatetheuser";
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private _getUrl = "http://localhost:4000/api/viewusers";
  private _remApi = "http://localhost:4000/api/removeuser";
  private _addApi = "http://localhost:4000/api/adduser";
  private _getUserUrl = "http://localhost:4000/api/updateuser/get";
  private _post = "http://localhost:4000/api/updateuser/post";
  private getImg = "http://localhost:4000/uploads";
  private _get_a_user = "http://localhost:4000/api/getuser";
  private _getsocket = "http://localhost:4000/api/getSocket";
  constructor(private _http:HttpClient
  ) { }

  getSocket(username) : Observable<any>
  {
    const param1 = new HttpParams().set('username' , username);
    return this._http.get<Updatetheuser>(this._getsocket , {params : param1});
  }

  postUser(ans : FormData) : Observable<any>
  {
    return this._http.post(this._post ,ans);
  }

  getUser(username) : Observable<any>
  {
    const param1 = new HttpParams().set('username' , username);
    return this._http.get<Updatetheuser>(this._get_a_user , {params : param1});
  }


  getImage(imge) : Observable<any>
  {
    return this._http.post(this.getImg , imge);
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

  addUser(ans : FormData): Observable<any>{
    ans.append('totaldeals', '0');
    ans.append('accepteddeals', '0');
    ans.append('rejecteddeals', '0');
    ans.append('dealspending', '0');
    ans.append('maxval', '0');
    ans.append('Hide', 'true');
    ans.append('Hide1', 'false');
    console.log(ans);

    return this._http.post(`${this._addApi}`,ans);
  }
}
