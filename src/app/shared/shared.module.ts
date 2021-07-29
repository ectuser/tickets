import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { CompanyImagePipe } from './pipes/company-image.pipe';
import { TimePipe } from './pipes/time.pipe';
import { MoneyPipe } from './pipes/money.pipe';
import { FlightStartEndPipe } from './pipes/flight-start-end.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [LoaderComponent, TicketComponent, CompanyImagePipe, TimePipe, MoneyPipe, FlightStartEndPipe],
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  exports: [
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    LoaderComponent,
    TicketComponent,
    MatSnackBarModule,
  ],
})
export class SharedModule {}
