import { Component, OnInit, Input } from '@angular/core';

import {CONTACT, GAME} from '../models/gameModel';
import {GameServiceAsyncService} from "../services/game-service-async.service";

@Component({
  selector: 'app-full-game',
  templateUrl: './full-game.component.html'
  // styleUrls: ['./full-game.component.css']

})
export class FullGameComponent implements OnInit {
  @Input() searchedGames: GAME[] | undefined;
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
  }

}
