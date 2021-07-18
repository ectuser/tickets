import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from '@core/components/header/header.component';
import { FilterComponent } from '@core/components/filter/filter.component';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@core/components/home/home.component';
import { LayoutComponent } from '@core/components/layout/layout.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FilterComponent, HomeComponent, LayoutComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
