import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatCardModule, MatCheckboxModule, FormsModule, ReactiveFormsModule, MatTabsModule, MatButtonModule],
  exports: [MatCardModule, MatCheckboxModule, FormsModule, ReactiveFormsModule, MatTabsModule, MatButtonModule],
})
export class SharedModule {}
