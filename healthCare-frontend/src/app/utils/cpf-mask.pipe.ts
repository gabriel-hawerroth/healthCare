import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfMask',
  standalone: true,
})
export class CpfMaskPipe implements PipeTransform {
  transform(value: string): string {
    // Verifica se o valor é válido
    if (!value || value.length !== 11) {
      return value;
    }

    // Aplica a máscara no valor do CPF
    return (
      value.substring(0, 3) +
      '.' +
      value.substring(3, 6) +
      '.' +
      value.substring(6, 9) +
      '-' +
      value.substring(9)
    );
  }
}
