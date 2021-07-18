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
import * as fromStore from './store';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FilterComponent, HomeComponent, LayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreModule.forFeature(fromStore.storeFeatureKey, fromStore.reducers, { metaReducers: fromStore.metaReducers }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
