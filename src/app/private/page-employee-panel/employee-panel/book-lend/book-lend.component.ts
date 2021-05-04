import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { DialogService } from 'src/app/services/dialog-service.service';
import { SpinnerService } from 'src/app/services/spinner-service.service';


@Component({
  selector: 'page-app-book-lend',
  templateUrl: './book-lend.component.html',
  styleUrls: ['./book-lend.component.css']
})
export class PageBookLendComponent implements OnInit {

  @ViewChild('scanner', { static: false })
  scanner!: ZXingScannerComponent;
  currentDevice! :any;
  valueRead! :any;
  isEnabled: boolean = true;
  camerasFound: boolean = true;

  constructor(
    private dialogService: DialogService,
    private spinnerService: SpinnerService,
    private bookService: BookService
    ) { }

  ngOnInit(): void {
   
  }
  camerasFoundHandler($event: any){
    console.log($event);
    this.currentDevice = $event[0];
  }
  camerasNotFoundHandler(){
    this.camerasFound = false;
    //Timeout just not to blast an error at the user's face immediately
    setTimeout(() => {
      this.dialogService.displayDialog({message: "No cameras found or your browser is blocking the function.", isSuccess: false, display: true});
    }, 1000);
  }
  scanSuccessHandler($event: any){
    console.log($event);
    this.valueRead = $event
    this.spinnerService.displaySpinner();
    //hardcoded mock id
    this.bookService.selectedBookChanged(5);
    this.spinnerService.hideSpinner();
  }
  handleBackButton(){
    this.isEnabled = false;
  }
  //The library for qr code reading is in unstable build and 
  //sometimes fails to deallocate resources (camera) so we
  //force it to stop once page is unloaded.
  @HostListener('unloaded')
  ngOnDestroy() {
    console.log('Items destroyed');
  }

}
