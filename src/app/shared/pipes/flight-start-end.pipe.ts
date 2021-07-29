import { Pipe, PipeTransform } from '@angular/core';
import { Segment } from '@core/interfaces/segment.interface';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'flightStartEnd',
})
export class FlightStartEndPipe implements PipeTransform {
  transform(segment: Segment): string {
    const fromTime = this.datePipe.transform(segment.date, 'hh:mm');
    const endTimeDate = new Date(new Date(segment.date).getDate() + segment.duration * 60000);
    const endTime = this.datePipe.transform(endTimeDate, 'hh:mm');
    return fromTime && endTime ? fromTime + ' - ' + endTime : '';
  }

  constructor(private datePipe: DatePipe) {}
}
