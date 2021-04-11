import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {
  posts: any;
  selectedBook: any = "";
  @Output("book-selected") bookSelected = new EventEmitter<any>();

  constructor(private bookService: BookService) {  }

  ngOnInit(): void {
    this.bookService.getBooks()
      .subscribe(response => {
        this.posts = response;
      }, (error: Response) => {
        if(error.status === 404){
          alert('Error 404!')
        }else{
          alert('An unexpected error occurred');
        }
      });
  }

  selectBook(book:any){
    this.selectedBook = book;
    this.bookSelected.emit(this.selectedBook);
  }

}
