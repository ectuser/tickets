import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { MatCheckboxChange } from '@angular/material/checkbox';

const FILTER_DELAY = 400;

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit, OnChanges, OnDestroy {
  @Input() transfers: number[] | null = [];
  @Output() updateFilter = new EventEmitter();

  checkAllControl = false;

  form = new FormGroup({});

  private unsubscribe = new Subject();

  get formTransfers(): string[] {
    return Object.keys(this.form.controls);
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        map((changes) => {
          return Object.keys(changes).every((key) => !!changes[key]);
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe((status) => {
        this.checkAllControl = status;
      });

    this.form.valueChanges.pipe(debounceTime(FILTER_DELAY), takeUntil(this.unsubscribe)).subscribe(() => {
      this.updateFilter.emit(this.form.value);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.transfers && changes.transfers.currentValue) {
      this.processForm(changes.transfers.currentValue);
    }
  }

  onCheckAll(event: MatCheckboxChange): void {
    this.formTransfers.forEach((transfer) => {
      this.form.get(transfer)?.patchValue(event.checked);
    });
  }

  private processForm(newTransfers: number[]) {
    this.form.reset();
    newTransfers.forEach((transfer) => {
      this.form.addControl(transfer.toString(), new FormControl(false));
    });
  }
}
