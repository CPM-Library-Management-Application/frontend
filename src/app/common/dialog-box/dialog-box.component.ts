import { Component, Input, OnInit } from '@angular/core';
import { DialogConfig } from 'src/app/models/dialog-config';
import { DialogService } from 'src/app/services/dialog-service.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  @Input() message: string = "";
  @Input() isSuccess: boolean = false;
  @Input() display: boolean = true;
  @Input() config!: DialogConfig;
  

  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  closeButtonHandler(){
    this.dialogService.hideDialog();
  }
  printButtonHandler(){
    window.open(this.config.qrCodeUrl, '_blank');
  }

}
