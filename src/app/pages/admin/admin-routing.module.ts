import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {ProductListComponent} from './products/list/product-list.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ContactComponent} from './contact/contact.component';

import {AuthGuard, RoleGuard} from '../../services/user.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard]},
      {
        path: 'products',
        canActivate: [RoleGuard],
        children: [
          {path: '', redirectTo: 'list', pathMatch: 'full'},
          {path: 'list', component: ProductListComponent},
        ]
      },
      {path: 'contact', component: ContactComponent, canActivate: [RoleGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
