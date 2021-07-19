import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'companyImage',
})
export class CompanyImagePipe implements PipeTransform {
  transform(name: string | undefined | null): string {
    return name ? `${environment.imagesUrl}/${name}.png` : '';
  }
}
