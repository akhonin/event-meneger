import { Injectable } from  '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest} from  '@angular/common/http';
import { catchError,map } from 'rxjs/operators';

@Injectable({
    providedIn:  'root'
})

export class  BaseService {
      
    constructor(public  http:  HttpClient) {}

     methodGet(api:any): Observable<any> {
        return new Observable<any>((observer) => {
            var date = localStorage.getItem(api)
            if(date){
                observer.next(JSON.parse(date))
            }else{
                this.http.get<any[]>("/assets/data/"+api).pipe(
                            catchError(err => {
                                return err;
                            })
                        ).subscribe(resp => {
                            localStorage.setItem(api, JSON.stringify(resp));
                            observer.next(resp)
                        })
            }
        })
     }

      methodPost(api:any,params:any): Observable<any> {
        console.log(params)
        return new Observable<any[]>((observer) => {
            var localItem:any = localStorage.getItem(api)
            if(localItem!=null){
                var data = JSON.parse(localItem)
                for(var i in data){
                    if(data[i].id==params.id){
                       data[i] = params
                    }
                }
                observer.next(data)
                console.log(data)
                localStorage.setItem(api, JSON.stringify(data));
            }
        })
     }
}