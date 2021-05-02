import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, OnDestroy, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, EMPTY, Observable, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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
  @Output("book-selected") bookSelected = new EventEmitter<any>();
  selectedBook$ = this.bookService.selectedBook$;
  books$ = this.bookService.books$;

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) {  }

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

  ngOnDestroy(): void {
  }

  selectBook(book:any){
    console.log(book);
    // this.selectedBook = book;
    this.bookService.selectedBookChanged(book.id);
    this.router.navigate(['search-results',book.id]);
    // this.bookSelected.emit(this.selectedBook);
  }

}
