import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money',
})
export class MoneyPipe implements PipeTransform {
  transform(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' RUB';
  }
}
