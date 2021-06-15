import { Employee } from './employee.model';
import { Injectable, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap }  from '@angular/router';
import { LibraryService } from './../libraries/library.service';


//@Injectable({
 // providedIn: 'root'
//})

//@Component({
 // selector: 'app-editemployee',
 // templateUrl: './edit-employee.component.html',
 // styleUrls: ['./edit-employee.component.css']
//})


 //export class EditEmployeeComponent implements OnInit {
// employee: Employee;


//ngOnInit() {
//}

// constructor (private libraryService: LibraryService,
//  private router: Router,
//  private http: HttpClient,
//    private route: ActivatedRoute) {
//    const employeeID = Number(this.route.snapshot.paramMap.get('id'));
  //  this.employee = libraryService.getEmployee(employeeID)[0];
 // }

//  saveEmployee(): void {
 //   const data = {
 //     Username: this.employee.Username,
 //     Password: this.employee.Password,
 //     Email: this.employee.Email,
 //     ID: this.employee.ID,
 //     Rights: this.employee.Rights,
 //     LibraryID: this.employee.LibraryID
 //   };
   
//}
//}
