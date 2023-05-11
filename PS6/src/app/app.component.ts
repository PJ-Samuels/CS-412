import { Component } from '@angular/core';
import data from '/Users/pjsamuels/Desktop/CS412/PS6/src/assets/data.json'
// import data2 from './assets/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  games = data;
  title = 'PS6';
  showgames = false;
  buttonClick() {
    this.showgames = !this.showgames;
  }

}
