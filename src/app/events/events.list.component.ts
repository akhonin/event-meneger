import { Component, OnInit } from '@angular/core';

import { EventsService  } from '../services/events.service';
import { EventModel } from '../models/events.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.list.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsListComponent implements OnInit {

constructor(public service: EventsService) {  }

public events_list:Array<EventModel> = []

  public get(){
   this.service.GetEvents()
   .subscribe(resp => this.events_list = resp);
    
  }

  ngOnInit(): void {
    this.get()
  }

}
