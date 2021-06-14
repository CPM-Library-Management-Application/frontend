import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { DialogService } from 'src/app/services/dialog-service.service';
import { SpinnerService } from 'src/app/services/spinner-service.service';

enum LEND_PROCESS_STAGE {
  readBookCode,
  readUserCode
}

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
  bookInfoFromQrCode: any;
  userInfoFromQrCode: any;
  leaseExpirationDate: any;
  currentStage: number;
  isLendComponent!: boolean;

  constructor(
    private dialogService: DialogService,
    private spinnerService: SpinnerService,
    private bookService: BookService,
    private route: ActivatedRoute
    ) {
      this.currentStage = LEND_PROCESS_STAGE.readBookCode;
     }

  ngOnInit(): void {
    this.isLendComponent = this.route.snapshot.data['isLend'];
    console.log('islend: ' + this.isLendComponent);
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
    // this.bookService.selectedBookChanged(5);
    this.bookService.getBookInfo($event).subscribe((value) => {
      if(this.currentStage === LEND_PROCESS_STAGE.readBookCode){
        this.bookInfoFromQrCode = value;
      }
      this.spinnerService.hideSpinner();
    })
    if(this.currentStage === LEND_PROCESS_STAGE.readUserCode){
      this.userInfoFromQrCode = $event;
    }
  }
  handleBackButton(){
    this.isEnabled = false;
  }
  handleProceedButtonClick(){
    this.spinnerService.displaySpinner();
    if(this.currentStage === LEND_PROCESS_STAGE.readBookCode){
      this.currentStage = LEND_PROCESS_STAGE.readUserCode;
      this.spinnerService.hideSpinner();
    }else if (this.currentStage === LEND_PROCESS_STAGE.readUserCode){
      if(this.isLendComponent){
        this.bookService.leaseBook(this.bookInfoFromQrCode).subscribe((value) => {
          console.log(value);
          this.spinnerService.hideSpinner();
          this.dialogService.displayDialog({message: 'Operation successfull. Lease Exipres on:' + value.lease_expiration_date,isSuccess: true, display: true})
          this.bookInfoFromQrCode = null;
          this.userInfoFromQrCode = null;
          this.currentStage = LEND_PROCESS_STAGE.readBookCode;
          this.leaseExpirationDate = null;
        })
      }else{
        this.bookService.returnBook(this.bookInfoFromQrCode).subscribe((value) => {
          console.log(value);
          this.spinnerService.hideSpinner();
          this.dialogService.displayDialog({message: 'Operation successfull',isSuccess: true, display: true})
          this.bookInfoFromQrCode = null;
          this.userInfoFromQrCode = null;
          this.currentStage = LEND_PROCESS_STAGE.readBookCode;
          this.leaseExpirationDate = null;
        })
      }

    }
    
  }

  //The library for qr code reading is in unstable build and 
  //sometimes fails to deallocate resources (camera) so we
  //force it to stop once page is unloaded.
  @HostListener('unloaded')
  ngOnDestroy() {
    console.log('Items destroyed');
  }

}
