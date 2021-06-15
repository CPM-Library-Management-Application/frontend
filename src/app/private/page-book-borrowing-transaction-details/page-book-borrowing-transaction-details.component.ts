import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-page-book-borrowing-transaction-details',
  templateUrl: './page-book-borrowing-transaction-details.component.html',
  styleUrls: ['./page-book-borrowing-transaction-details.component.css']
})
export class PageBookBorrowingTransactionDetailsComponent implements OnInit {
bookInfo: any;
  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.bookService.getBookInfo(this.activatedRoute.snapshot.params['transactionId']).subscribe((book)=>{
      this.bookInfo = book;
    });

  }

}
