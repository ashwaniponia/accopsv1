import { UserServiceService } from './../user-service.service';
import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import { FormBuilder , FormGroup , FormArray} from '@angular/forms';
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
  public selectedImage ;
  public UserForm;
  public  flag : boolean = false;
  public message = "";
  public url ="assets/img/images.jpg";
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

  onSelection(event)
  {
    this.selectedImage = event.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event:any) =>
    {
      this.url = event.target.result;
    }

  }

  check(alevel , rcode)
  {

    if(this.darray.includes("UPDATE"))
    {
          if((alevel == "") && ( rcode.match(/^[A-Z][A-Z][A-Z][A-Z][A-Z][A-Z][A-Z][A-Z][A-Z]$/) || rcode.match(/^[A-Z][A-Z][A-Z][A-Z][0][0][0][0][0]$/) || rcode.match(/^[A-Z][A-Z][0][0][0][0][0][0][0]$/)  ))
          {
            console.log("false");
            this.flag = false;
            return false;
          }

          else if(alevel == "L1" && rcode.match(/^[A-Z][A-Z][A-Z][A-Z][A-Z][A-Z][A-Z][A-Z][A-Z]$/))
          {
            console.log("false");
            this.flag = false;
            return false;
          }

          else if(alevel == "L2" && rcode.match(/^[A-Z][A-Z][A-Z][A-Z][0][0][0][0][0]$/))
          {
            console.log("false");
            this.flag = false;
            return false;
          }

          else if(alevel == "L3" && rcode.match(/^[A-Z][A-Z][0][0][0][0][0][0][0]$/))
          {
            console.log("false");
            this.flag = false;
            return false;
          }

          else
          {
            console.log("true");
            this.flag = true;
            return true;
          }
    }
    else
    {
        if(rcode.match(/^[A-Z][A-Z][A-Z][A-Z][A-Z][A-Z][A-Z][A-Z][A-Z]$/) || rcode.match(/^[A-Z][A-Z][A-Z][A-Z][0][0][0][0][0]$/) || rcode.match(/^[A-Z][A-Z][0][0][0][0][0][0][0]$/) )
        {
            this.flag = false;
            return false;
        }
        else
        {
            this.flag = true;
            return true;
        }
    }
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

    const ans = new FormData();
    ans.append(  'company' , this.UserForm.get('company').value );
    ans.append(  'imge' , this.selectedImage);
    ans.append(  'orgcode' , this.UserForm.get('orgcode').value);
    ans.append(  'username' , this.UserForm.get('username').value );
    ans.append(  'firstname' , this.UserForm.get('firstname').value );
    ans.append(  'lastname' , this.UserForm.get('lastname').value );
    ans.append(  'password' , this.UserForm.get('password').value );
    ans.append(  'regioncode' , JSON.stringify(regioncodes) );
    ans.append(  'address' , this.UserForm.get('address').value );
    ans.append(  'city' , this.UserForm.get('city').value );
    ans.append(  'country' , this.UserForm.get('country').value );
    ans.append(  'postalcode' , this.UserForm.get('postalcode').value );
    ans.append(  'urights' , JSON.stringify(this.uarray));
    ans.append(  'drights' ,  JSON.stringify(this.darray));
    ans.append(  'L1' ,  JSON.stringify(l1));
    ans.append(  'L2' ,  JSON.stringify(l2) );
    ans.append(  'L3' , JSON.stringify(l3) );


    console.log(ans.get('imge'));


    if(!this.UserForm.valid)
    {
      alert("Filling all details is mandatory");
    }
    else if(this.flag == true)
    {
      alert("Appropriate region is not filled");
    }
    else if(this.UserForm.controls.password.value.length < 6)
    {
      alert("Password length should be at least 6");
    }
    else
    {
       this.UserForm.reset();
      this._userservice.addUser(ans).subscribe(params =>
        {
            this.message = params;
            alert(this.message);
        },
        error =>{ this.message = error;  alert(this.message) },() =>{
        });
    }
  }
}
