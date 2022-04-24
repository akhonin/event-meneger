import { Injectable } from  '@angular/core';
import { BaseService  } from './base.service';
import { Common  } from '../common';
import { EventModel } from '../models/events.model';
import { Observable, throwError, of } from 'rxjs';
import { map,find } from 'rxjs/operators';

@Injectable({
    providedIn:  'root'
})

export class EventsService{
   constructor(public  apiService:BaseService, public common:Common) {}

   GetEvents(): Observable<EventModel[]> {
        return new Observable<EventModel[]>((observer) => {
           this.apiService
                .methodGet(this.common.api.events.getEvents)
                .subscribe(resp => {
                    observer.next(resp as EventModel[])
                })  
            }).pipe(
                map((events) => {
                       events.map(event =>{
                            event.status = this.checkDateEntrance(event.startDate,event.endDate)
                            return event
                        })

                    return events;
                })
            )
    }


   GetEvent(id:any): Observable<EventModel> {
           return new Observable<EventModel>((observer) => {
           this.apiService
                .methodGet(this.common.api.events.getEvents)
                .subscribe(resp => {
                    var events = resp as EventModel[]
                    observer.next(events.find(event => event.id ==id))
                })  
            }).pipe(
                map((event) => {
                    event.status = this.checkDateEntrance(event.startDate,event.endDate)
                    return event;
                })
            )
    }

    checkDateEntrance(start:string, end:string):string {
      var date = new Date();
      if (date >= new Date(start) && date <= new Date(end)){
        return "Started"
      }
      else if(date > new Date(end)){
         return "End"
      }else{
         return "Coming"
      }   
    }

}