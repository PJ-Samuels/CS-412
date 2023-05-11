import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {GAME} from '../models/gameModel';
import { GameServiceAsyncService} from '../services/game-service-async.service';

@Component({
  selector: 'app-search-game',
  templateUrl: './search-game.component.html',
  styleUrls: ['./search-game.component.css']

})
export class SearchGameComponent implements OnInit {
  searchForm!: FormGroup;
  searchedGames: GAME[]| undefined;
  @Output() searchedGamesChanged = new EventEmitter<GAME[]>();
  my: any = {
    home: '',
    away: ''
}


searchAllGame( ): void {

  if (this.searchForm.valid) {
      const newGame: GAME = {
        home: {
          id: '',
          name: this.searchForm.value.home,
          logo: '',
        },
        away: {
          id: '',
          name: this.searchForm.value.away,
          logo: '',
        }
      };

      this.gameService.searchGame(newGame).subscribe(
        (data: any) => {
          console.log("data", data);
          this.searchedGames = data
          this.searchedGamesChanged.emit(data);
        }
      );
    } else {
      console.log("Form is invalid.");
    }
  }

  constructor(private gameService: GameServiceAsyncService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      home: ['', Validators.required],
      away: ['', Validators.required],
    });
  }

  ngOnInit() {
    //   this.searchForm = this.formBuilder.group({
    //     home: ['', Validators.required],
    //     away: ['', Validators.required],
    //   });
    // }

  }
}
