import { Segment } from '@core/interfaces/segment.interface';

export interface Ticket {
  price: number;
  carrier: string;
  segments: [Segment, Segment];
}
