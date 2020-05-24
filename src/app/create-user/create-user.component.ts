import { UserServiceService } from './../user-service.service';
import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import { FormBuilder , FormGroup , FormArray } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers : [UserServiceService]
})
export class CreateUserComponent implements OnInit {
  public userrights : string[] = ["CREATE" , "DELETE" , "UPDATE" , "VIEW"];
  public  dealrights : string[] = ["CREATE" , "UPDATE" , "VIEW"];
  public darray : string[] = [];
  public  uarray : string[] = [];

  public UserForm;
  public hideform = false;
  public hidemsg1 = true;
  public hidemsg2 = true;
  public  flag : boolean = false;
  public message = "";
  constructor(private _fb:FormBuilder ,private _userservice:UserServiceService) { }

  ngOnInit(): void {
    this.UserForm = this._fb.group({
      company : ['' , Validators.required],
      orgcode : ['' , Validators.required],
      username : ['', Validators.required],
      firstname : ['', Validators.required],
      password : ['', Validators.required],
      lastname :['', Validators.required],
      Region_selection : this._fb.array([
        this.addRegionGroup()
      ]),
      address :['', Validators.required],
      city : ['', Validators.required],
      country : ['', Validators.required],
      postalcode : ['', Validators.required],
      urights : this.Addduserrights(),
      drights : this.Addddealrights()
    });
  }

  addRegion()
  {
    this.UserForm.get('Region_selection').push(this.addRegionGroup());
  }

  addRegionGroup() : FormGroup
  {
    return this._fb.group({
      region_code : ['' , Validators.required],
      auth_level : ['']
    });
  }

  RemoveRegion(i)
  {
    this.UserForm.get('Region_selection').removeAt(i);
  }


  check(alevel , rcode)
  {
    if(alevel == "")
    {
      console.log("false");
      this.flag = false;
      console.log(this.flag);
      return false;
    }

    if(alevel == "L1" && rcode.match(/^[A-Z]+$/))
    {
      console.log("false");
      this.flag = false;
      console.log(this.flag);
      return false;
    }

    if(alevel == "L2" && rcode.match(/^[A-Z]*[0-9]$/))
    {
      console.log("false");
      this.flag = false;
      console.log(this.flag);
      return false;
    }

    if(alevel == "L3" && rcode.match(/^[A-Z]*[0-9][0-9][0-9][0-9]$/))
    {
      console.log("false");
      this.flag = false;
      console.log(this.flag);
      return false;
    }
    console.log("true");
    this.flag = true;
    console.log(this.flag);
    return true;
  }




  getSelectedUserRights()
  {

    var  temp = this.userrights;
    var check = this.uarray;

    this.UserArray.controls.forEach(function(control , i) {
      //console.log(temp[i]);
      //console.log(check);
      //console.log(this.userrights[0]);
      if(control.value  && !(check.includes(temp[i])))
      {
        check.push(temp[i]);
      }
      else if(!(control.value) && (check.includes(temp[i])))
      {
       check.splice(check.indexOf(temp[i]) , 1);
      }
    });
      console.log(check);
      this.uarray = check
    //console.log(this.uarray);

  }

  getSelectedDealRights()
  {
    var  temp = this.dealrights;
    var check = this.darray;
    this.DealArray.controls.forEach(function(control , i){
      if(control.value && !(check.includes(temp[i])))
      {
        check.push(temp[i]);
      }
      else if(!(control.value) && (check.includes(temp[i])))
      {
        check.splice( check.indexOf(temp[i]) , 1);
      }
    });
    console.log(check);
    this.darray = check

  }

  Addduserrights()
  {
    const arr = this.userrights.map(element=>{
          return this._fb.control(false);
    });
    console.log(arr);
    return this._fb.array(arr);
  }

  Addddealrights()
  {
    const arr = this.dealrights.map(element=>{
      return this._fb.control(false);
    });
    return this._fb.array(arr);
  }

  get UserArray()
  {
    return <FormArray>this.UserForm.get('urights');
  }

  get DealArray(){
    return <FormArray>this.UserForm.get('drights');
  }

  func2()
  {
    console.log(this.uarray);
    console.log(this.darray);
    console.log(this.UserForm.value);
    var l1:string[]=[];
    var l2:string[]=[];
    var l3:string[]=[];
    var regioncodes : string[] = [];
    console.log(this.UserForm.controls.Region_selection.controls);
    this.UserForm.controls.Region_selection.controls.forEach(function(control , i){
        if(control.value.auth_level == "L1")
        l1.push(control.value.region_code);
        else if(control.value.auth_level == "L2")
        l2.push(control.value.region_code);
        else if(control.value.auth_level == "L3")
        l3.push(control.value.region_code);

        regioncodes.push(control.value.region_code);
    });



    var ans = {
      company : this.UserForm.get('company').value,
      imge : "assets/img/images.jpg",
      orgcode : this.UserForm.get('orgcode').value,
      username : this.UserForm.get('username').value,
      firstname : this.UserForm.get('firstname').value,
      lastname : this.UserForm.get('lastname').value,
      password : this.UserForm.get('password').value,
      regioncode : regioncodes ,
      address : this.UserForm.get('address').value,
      city : this.UserForm.get('city').value,
      country : this.UserForm.get('country').value,
      postalcode : this.UserForm.get('postalcode').value,
      urights : this.uarray,
      drights : this.darray,
      L1 : l1,
      L2 : l2,
      L3 : l3
    }

    console.log(ans);

    this.hideform=true;

    this._userservice.addUser(ans).subscribe(params => {
    this.message = params;
    this.hidemsg1 = false;
   },
   error =>{ this.message = error;  console.log(error);  this.hidemsg1 = false; },() =>{
   });
  }
}
