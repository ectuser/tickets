import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@core/components/home/home.component';
import { LayoutComponent } from '@core/components/layout/layout.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { HomeGuard } from '@core/guards/home.guard';
import { HOME_ROUTE } from './app-routes';

const routes: Routes = [
  { ...HOME_ROUTE, component: HomeComponent, canActivate: [HomeGuard] },
  {
    path: 'flights',
    component: LayoutComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
