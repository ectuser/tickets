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
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { metaReducers, reducers } from '@store/root.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '@store/auth/auth.effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TicketsInterceptor } from '@core/interceptors/tickets.interceptor';
import { TicketsEffects } from '@store/tickets/tickets.effects';
import { DatePipe } from '@angular/common';
import { TicketsComponent } from './core/components/tickets/tickets.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FilterComponent, HomeComponent, LayoutComponent, TicketsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    EffectsModule.forRoot([AuthEffects, TicketsEffects]),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TicketsInterceptor,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
