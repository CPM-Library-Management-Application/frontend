import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { EMPTY, Observable, ObservableInput } from 'rxjs';
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
  @Input() hideReserveButton: boolean = false;
  @Input() bookObservable!: number;

  selectedBook$ = this.bookService.bookSelectedFullDataAction$
    .pipe(
      catchError(err => {
        return EMPTY;
      })
    )
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }

}
