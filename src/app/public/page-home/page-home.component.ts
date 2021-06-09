import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {
  searchTerm$ = this.bookService.searchTerm$;

  searchTxt = '';

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.searchTerm$.next('');
  }

  handleOnKeyUpInput(event: KeyboardEvent){
    const target = event.target as HTMLInputElement;
    console.log(target.value);
    this.searchTerm$.next(target.value);
  }
}
