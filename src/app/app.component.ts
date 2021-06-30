import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Employee} from './employee';
import { EmployeeService } from './employee.service';
@Component({
  selector: 'app-root',

  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.css'


})
export class AppComponent implements  OnInit {
  title = 'app project is completed';
  public employees:Employee[];

  constructor(private employeeService:EmployeeService){}
ngOnInit(){
  this.getEmployees();
}
  public getEmployees():void{
    this.employeeService.getEmployees().subscribe(
      (response:Employee[])=>{
         this.employees=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }
  public onAddEmployee(addForm:NgForm):void{
       this.employeeService.addEmployee(addForm.value).subscribe(
        (response:Employee)=>{
          this.employeeService.getEmployees().subscribe(
            (response:Employee[])=>{
              console.log(response);
              this.getEmployees();
            })
        },
        (error:HttpErrorResponse)=>{
          alert(error.message);

        }
       );
  }
  public onOpenModal(employee:Employee,mode:string):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode ==='add'){
      button.setAttribute('data-bs-target', '#addEmployeeModal');
    }
    if(mode ==='edit'){
      button.setAttribute('data-bs-target', '#editEmployeeModal');
    }
    if(mode ==='delete'){
      button.setAttribute('data-bs-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }
}

