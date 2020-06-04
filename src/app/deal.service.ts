import { dealexist } from './dealexist';
import { Observable } from 'rxjs';
import { HttpClient , HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dealinfo } from "./dealinfo";
@Injectable({
  providedIn: 'root'
})
export class DealService {

  private _addApi = "http://localhost:4000/api/addDeal";
  private _dealexistApi = "http://localhost:4000/api/Dealexist";
  private _getDeal = "http://localhost:4000/api/viewdeals";
  private _addL2 = "http://localhost:4000/api/updatedeal/addL2";
  private _addL3 = "http://localhost:4000/api/updatedeal/addL3";
  private _auth = "http://localhost:4000/api/updatedeal/auth";
  private _getDealL1 = "http://localhost:4000/api/getdeal/L1";
  private _getDealL2 = "http://localhost:4000/api/getdeal/L2";
  private _getDealL3 = "http://localhost:4000/api/getdeal/L3";

  constructor(private _http:HttpClient) { }

  dealExist(orgname,amount,description):Observable<dealexist>{
    const obj={orgname,amount,description}
    return this._http.post<dealexist>(`${this._dealexistApi}`,obj)
  }

  addDeal(orgname,amt,description , time , regioncode , userName):Observable<any>{
    let dealprogress = 0,level = 1 , Hide = false , Time = time , username = userName , Hide_description = true , amount = parseInt(amt) , region_code = regioncode, status="Pending";
    const obj ={ dealprogress,description,orgname,amount,level ,Hide , Time , username , Hide_description  , region_code , status};
      return this._http.post(`${this._addApi}`,obj)

  }

  getDeals():Observable<Dealinfo[]>
  {
    return this._http.get<Dealinfo[]>(this._getDeal);
  }

  addtoL2(item):Observable<any>
  {
    return this._http.post(this._addL2 , {'item': item});
  }

  addtoL3(item):Observable<any>
  {
    return this._http.post(this._addL3 , {'item': item});
  }


  getDealsL1(l1):Observable<Dealinfo[]>
  {
    const param1 = new HttpParams().set('l1' , l1);
    return   this._http.get<Dealinfo[]>(this._getDealL1 , {params : param1});
  }

  getDealsL2(l2):Observable<Dealinfo[]>
  {
    const param1 = new HttpParams().set('l2' , l2);
    return this._http.get<Dealinfo[]>(this._getDealL2 , {params : param1});
  }

  getDealsL3(l3):Observable<Dealinfo[]>
  {
    const param1 = new HttpParams().set('l3' , l3);
    return this._http.get<Dealinfo[]>(this._getDealL3 , {params : param1});
  }

  markAuthorised(item):Observable<any>
  {
    return this._http.post(this._auth , {'item' : item});
  }
}
