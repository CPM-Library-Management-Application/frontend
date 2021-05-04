import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-page-search-results',
  templateUrl: './page-search-results.component.html',
  styleUrls: ['./page-search-results.component.css']
})
export class PageSearchResultsComponent implements OnInit {



  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }

  selectedBookEvent(book:any){
 
  }

}
