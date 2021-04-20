import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent implements OnInit {
  @Input("book") book:any = null;

  selectedBook$ = this.bookService.selectedBook$
    .pipe(
      catchError(err => {
        return EMPTY;
      })
    )
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }

}
