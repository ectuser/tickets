import { Segment } from '@core/interceptors/segment.interface';

export interface Ticket {
  price: number;
  carrier: string;
  segments: [Segment, Segment];
}
