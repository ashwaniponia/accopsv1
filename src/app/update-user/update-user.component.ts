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
public flag :  boolean = false;
public url ="assets/img/images.jpg";
public selectedImage = null ;
public Hide = true;
  constructor(private _fb: FormBuilder , private _userservice : UserServiceService) { }

  public UserForm;
  public hideform = true;
  public hidemsg = true;
  public hidemsg1 = true;
  public hidemsg2 = true;
  public hidemsg3 = true;
  public message : string = "";
  ngOnInit(): void {
    this.UserForm = this._fb.group({
      company : ['' , Validators.required],
      orgcode : ['' , Validators.required],
      username : ['', Validators.required],
      firstname : ['', Validators.required],
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


    console.log(this.UserForm);
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
    var f = 0;
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
        if(temp[i] == "UPDATE")
        {
          console.log("Hello");
          f =1 ;
        }
       check.splice(check.indexOf(temp[i]) , 1);
      }
    });
      console.log(check);
      this.uarray = check;
      if(f == 1)
      {
        for(var x = 0; x < this.UserForm.controls.Region_selection.length ; x++)
        {
            var x1 = this.UserForm.controls.Region_selection.controls[x].value.region_code;
            var x2 = "";
            this.UserForm.controls.Region_selection.removeAt(x);
            var temp1 = this._fb.group({
                region_code : x1,
                auth_level : x2
            });
            this.UserForm.controls.Region_selection.insert(x , temp1);
        }
      }
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
     this._userservice.getUserinfo(this.searchString).subscribe(
      data => {this.userinfo = data

      //console.log(this.userinfo[0].username);
      console.log(this.userinfo);
      if(this.userinfo.length > 0)
      {
          this.UserForm.reset();
          this.Hide = false;
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
          if( this.userinfo[0].regioncode.length > 0)
          {

            while(  this.UserForm.get('Region_selection').length > 0)
            this.UserForm.get('Region_selection').removeAt(0);
          }
          for(var x = 0 ; x < this.userinfo[0].regioncode.length ; x++)
          {
              var x1 = "" , x2="";
              x1 = this.userinfo[0].regioncode[x];
              if(this.userinfo[0].L1.includes(x1))
              {
                x2 = "L1";
              }
              if(this.userinfo[0].L2.includes(x1))
              {
                x2 = "L2";
              }
              if(this.userinfo[0].L3.includes(x1))
              {
                x2 = "L3";
              }

              var group = this._fb.group({
                region_code : [x1 , Validators.required],
                auth_level : [x2]
              });

              this.UserForm.get('Region_selection').push(group);
          }
          if(this.userinfo[0].imge != null)
          this.url = "http://localhost:4000/uploads/" + this.userinfo[0].imge;

          
          console.log(this.url);
      }
      else
      {
          alert("User does not exist");
      }
    });
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

  func2()
  {
    console.log(this.uarray);
    console.log(this.darray);
    console.log(this.UserForm.value);
    console.log(this.userinfo);
    var l1 : string[] = [];
    var l2 : string[] = [];
    var l3  : string[] = [];
    var regioncodes = [];


    this.UserForm.controls.Region_selection.controls.forEach(function(control , i){
        if(control.value.auth_level == "L1")
        l1.push(control.value.region_code);
        else if(control.value.auth_level == "L2")
        l2.push(control.value.region_code);
        else if(control.value.auth_level == "L3")
        l3.push(control.value.region_code);

        regioncodes.push(control.value.region_code);
    });
    this.Hide = true;
    const ans = new FormData();
    ans.append('_id' , this.userinfo[0]._id);
    ans.append(  'company' , this.UserForm.get('company').value );
    ans.append(  'imge' , this.selectedImage);
    ans.append(  'orgcode' , this.UserForm.get('orgcode').value);
    ans.append(  'username' , this.UserForm.get('username').value );
    ans.append(  'firstname' , this.UserForm.get('firstname').value );
    ans.append(  'lastname' , this.UserForm.get('lastname').value );
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

    console.log(ans);


    if(!this.UserForm.valid ||  this.flag == true)
    {
      alert("Filling all details is mandatory");
    }
    else
    {
       this.UserForm.reset();
       this._userservice.postUser(ans).subscribe(
         data =>
         {
             this.message = data;
             alert(this.message);
         },
         error =>
         {
           this.message = error;
           alert(this.message);
         }
       );
    }


  }
}
