import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './category';
const optionRequete = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
  })
};


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseURL = "/server/category"

  constructor(private httpClient: HttpClient) { }

  getCategoriesList(): Observable<Category[]>{
    return this.httpClient.get<Category[]>("/server/category/all-categories");
  }

  CreateCategory(category:Category) : Observable<Object>{
    return this.httpClient.post<Category>("/server/category",category);
    }

    PutCategory(category:Category,idCategory:number) : Observable<Object>{ 
      return this.httpClient.put<Category>(`${this.baseURL}/update/${idCategory}`,category);

    } 
    deleteCategory(idCategory: number): Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/delete/${idCategory}`);
    }
  }

