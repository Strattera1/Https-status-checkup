import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable,  catchError,  map, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UrlService {
    
    private htttpOptions: any
    constructor (private http: HttpClient) {}
    
    
    getHttpStatus(url: string): Observable<number> {
        return this.http.get(url, { observe: 'response' }).pipe(
         map((response) => response.status)
        );
    }

    updatedHttpStatusCheck(item: any): Observable<number> {
        return this.http.get(item.url, { observe: 'response'})
        .pipe (
            map((response: any) => {
                item.status = response.status;
                item.updated= new Date();
                return item;
            }),
            catchError((error) => {
                if (error.status > 0) {
                    item.status = error.status;
                    item.updated = new Date();
                }
                return throwError(error);
            })
        );
    }
    
    setHTTPOptions() {
        this.htttpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
    }
}

