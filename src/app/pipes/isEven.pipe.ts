import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isEven',
})
export class isEvenPipe implements PipeTransform {
  transform(value: any) {
    var textEven = 'es impar';
    if (value % 2 == 0) {
      textEven = 'es par';
    }
    return 'El año es ' + value + ' y ' + textEven;
  }
}
