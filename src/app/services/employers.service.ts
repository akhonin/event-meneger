import { Injectable } from  '@angular/core';
import { BaseService  } from './base.service';
import { Common  } from '../common';
import { EmployeeModel } from '../models/employers.model';
import { Observable, throwError, of } from 'rxjs';
import { map,find } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
    providedIn:  'root'
})

export class EmployersService{
   constructor(public  apiService:BaseService, public common:Common) {}

   GetEmployers(): Observable<EmployeeModel[]> {
        return new Observable<EmployeeModel[]>((observer) => {
           this.apiService
                .methodGet(this.common.api.employers.getEmployers)
                .subscribe(resp => {
                    observer.next(resp as EmployeeModel[])
                })  
            })
    }


   GetEmployee(id:any): Observable<EmployeeModel> {
           return new Observable<EmployeeModel>((observer) => {
           this.apiService
                .methodGet(this.common.api.employers.getEmployers)
                .subscribe(resp => {
                    var events = resp as EmployeeModel[]
                    observer.next(events.find(event => event.id ==id))
                })  
            }).pipe(
                map(resp =>{
                    var sumTime = moment.duration('00:00:00')
                    resp.jobs.map(j=>{
                        j.workTime = moment.utc(moment(j.end,"yyyy-MM-dd:HH:mm:ss").diff(moment(j.start,"yyyy-MM-dd:HH:mm:ss"))).format("HH:mm:ss")
                        sumTime.add(moment.duration(j.workTime))
                        return j
                    })
                    console.log(resp)
                    resp.fullJobTime = moment.utc(sumTime.as('milliseconds')).format("HH:mm:ss") 
                    return resp
                })
            )
    }

    SaveEmployee(employee:EmployeeModel): Observable<EmployeeModel[]> {
           return new Observable<EmployeeModel[]>((observer) => {
            this.apiService
                .methodPost(this.common.api.employers.getEmployers,employee)
                .subscribe(resp => {
                    observer.next(resp as EmployeeModel[])
                })  
            })
    }

}