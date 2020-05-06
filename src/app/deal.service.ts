import { dealexist } from './dealexist';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dealinfo } from "./dealinfo";
@Injectable({
  providedIn: 'root'
})
export class DealService {

  private _addApi = "/api/addDeal";
  private _dealexistApi = "/api/Dealexist";
  private _getDeal = "/api/viewdeals";
  constructor(private _http:HttpClient) { }

  dealExist(orgname,amount,description):Observable<dealexist>{
    const obj={orgname,amount,description}
    return this._http.post<dealexist>(`${this._dealexistApi}`,obj)
  }

  addDeal(orgname,amount,description , time):Observable<any>{
    let dealprogress = 0,TimeRemaining = 30, level = 0 , Hide = true , Time = [time , 0];
    const obj ={ dealprogress,TimeRemaining,description,orgname,amount,level ,Hide , Time  };
      return this._http.post(`${this._addApi}`,obj)

  }

  getDeals():Observable<Dealinfo[]>
  {
    return this._http.get<Dealinfo[]>(this._getDeal);
  }

}
