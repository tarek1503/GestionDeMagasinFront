import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { DeletePopUpComponent } from './delete-pop-up/delete-pop-up.component';
import { ProductsListComponent } from './shared/products-list/products-list.component';
import {MatMenuModule} from "@angular/material/menu";
import { ClientsListComponent } from './shared/clients-list/clients-list.component';
import { DeleteClientPopUpComponent } from './delete-client-pop-up/delete-client-pop-up.component';
import { DialogClientComponent } from './dialog-client/dialog-client.component';
import { DeleteCategoryPopUpComponent } from './delete-category-pop-up/delete-category-pop-up.component';
import { DialogCategoryComponent } from './dialog-category/dialog-category.component';
import { CategoriesListComponent } from './shared/categories-list/categories-list.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    ProductsListComponent,
    DeletePopUpComponent,
    ClientsListComponent,
    DeleteClientPopUpComponent,
    DialogClientComponent,
    DeleteCategoryPopUpComponent,
    DialogCategoryComponent,
    CategoriesListComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
