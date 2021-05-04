import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { DialogService } from 'src/app/services/dialog-service.service';

@Component({
  selector: 'page-app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class PageBookAddComponent implements OnInit {

  genres: any[] = [
    { label: "Select genre..."},
    { label: "Crime" },
    { label: "Horror" },
    { label: "Poetry" },
    { label: "Novel" },
    { label: "Thriller" }
  ]
  genre: any = { label: "hello"}
  title: string;
  test: any;
  author: string;

  constructor(
    private dialogService: DialogService,
    private bookService: BookService  
    ) { 
      // this.genre = { label: "Select genre..."},
      this.title = "";
      this.author = "";
    }

  ngOnInit(): void {
  }

  async addBookButtonHandler(form: any){
    console.log(form);
    let book = {title: form.value.title, author: form.value.author , genre: form.value.genre, library_id: "2"};
    let addBookRequest = this.bookService.addBook(book).toPromise();
    await addBookRequest.then((response) => {
        console.log(response)
        this.title = "";
        this.author = "";
        this.genre = this.genres[0];
        this.dialogService.displayDialog({display: true, message: "Print the QR-Code and stick it onto the book.", isSuccess: true});
      }).catch((error) => {
        this.dialogService.displayDialog({display: true, message: "Something went wron. Please try again", isSuccess: false});
      });
  }
}
