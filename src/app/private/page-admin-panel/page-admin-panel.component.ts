import { Employee } from './employees/employee.model';
import { LibraryService } from './libraries/library.service';
import { Library } from './libraries/library.model';
import { Component, OnInit, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-page-admin-panel',
  templateUrl: './page-admin-panel.component.html',
  styleUrls: ['./page-admin-panel.component.css']
})

export class PageAdminPanelComponent implements OnInit {
  libraries: Library[];
  libraryName: string;
  libraryLocation: string;
  libraryID: number;
  currentLibraryIndex = -1;
  currentEmployeeIndex = -1;
  currentLibraryID: number;
  employees: Employee[];
  employeeUsername: string;
  employeePassword: string;
  employeeEmail: string;
  employeeID: number;
  employeeRights: number;
  currentEmployeeID: number;
  selectedEmployee: Employee;
  

  constructor (private libraryService: LibraryService){
    this.libraries=this.libraryService.getLibraries();
    this.libraryName = '';
    this.libraryLocation = '';
    this.libraryID = 0;
    this.currentLibraryID = 0;
    this.employees=[];
    this.employeeUsername = '';
    this.employeePassword = '';
    this.employeeEmail = '';
    this.employeeID = 0;
    this.employeeRights = 0;
    this.currentEmployeeID = 0;
    this.selectedEmployee = new Employee('','','',0,1,0);
  
  }

   setActiveLibrary(library: Library, index: number): void {
    this.currentLibraryID = library.ID;
    this.currentLibraryIndex = index;
    this.employees = this.libraryService.getEmployees(library.ID);
    this.currentEmployeeID = 0;
    this.currentEmployeeIndex = -1;
  }

   setActiveEmployee(employee: Employee, index: number): void {
     this.currentEmployeeID = employee.ID;
     this.currentEmployeeIndex = index;
     this.selectedEmployee = this.libraryService.getEmployee(employee.ID)[0];
   }
   

   addLibrary() : void {
      this.libraryService.addLibrary(this.libraryName, this.libraryLocation, this.libraryID);
   }

   addEmployee() : void {
    this.libraryService.addEmployee(this.employeeUsername, this.employeePassword, this.employeeEmail, this.employeeID, this.employeeRights, this.libraryID);
 }

  deleteLibrary(): void {
  this.libraryService.delete(this.currentLibraryID);
   }

   deleteEmployee(): void {
    this.libraryService.delete(this.currentEmployeeID);
   }
  ngOnInit(): void  {}
  getEmployee(id: string): void {}
  getLibrary(id: string): void {} 
}

   