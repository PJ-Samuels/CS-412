import { Component } from '@angular/core';
// import {CONTACTS} from './mock/CONTACTS-MOCK'
import {GAME} from './models/gameModel';
import {CONTACT} from './models/gameModel';
import {GameServiceAsyncService} from './services/game-service-async.service';
// import {ContactService} from "./services/contact.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Basketball game Search';
  // selectedContact: String | undefined;
  selectedGame: GAME | undefined;
  contacts: CONTACT[] |undefined;
  games:GAME[]|undefined;
  getGames(): void {
    // console.log("contacts pre push",this.contacts)
    this.gameService.getGames().subscribe(data => {
      // @ts-ignore
      this.games = JSON.parse(data)
      // console.log("post push contacts",this.games)
    });

  }
  displayGameDetail(game: GAME) {
    this.selectedGame = game;
  }

  constructor(private gameService: GameServiceAsyncService) {
  }
  ngOnInit() {
    this.getGames();
  }
}
