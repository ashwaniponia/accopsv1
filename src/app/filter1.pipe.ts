import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter1'
})
export class Filter1Pipe implements PipeTransform {

  transform(item : any , search_text: String , search_user : String , search_company: String): unknown {
    if(!item)
    return item;

    if(search_text)
    item = item.filter(item => item._id.toLowerCase().indexOf(search_text.toLowerCase()) != -1);
    if(search_user)
    item = item.filter(item => item.username.toLowerCase().indexOf(search_user.toLowerCase()) != -1);
    if(search_company)
    item = item.filter(item => item.orgname.toLowerCase().indexOf(search_company.toLowerCase()) != -1);
    return item
  }
}
