import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUnderscores'
})
export class RemoveUnderscoresPipe implements PipeTransform {
  transform(value: string | undefined): string | undefined {
    return value ? value.replace(/_/g, ' ') : value;
  }
}
