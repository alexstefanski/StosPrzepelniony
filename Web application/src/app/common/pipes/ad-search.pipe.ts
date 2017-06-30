import { Pipe, PipeTransform } from '@angular/core';

import { Ad } from './../models/ad';

@Pipe({
  name: 'search'
})
export class AdSearchPipe implements PipeTransform {
  transform(value: Array<Ad>, query: string): Array<Ad> {
    if(query == null) {
      return value;
    }

    let result: Array<Ad> = [];

    value.forEach(function(ad) {
      if(ad.subject.toLowerCase().includes(query.toLowerCase()) || ad.userFirstName.toLowerCase().includes(query.toLowerCase())) {
        result.push(ad);
      }
    })

    return result;
  }
}
