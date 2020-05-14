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
  constructor(private _fb:FormBuilder ,private _userservice:UserServiceService) { }

  ngOnInit(): void {
    this.UserForm = this._fb.group({
      company : ['' , Validators.required],
      orgcode : ['' , Validators.required],
      username : ['', Validators.required],
      firstname : ['', Validators.required],
      lastname :['', Validators.required],
      address :['', Validators.required],
      city : ['', Validators.required],
      country : ['', Validators.required],
      postalcode : ['', Validators.required],
      urights : this.Addduserrights(),
      drights : this.Addddealrights()
    });
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
    var ans = {
      company : this.UserForm.get('company').value,
      imge : "assets/img/images.jpg",
      orgcode : this.UserForm.get('orgcode').value,
      username : this.UserForm.get('username').value,
      firstname : this.UserForm.get('firstname').value,
      lastname : this.UserForm.get('lastname').value,
      address : this.UserForm.get('address').value,
      city : this.UserForm.get('city').value,
      country : this.UserForm.get('country').value,
      postalcode : this.UserForm.get('postalcode').value,
      urights : this.uarray,
      drights : this.darray
    }

    console.log(ans);

    this.hideform=true;

    this._userservice.addUser(ans).subscribe(params => {
     if(params == "Error")
     {
       this.hidemsg2 = false;
     }
     else
     {
       this.hidemsg1 = false;
     }
   },
   error =>console.log(error),() =>{
     console.log('UserApiService : Create User completed')
   });
  }
}
