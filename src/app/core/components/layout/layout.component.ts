import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  transfers$ = new BehaviorSubject<number[]>([1, 3, 4, 5]);

  updateFilter(filter: unknown): void {
    // do smth
  }
}
