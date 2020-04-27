import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { FormBuilder , FormGroup , FormArray } from '@angular/forms';
import { map } from 'rxjs/operators';
import { UserServiceService } from '../user-service.service';
import { Observable } from 'rxjs';
import { Updatetheuser } from '../updatetheuser';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
  providers : [UserServiceService]
})
export class UpdateUserComponent implements OnInit {
//  userModel = new User('Apple' , 'A1234' , 'contender' , 'Karandeep' , 'Bajwa' , '501 Rose building Regency Meadows Dhanori Pune ' , 'Pune' , 'India' , 411015);
public searchString = "";
public userrights : string[] = ["CREATE" , "DELETE" , "UPDATE" , "VIEW"];
public  dealrights : string[] = ["CREATE" , "UPDATE" , "VIEW"];
public darray : string[] = [];
public  uarray : string[] = [];
public userinfo;
  constructor(private _fb: FormBuilder , private _userservice : UserServiceService) { }

  public UserForm : FormGroup;
  public hideform = true;
  public hidemsg = true;
  public hidemsg1 = true;
  public hidemsg2 = true;
  public hidemsg3 = true;
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

  Adduserrights(check : string[])
  {
    var x = [];
    console.log(this.userinfo);
    console.log(check);
    const arr = this.userrights.map(element=>{
      console.log(check);
      console.log(element);
      if(check.includes(element))
      x.push(element);

      return this._fb.control(check.includes(element));
    });

    this.uarray = x;
    return this._fb.array(arr);
  }

  Adddealrights(check : string[])
  {
      var x = [];
    const arr = this.dealrights.map(element=>{
      console.log(check);
      console.log(element);
      if(check.includes(element))
      x.push(element);
      return this._fb.control(check.includes(element));
    });
    this.darray = x;
    return this._fb.array(arr);
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

  func1()
  {
    this._userservice.getUserinfo(this.searchString).subscribe(resUserData => {this.userinfo = resUserData; console.log(resUserData);console.log(this.userinfo);
      //console.log(this.userinfo[0].username);
      if(this.userinfo.length > 0)
      {
          this.hideform = false;
          this.hidemsg = true;
          this.hidemsg1 = true;
          this.hidemsg2 = true;
          this.hidemsg3 = true;
          this.UserForm.controls['company'].setValue(this.userinfo[0].company);
          this.UserForm.controls['orgcode'].setValue(this.userinfo[0].orgcode);
          this.UserForm.controls['username'].setValue(this.userinfo[0].username);
          this.UserForm.controls['firstname'].setValue(this.userinfo[0].firstname);
          this.UserForm.controls['lastname'].setValue(this.userinfo[0].lastname);
          this.UserForm.controls['address'].setValue(this.userinfo[0].address);
          this.UserForm.controls['city'].setValue(this.userinfo[0].city);
          this.UserForm.controls['country'].setValue(this.userinfo[0].country);
          this.UserForm.controls['postalcode'].setValue(this.userinfo[0].postalcode);
          this.UserForm.controls.urights = this.Adduserrights(this.userinfo[0].urights);
          this.UserForm.controls.drights = this.Adddealrights(this.userinfo[0].drights);
      }
      else
      {
        console.log("hello");
        this.hidemsg1 = false;
      }
    });

  }

  func2()
  {
    console.log(this.uarray);
    console.log(this.darray);
    console.log(this.UserForm.value);
    console.log(this.userinfo);
    var ans = {
      _id : this.userinfo[0]._id,
      company : this.UserForm.get('company').value,
      imge : "assets.img.images.jpg",
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

    this._userservice.postUser(ans).subscribe(
      data =>
      {
          if(data == "Error")
          this.hidemsg2 = false;
          else
          this.hidemsg = false;
      }
    );
  }
}
