import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError, timer } from 'rxjs';
import {catchError,map,retry, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  
  private jsonUrl = '/assets/testdata.json';


  constructor(private http: HttpClient ) { }

  getJsonData(): Observable<any[]> {
    return this.http.get<string[]>(this.jsonUrl)
   
    
  }
}
