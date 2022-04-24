import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EmployersService  } from '../services/employers.service';
import { EmployeeModel } from '../models/employers.model';

@Component({
  selector: 'app-employers',
  templateUrl: './employee.details.component.html',
  styleUrls: ['./employers.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(  
    public service_employers: EmployersService,
    private route: ActivatedRoute
    ) { }

  public emploeeId:number = 0

  public employee:EmployeeModel = {} as EmployeeModel

  public export(){
    alert("Export to api will be soom :)")
  }

  public getEmployeee(){
   this.service_employers.GetEmployee(this.emploeeId)
   .subscribe(resp => {
      this.employee = resp
   });
  }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id')
    if(id!=null){
     this.emploeeId =  Number(id)
    }
    this.getEmployeee()
  }

}
