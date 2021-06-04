import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-result-list-withsearch',
  templateUrl: './result-list-withsearch.component.html',
  styleUrls: ['./result-list-withsearch.component.css']
})
export class ResultListWithsearchComponent implements OnInit {
  results = this.bookService.results;
  searchTerm$ = this.bookService.searchTerm$;
  selectedBook$ = this.bookService.bookSelectedAction$;

  constructor(private bookService: BookService, private router: Router) { 
    this.bookService.search(this.searchTerm$)
      .subscribe(results => {
        console.log(results);
        this.results = results;
      })
   }
  handleKeyUp(event: KeyboardEvent){
    // const target = event.target as HTMLInputElement;
    // this.searchTerm$.next(target.value);
  }

  ngOnInit(): void {
  }

  selectBook(book:any){
    console.log(book);
    // this.selectedBook = book;
    this.bookService.selectedBookChanged(book.book_id);
    this.bookService.selectedBookChangedData(book);
    this.router.navigate(['search-results',book.book_id]);
    // this.bookSelected.emit(this.selectedBook);
  }
}
