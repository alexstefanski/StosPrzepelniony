import { Pipe, PipeTransform } from '@angular/core';

import { Ad } from './../models/ad';
import { Category } from './../models/category';

@Pipe({
  name: 'filterByCategory'
})
export class AdCategoryFilterPipe implements PipeTransform {
  transform(value: Array<Ad>, categories: Array<Category>): Array<Ad> {
    if(categories.length == 0) {
      return value;
    }

    let categoriesId: Array<number> = [];

    categories.forEach(function(category) {
      categoriesId.push(category.categoryId);
    });

    let result: Array<Ad> = [];

    value.forEach(function(ad) {
      if(categoriesId.includes(ad.categoryId)) {
        result.push(ad);
      }
    })

    return result;
  }
}
