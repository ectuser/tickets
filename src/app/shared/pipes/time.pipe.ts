import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(min: number): string {
    const days = new Time(Math.floor(min / 1440), 'D');
    const hours = new Time(Math.floor((min - days.value * 1440) / 60), 'H');
    const minutes = new Time(Math.round(min % 60), 'M');
    return [days, hours, minutes]
      .filter((el) => !!el.value)
      .map((el) => el.toString())
      .join(' ');
  }
}

class Time {
  constructor(public value: number, private sign: string) {}

  toString() {
    return this.value.toString() + this.sign;
  }
}
