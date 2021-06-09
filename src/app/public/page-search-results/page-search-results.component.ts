import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-page-search-results',
  templateUrl: './page-search-results.component.html',
  styleUrls: ['./page-search-results.component.css']
})
export class PageSearchResultsComponent implements OnInit {

  searchTerm$ = this.bookService.searchTerm$;
  isLoggedIn: boolean;
  constructor(private bookService: BookService) { 
    if(localStorage.getItem('loginState')){
      this.isLoggedIn = true;
    }else{
      this.isLoggedIn = false;
    }
    console.log(this.isLoggedIn);
  }

  ngOnInit(): void {
  }

  selectedBookEvent(book:any){
 
  }
  handleKeyUpInput(event: KeyboardEvent){
    const target = event.target as HTMLInputElement;
    this.searchTerm$.next(target.value);
  }

}
