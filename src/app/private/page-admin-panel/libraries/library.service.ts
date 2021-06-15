import { Library } from './library.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LibraryService {
  private LIBRARY_GET_ALL_URL = environment.API_URL + '/library/';
  private LIBRARY_ADD_URL = environment.API_URL + '/library/';
  private LIBRARY_GET_BOOKS_URL = environment.API_URL + '/library/';
  constructor(private http: HttpClient) { }

  getLibraries():Observable<any[]> {
    return this.http.get<any[]>(this.LIBRARY_GET_ALL_URL);
    }

    getLibraryBooks(libraryID: number) : Observable<any>  {
      return this.http.get<any>(this.LIBRARY_GET_BOOKS_URL + libraryID);
    }

    addLibrary(name:string, xcoordinate:number, ycoordinate:number):Observable<any> {
        let libraryToAdd = {name:name, x_coordinate:xcoordinate, y_coordinate:ycoordinate};
        return this.http.post<Library>(this.LIBRARY_ADD_URL,libraryToAdd);
      }
  
}
