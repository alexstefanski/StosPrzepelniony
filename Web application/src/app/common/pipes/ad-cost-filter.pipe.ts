import { Pipe, PipeTransform } from '@angular/core';

import { Ad } from './../models/ad';

@Pipe({
  name: 'costFilter'
})
export class AdCostFilterPipe implements PipeTransform {
  transform(value: Array<Ad>, costType: number, minimum: number, maximum: number): Array<Ad> {
    if(costType == null && minimum == null && maximum == null) {
      return value;
    }

    // costType
    // 0 - Za godzinę
    // 1 - Za projekt

    let result: Array<Ad> = [];
    result = value;
    // Przypadek gdy użytkownik wybrał typ zapłaty.
    if(costType != null) {
      result = result.filter( function(ad) {
        if (costType == 0) {
          return ad.costHour != null;
        }

        if (costType == 1) {
          return ad.costTotal != null;
        }
      })
    }

    // Przypadek gdy użytkowk wybrał minimalną wartość zapłaty.
    if(minimum != null) {
      result = result.filter( function(ad) {
          if(ad.costHour != null && ad.costHour >= minimum) {
            return true;
          }

          if(ad.costTotal != null && ad.costTotal >= minimum) {
            return true;
          }

          return false;
      })
    }

    // Przypadek gdy użytkowk wybrał maksymalną wartość zapłaty.
    if(maximum != null) {
      result = result.filter( function(ad) {
        if(ad.costHour != null && ad.costHour <= maximum) {
          return true;
        }

        if(ad.costTotal != null && ad.costTotal <= maximum) {
          return true;
        }

        return false;
      })
    }

    return result;
  }
}
