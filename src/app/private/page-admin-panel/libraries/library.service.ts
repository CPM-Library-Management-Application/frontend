import { Employee } from './../employees/employee.model';
import { Library } from './library.model'
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class LibraryService {
  private libraries = [new Library('Library1','Wroclaw',1), new Library('Library2','Warszawa',2)];
  private employees = [new Employee('John Doe','Doe','john@gmail.com',345,1,2), new Employee('Tadeusz Norek','Norek','tadeusz@gmail.com',453,1,1)];
    
  getLibraries() {
        return this.libraries;
    }

    getEmployees(libraryID: number)  {
      return this.employees.filter
     (employee => 
      employee.LibraryID === libraryID);
    }

    getEmployee(employeeID: number)  {
      return this.employees.filter
      (employee =>
      employee.ID ===  employeeID);
    }

    addLibrary(name:string, location:string, id:number) {
        this.libraries.push(new Library(name, location, id));
      }
    delete(id: number) {
        this.libraries.forEach((element, i)=>{
            if(element.ID ==id) {
              this.libraries.splice(i,1);
            }
        });
      }
    addEmployee(Username:string, Password:string, Email:string, ID:number, Rights:number, LibraryID:number) {
          this.employees.push(new Employee(Username, Password, Email, ID, Rights, LibraryID));
        }
}
