import { dealexist } from './dealexist';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DealService {
  
  private _addApi = "/api/addDeal";
  private _dealexistApi = "/api/Dealexist";

  constructor(private _http:HttpClient) { }

  dealExist(orgname,amount,description):Observable<dealexist>{
    const obj={orgname,amount,description}
    return this._http.post<dealexist>(`${this._dealexistApi}`,obj)
  }

  addDeal(orgname,amount,description):Observable<any>{
    let dealprogrss = 0,TimeRemaining = 30,orgcode = "A234",level = 4,hide1 = true,hide2=false;
    const obj ={ dealprogrss,TimeRemaining,description,orgname,orgcode,amount,level,hide1,hide2  };
      return this._http.post(`${this._addApi}`,obj)

  }

}
