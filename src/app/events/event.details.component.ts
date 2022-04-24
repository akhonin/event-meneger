import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

import { EventsService  } from '../services/events.service';
import { EmployersService  } from '../services/employers.service';
import { EventModel } from '../models/events.model';
import { EmployeeModel } from '../models/employers.model';

@Component({
  selector: 'app-events',
  templateUrl: './event.details.component.html',
  styleUrls: ['./events.component.css']
})
export class EventDetailsComponent implements OnInit {

closeResult = '';

constructor(
  public service_event: EventsService,
  public service_employers: EmployersService,
  private route: ActivatedRoute,
  private modalService: NgbModal
  ) {  }

 public eventid:number = 0
 public event:EventModel = {} as EventModel
 public enployersFree: EmployeeModel[] = []
 public enployersOnEvent: EmployeeModel[] = []
 public eventJobs: any[] = []

 public getEvent(){
   this.service_event.GetEvent(this.eventid) 
   .subscribe(resp => {
    console.log(resp)
      this.event = resp
      this.eventJobs = resp.jobs
      this.getEmployers()
   });
 }

 public getEmployers(){
   this.service_employers.GetEmployers()
   .subscribe(resp => {
      console.log(resp)
      this.sortEmployers(resp)
   });
 }

 sortEmployers(employers:EmployeeModel[]){
  this.enployersOnEvent = []
  this.enployersFree = []
    for(var i in employers){
      if(employers[i].eventId==this.eventid){
        this.enployersOnEvent.push(employers[i])
      }else{
        this.enployersFree.push(employers[i])
      }
    }
 }
  saveEmploee(employee:EmployeeModel){
   this.service_employers.SaveEmployee(employee)
     .subscribe(resp => {
      this.sortEmployers(resp)
     });
  }

  startTimer(employee:EmployeeModel){
    if(!employee.curentJobId){
      alert("First select Jib!")
    }else{
      employee.curentJobStart =  moment(new Date()).format('YYYY-MM-DD:HH:mm:ss');
      this.saveEmploee(employee)
    }
  }

  stopTimer(employee:EmployeeModel){
    var job = {
      "eventId"  :this.eventid,
      "eventName":this.event.name,
      "jobId": employee.curentJobId,
      "jobName": null,
      "start": employee.curentJobStart,
      "end" :moment(new Date()).format('YYYY-MM-DD:HH:mm:ss')
    }
    job.jobName =  this.eventJobs.find(function(value, index, arr){
        return value.id== employee.curentJobId
    }).name
    employee.curentJobStart = null
    employee.jobs.push(job)
    this.saveEmploee(employee)
  }

  addEmployee(employee:EmployeeModel){
/*    this.enployersFree = this.enployersFree.filter(function(value, index, arr){
        return value.id!= employee.id
    })*/
    employee.eventId = this.eventid
    employee.eventName = this.event.name
    this.saveEmploee(employee)
  }

  deleteEmployee(employee:EmployeeModel){
    employee.eventId = 0
    employee.eventName = null
    this.saveEmploee(employee)
  }

  selectedJob(employee:EmployeeModel,job:any){
    employee.curentJobId = job.value
    this.saveEmploee(employee)
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.addEmployee(result)
    }, (reason) => {

    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id')
    if(id!=null){
     this.eventid =  Number(id)
    }
    this.getEvent()
  }
}
