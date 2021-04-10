import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  //MOCK DATA
  private url = 'http://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) { }

  getBooks(){
    return this.http.get(this.url);
  }
}
