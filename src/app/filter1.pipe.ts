import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter1'
})
export class Filter1Pipe implements PipeTransform {

  transform(item : any , search_text: String): unknown {
    if(!item || !search_text)
    return item;

    return item.filter(item => item.dealId.toLowerCase().indexOf(search_text.toLowerCase()) != -1)
  }
}
