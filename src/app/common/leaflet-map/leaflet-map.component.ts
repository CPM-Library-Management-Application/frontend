import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { latLng } from 'leaflet';
import { EMPTY, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BookService } from 'src/app/services/book.service';
import {LeafletMap} from './leaflet-map';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  map!: LeafletMap | any;
  private subscription: Subscription | undefined;

  selectedBook$ = this.bookService.bookSelectedFullDataAction$
  .pipe(
    catchError(err => {
      return EMPTY;
    })
  )

  constructor(private bookService: BookService) {
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.map = new LeafletMap('map');
    this.subscription = this.selectedBook$.subscribe(
      (book) => { 
        console.log(book);
        // L.marker(latLng(book.library_id.x_coordinate, book.library_id.y_coordinate)).addTo(this.map);
        // this.map.update(book.library_id.x_coordinate, book.library_id.y_coordinate, book.author);
        this.map.updatePopup(book.library_id.x_coordinate, book.library_id.y_coordinate, book.library_id.name + "<br></br>" + book.library_id.x_coordinate + " ," + book.library_id.y_coordinate);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.map){
      return;
    }

  }

}
