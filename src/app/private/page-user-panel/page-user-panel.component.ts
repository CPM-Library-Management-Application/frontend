import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-user-panel',
  templateUrl: './page-user-panel.component.html',
  styleUrls: ['./page-user-panel.component.css']
})
export class PageUserPanelComponent implements OnInit {

  userBooks:string[] = ["Great Gastby","Oliver Twist", "Romeo and Juliet","Zero to One","Crazy is a Compliment"]

  constructor() { }

  ngOnInit(): void {
  }

}
