import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';


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

  constructor() { }

  ngOnInit(): void {
   
  }
  camerasFoundHandler($event: any){
    console.log($event);
    this.currentDevice = $event[0];
  }
  scanSuccessHandler($event: any){
    console.log($event);
    this.valueRead = $event;
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
