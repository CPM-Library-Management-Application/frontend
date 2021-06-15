import { LibraryService } from './libraries/library.service';
import { Library } from './libraries/library.model';
import { Component, OnInit, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-page-admin-panel',
  templateUrl: './page-admin-panel.component.html',
  styleUrls: ['./page-admin-panel.component.css']
})

export class PageAdminPanelComponent implements OnInit {
  libraries: any;
  libraryName: string;
  libraryXCoordinate: number;
  libraryYCoordinate: number;
  libraryID: number;
  currentLibraryIndex = -1;
  currentBookIndex = -1;
  currentLibraryID: number;
  books: any;
  

  constructor (private libraryService: LibraryService){

    this.refreshLibraries();
    this.libraryName = '';
    this.libraryXCoordinate = 0.0;
    this.libraryYCoordinate = 0.0;
    this.libraryID = 0;
    this.currentLibraryID = 0;
    this.books=[];
   
  
  }

  refreshLibraries(){
    this.libraryService.getLibraries().subscribe((libraries) => {
      this.libraries = libraries;
    });
  }

   setActiveLibrary(library: Library, index: number): void {
    this.currentLibraryID = library.library_id;
    this.currentLibraryIndex = index;
    this.libraryService.getLibraryBooks(library.library_id).subscribe((lib) => {
      this.books = lib.books;
    });
    this.currentBookIndex = -1;
  }

   setActiveBook(book: any, index: number): void {
     this.currentBookIndex = index;
   }
   

   addLibrary() : void {
      this.libraryService.addLibrary(this.libraryName, this.libraryXCoordinate, this.libraryYCoordinate).subscribe((lib)=> {
        this.refreshLibraries();
      });
   }


  ngOnInit(): void  {}
  getBook(id: string): void {}
  getLibrary(id: string): void {} 
}

   