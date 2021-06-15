import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Observable, ObservableInput } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BookService } from 'src/app/services/book.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  @Input("book") book:any = null;
  @Input() hideReserveButton: boolean = false;
  @Input() bookObservable!: number;
  
  subscritpion: any;
  reserveBookSubscription: any;
  displayReserveButtonDisabledInfo: boolean = false;

  selectedBook$ = this.bookService.bookSelectedFullDataAction$
    .pipe(
      catchError(err => {
        return EMPTY;
      })
    )

  constructor(private bookService: BookService, private loginService: LoginService) { }
  
  ngOnDestroy(): void {
    // this.subscritpion.unsubscribe();
    // this.reserveBookSubscription.unsubscribe();
  }

  ngOnInit(): void {
  }
  
  handleReserveButtonClick(book: any){
    console.log(book);
    this.subscritpion = this.loginService.getUserInfo().subscribe((value) => {
      this.reserveBookSubscription = this.bookService.reserveBook(book, value).subscribe((value) => {console.log(value)})
    });
    
  }

  handleReserveButtonMouse(){
    this.displayReserveButtonDisabledInfo = true;
  }
  handleReserveButtonMouseLeave(){
    this.displayReserveButtonDisabledInfo = false;
  }
}
