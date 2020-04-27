import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter2'
})
export class Filter2Pipe implements PipeTransform {

  transform(item: any,  search_user_id: String , search_name: String , search_company : String): unknown {

    console.log(item);

    if(!item)
    return item;

    if(search_user_id)
    {
      item = item.filter(item => item._id.toLowerCase().indexOf(search_user_id.toLowerCase()) != -1)
    }
    if(search_name)
    {
      item = item.filter(item => item.username.toLowerCase().indexOf(search_name.toLowerCase()) != -1)
    }
    if(search_company)
    {
      item = item.filter(item => item.company.toLowerCase().indexOf(search_company.toLowerCase()) != -1)
    }

    return item;
  }

}
