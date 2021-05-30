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
  // MOCK DATA
  private url = 'http://jsonplaceholder.typicode.com/posts';
  private BOOK_ADD_URL = environment.API_URL + '/books/';
  private BOOK_SEARCH_URL = this.BOOK_ADD_URL+'search';
  constructor(private http: HttpClient) { }

  private bookSelectedSubject = new BehaviorSubject<number>(1);
  bookSelectedAction$ = this.bookSelectedSubject.asObservable();

  // TO DO !!! change any[] -> Book[] but only when we connect to our api since this mock api does not have 'description' property
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

        // Mock service
  private singleBookSubject = new BehaviorSubject<Book>({book_id: 3,  title:"the book title", author: "john smith",genre:"awesome",qrcode:"qr"});
  singleBook$ = this.singleBookSubject.asObservable();

  selectedBookChanged(selectedBookId: number):void {
    console.log('Book id: ' + selectedBookId)
    this.bookSelectedSubject.next(selectedBookId);
  }

  searchBook(query: string): Observable<Book[]>{
    return this.http.get<Book[]>(this.BOOK_SEARCH_URL,{params:{query}});
  }



  addBook(book: any):Observable<any>{
    return this.http.post<Book>(this.BOOK_ADD_URL,book);
  }
  
}
