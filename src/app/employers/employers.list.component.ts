import { Component, OnInit } from '@angular/core';

import { EmployersService  } from '../services/employers.service';
import { EmployeeModel } from '../models/employers.model';

@Component({
  selector: 'app-employers',
  templateUrl: './employers.list.component.html',
  styleUrls: ['./employers.component.css']
})
export class EmployersListComponent implements OnInit {

  constructor(public service: EmployersService) { }

  public employers_list:Array<EmployeeModel> = []

    public get(){
     this.service.GetEmployers()
     .subscribe(resp =>{ 
      console.log(resp);
      this.employers_list = resp
    });
      
    }

  ngOnInit(): void {
    this.get()
  }

}
