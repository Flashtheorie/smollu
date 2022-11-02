import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateago'
})
export class DateagoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
