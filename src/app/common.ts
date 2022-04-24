import { Injectable, OnInit } from '@angular/core';

@Injectable({
    providedIn:  'root'
})

export class Common{
     public api = {
        events: {
            getEvents: 'events.json'
        },

        employers: {
            getEmployers: 'employers.json'
        }

     }
 }