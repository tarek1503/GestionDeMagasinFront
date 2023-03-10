import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './client';
const optionRequete = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
  })
};
@Injectable({
  providedIn: 'root'
})
export class ClientService {


  private baseURL = "/server/client"

  constructor(private httpClient: HttpClient) { }

  getClientsList(): Observable<Client[]>{
    return this.httpClient.get<Client[]>("/server/client/clients");
  }

  CreateClient(client:Client) : Observable<Object>{
    return this.httpClient.post<Client>("/server/client/addClient",client);
    }

    PutClient(client:Client) : Observable<Object>{ 
      return this.httpClient.put<Client>("/server/client/update/",client,optionRequete);

    } 
    deleteClient(idClient: number): Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/delete/${idClient}`);
    }
    importClients() : Observable<Object>{
      return this.httpClient.post<any>("/server/jobs/importClients",null);
      }

}
