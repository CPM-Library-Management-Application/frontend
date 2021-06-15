import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-page-user-panel',
  templateUrl: './page-user-panel.component.html',
  styleUrls: ['./page-user-panel.component.css']
})
export class PageUserPanelComponent implements OnInit {

  userBooks: any[] = [];

  constructor(private loginService: LoginService, private bookService: BookService) { }
  qrCodeUrl: any;


  ngOnInit(): void {
    this.loginService.getUserInfo().subscribe((value) => {
      this.qrCodeUrl = `http://localhost/api/media/user_qrcodes/qrcode${value.id}.png`;
    });

    const userData = JSON.parse(localStorage.getItem('user_data') || '');

    if (userData != null){
      const id = (JSON.parse(atob(userData.jwt.split('.')[1]))).id;
      this.bookService.viewUserBook(id).subscribe((books) => {
        this.userBooks = books;
      });
    }

  }

}
