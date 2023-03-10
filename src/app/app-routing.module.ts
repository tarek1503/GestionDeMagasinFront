import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './shared/categories-list/categories-list.component';
import { ClientsListComponent } from './shared/clients-list/clients-list.component';
import { ProductsListComponent } from './shared/products-list/products-list.component';

const routes: Routes = [
  {path: 'products', component:ProductsListComponent},
  {path: 'clients', component:ClientsListComponent},
  {path: 'categories', component:CategoriesListComponent},


  {path:'',redirectTo:'products', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
