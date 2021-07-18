import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@core/components/home/home.component';
import { LayoutComponent } from '@core/components/layout/layout.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'flights',
    component: LayoutComponent,
    children: [
      { path: 'cheapest', loadChildren: () => import('@cheapest/cheapest.module').then((m) => m.CheapestModule) },
      { path: 'fastest', loadChildren: () => import('@fastest/fastest.module').then((m) => m.FastestModule) },
    ],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
