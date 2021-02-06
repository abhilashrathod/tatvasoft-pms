import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// Routing
import {AppRoutingModule} from './app-routing.module';
// Shared
import {MaterialModule} from './shared/material/material.module';
// DB Config
import {DBConfig, NgxIndexedDBModule} from 'ngx-indexed-db';
// Components
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';


const dbConfig: DBConfig = {
  name: 'PMS Db',
  version: 1,
  objectStoresMeta: [
    {
      store: 'users',
      storeConfig: {keyPath: 'id', autoIncrement: false},
      storeSchema: [
        {name: 'id', keypath: 'id', options: {unique: true}},
        {name: 'userName', keypath: 'userName', options: {unique: false}},
        {name: 'password', keypath: 'password', options: {unique: false}},
        {name: 'role', keypath: 'role', options: {unique: false}}
      ]
    },
    {
      store: 'products',
      storeConfig: {keyPath: 'id', autoIncrement: false},
      storeSchema: [
        {name: 'id', keypath: 'id', options: {unique: true}},
        {name: 'createdBy', keypath: 'createdBy', options: {unique: false}},
        {name: 'title', keypath: 'title', options: {unique: false}},
        {name: 'description', keypath: 'description', options: {unique: false}},
        {name: 'image', keypath: 'image', options: {unique: false}},
        {name: 'quantity', keypath: 'quantity', options: {unique: false}},
        {name: 'tags', keypath: 'tags', options: {unique: false}},
        {name: 'status', keypath: 'status', options: {unique: false}},
        {name: 'datesToActive', keypath: 'datesToActive', options: {unique: false}},
      ]
    }
  ]
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
