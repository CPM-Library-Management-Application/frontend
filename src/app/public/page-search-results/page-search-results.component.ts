import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-search-results',
  templateUrl: './page-search-results.component.html',
  styleUrls: ['./page-search-results.component.css']
})
export class PageSearchResultsComponent implements OnInit {

  selectedBook:any = null;

  constructor() { }

  ngOnInit(): void {
  }

  selectedBookEvent(book:any){
    this.selectedBook = book;
  }

}
