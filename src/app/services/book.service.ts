import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject, throwError } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // MOCK DATA
  private BOOK_GET_ALL_URL = environment.API_URL + '/books/getall/';
  private BOOK_ADD_URL = environment.API_URL + '/books/';
  private BOOK_SEARCH_URL = environment.API_URL + '/books/search';
  private BOOK_RESERVE_URL = environment.API_URL + '/books';
  private BOOK_GET_INFO_URL = environment.API_URL + '/books/';
  private BOOK_GET_USER_BOOKS_URL = environment.API_URL + '/books/user/';


  constructor(private http: HttpClient) { }
  
  public searchResults: any;

  results!: BookResult[];

  private bookSelectedSubject = new BehaviorSubject<number>(0);
  bookSelectedAction$ = this.bookSelectedSubject.asObservable();

  private bookSelectedFullDataSubject = new Subject<BookResult>()
  bookSelectedFullDataAction$ = this.bookSelectedFullDataSubject.asObservable();

  // TO DO !!! change any[] -> Book[] but only when we connect to our api since this mock api does not have 'description' property
  books$ = this.http.get<any[]>(this.BOOK_GET_ALL_URL)
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
          books.find((book: any) => book.id == selectedBookId)),
        tap(book => console.log('selected book: ', book))
      );

        // Mock service
  private singleBookSubject = new BehaviorSubject<Book>({book_id: 3,  title:"the book title", author: "john smith",genre:"awesome",qrcode:"qr", library_id: null});
  singleBook$ = this.singleBookSubject.asObservable();

  selectedBookChanged(bookId:number):void {
    console.log('Book id: ' + bookId)
    this.bookSelectedSubject.next(bookId);
  }
  selectedBookChangedData(book: BookResult):void {
    console.log(book);
    this.bookSelectedFullDataSubject.next(book);
  }

  viewUserBook(userId: string): Observable<any[]> {
    return this.http.get<any[]>(this.BOOK_GET_USER_BOOKS_URL + userId);
  }

  searchBook(query: string): Observable<any[]>{
    return this.http.get<any[]>(this.BOOK_SEARCH_URL,{params:{query}})
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      map(books => {
        console.log(books);
        return this.searchResults = books;
      }
    ));
  }

  addBook(book: any):Observable<any>{
    let bookToAdd = {...book, current_owner_id: 1};
    return this.http.post<Book>(this.BOOK_ADD_URL,bookToAdd);
  }
  
  reserveBook(book:any, user: any):Observable<any>{
    let payload = {
      user: user
    }
    return this.http.post<any>(this.BOOK_RESERVE_URL + '/' + book.book_id + '/reserve',payload);
  }

  getBookInfo(id: number):Observable<any>{
    return this.http.get<any>(this.BOOK_GET_INFO_URL + id);
  }

  leaseBook(book:any):Observable<any>{
    return this.http.post<any>(this.BOOK_RESERVE_URL + '/' + book.book_id + '/lease',{});
  }

  returnBook(book:any):Observable<any>{
    return this.http.post<any>(this.BOOK_RESERVE_URL + '/' + book.book_id + '/return', {}); 
  }
  
//===== TEST
  
  searchTerm$ = new BehaviorSubject<string>('');

  search(terms: Observable<string>) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term))
    )
  }
  searchEntries(query: any){
    return this.http.get<any>(this.BOOK_SEARCH_URL,{params:{query}})
      .pipe(
        tap(res => console.log(JSON.stringify(res)))
      )
  }


}

export interface BookResult{
  book_id: number;
  author: string;
  title: string;
  genre: string;
  lease_expiration_date: string;
  current_owner: string;
  qrcode: string;
  library_id: any;
}
