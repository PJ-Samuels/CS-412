import { Component, OnInit, Input } from '@angular/core';

import {GAME} from '../models/gameModel';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  @Input() games: GAME[] | undefined;

  constructor() { }

  ngOnInit() {

  }

}
