import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog-service.service';

@Component({
  selector: 'page-app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class PageBookAddComponent implements OnInit {

  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  addBookButtonHandler(){
    this.dialogService.displayDialog({display: true, message: "Print the QR-Code and stick it onto the book.", isSuccess: true});
  }
}
