import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, OnDestroy, ChangeDetectionStrategy, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, EMPTY, Observable, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultListComponent implements OnInit {
  // selectedBook: any = "";
  @Input() displayShowMore = false;
  @Output('book-selected') bookSelected = new EventEmitter<any>();
  selectedBook$ = this.bookService.selectedBook$;
  books$ = this.bookService.books$;
  // searchResults: Observable<any>;
  searchResults$ = this.bookService.searchBook('');

  results: Object | undefined;
  searchTerm$ = new Subject<string>();




  @Input("book-query") set bookQuery(value: string){
    if(value.trim() == '' || value == null || value == undefined){
      return;
    }
    console.log(value)
    // this.bookService.searchBook(value).subscribe((books)=> {this.searchResults = books});
    // this.bookService.searchBook(value).subscribe();
  }

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) { 

   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        const id = parseInt(params.get('id')!);
        if(id > 0){
          this.bookService.selectedBookChanged(id);
        }
      }
    );
  }
  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
  }
  ngOnDestroy(): void {
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
