import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  //MOCK DATA
  private url = 'http://jsonplaceholder.typicode.com/posts';
  private BOOK_ADD_URL = environment.API_URL + '/books/';
  constructor(private http: HttpClient) { }

  private bookSelectedSubject = new BehaviorSubject<number>(1);
  bookSelectedAction$ = this.bookSelectedSubject.asObservable();

  //TO DO !!! change any[] -> Book[] but only when we connect to our api since this mock api does not have 'description' property
  books$ = this.http.get<any[]>(this.url)
    .pipe(
      // tap(data => console.log(JSON.stringify(data))),
      map(books => 
        books.map(book => ({
          ...book,
          description: book.body
        })))
    );
  selectedBook$ = combineLatest([
      this.books$,
      this.bookSelectedAction$
  ]) .pipe(
        map(([books, selectedBookId])=>
          books.find(book => book.id == selectedBookId)),
        tap(book => console.log('selected book: ', book))
      );
  selectedBookChanged(selectedBookId: number):void {
    console.log('Book id: ' + selectedBookId)
    this.bookSelectedSubject.next(selectedBookId);
  }
  //Mock service
  private singleBookSubject = new BehaviorSubject<Book>({id: 3, description: "some description", title:"the book title", author: "john smith", libraryId: "22"});
  singleBook$ = this.singleBookSubject.asObservable();

  addBook(book: any):Observable<any>{
    return this.http.post<Book>(this.BOOK_ADD_URL,book);
  }
  
}
