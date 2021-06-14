import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-page-user-panel',
  templateUrl: './page-user-panel.component.html',
  styleUrls: ['./page-user-panel.component.css']
})
export class PageUserPanelComponent implements OnInit {

  userBooks:string[] = ["Great Gastby","Oliver Twist", "Romeo and Juliet","Zero to One","Crazy is a Compliment"]

  constructor(private loginService: LoginService) { }
  qrCodeUrl: any;

  ngOnInit(): void {
    this.loginService.getUserInfo().subscribe((value) => {
      this.qrCodeUrl = `http://localhost/api/media/user_qrcodes/qrcode${value.id}.png`
    } )
  }

}
