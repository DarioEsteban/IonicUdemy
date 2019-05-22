import { Pipe, PipeTransform } from '@angular/core';
import { List } from '../models/list.model';

@Pipe({
  name: 'filterComplete',
  pure: false
})
export class FilterCompletePipe implements PipeTransform {

  transform(list: List[], complete: boolean = true): List[] {
    
    return list.filter( data => data.complete === complete)
  
  }

}
