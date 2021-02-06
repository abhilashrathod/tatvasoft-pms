import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// Shared
import {MaterialModule} from '../../shared/material/material.module';
// Module Routes
import {AdminRoutingModule} from './admin-routing.module';
// Components
import {LayoutComponent} from './layout/layout.component';
import {ProductListComponent} from './products/list/product-list.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ContactComponent} from './contact/contact.component';
import {AddOrUpdateComponent} from './products/add-or-update/add-or-update.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,

    AdminRoutingModule
  ],
  exports: [],
  declarations: [
    LayoutComponent,
    DashboardComponent,
    ProductListComponent,
    ContactComponent,
    AddOrUpdateComponent,
  ],
  providers: [],
  entryComponents: [AddOrUpdateComponent]
})
export class AdminModule {
}
