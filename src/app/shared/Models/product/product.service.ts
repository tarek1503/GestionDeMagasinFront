import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';
const optionRequete = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = "/server/GestionProd"

  constructor(private httpClient: HttpClient) { }

  getProductsList(): Observable<Product[]>{
    return this.httpClient.get<Product[]>("/server/GestionProd/products");
  }

  CreateProduct(product:Product) : Observable<Object>{
    return this.httpClient.post<Product>("/server/GestionProd/addProduct",product);
    }

    PutProduct(product:Product) : Observable<Object>{ 
      return this.httpClient.put<Product>("/server/GestionProd/update/",product,optionRequete);

    } 
    deleteProduct(idProduct: number): Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/delete/${idProduct}`);
    }
    getProductsByCategory(id:number|undefined): Observable<Product[]>{
      return this.httpClient.get<Product[]>(`/server/GestionProd/productsByCategory/${id}`);
    }
  }

  