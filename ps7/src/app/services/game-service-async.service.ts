import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {GAME} from '../models/gameModel';


@Injectable({
  providedIn: 'root'
})
export class GameServiceAsyncService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  gamesEndpoint = 'http://localhost:3000/async_await';

  getGames(): Observable<any> {
    return this.httpClient.get<any>(this.gamesEndpoint).pipe(
      tap(data => console.log("games: ", data))
    );
    // return this.httpClient.get<CONTACT[]>(this.contactsEndpoint);

  }

  searchGame(newGame: GAME): Observable<any> {
    // We don't need the '_id' property on the back end (probly should fix it there)
    // delete newGame._id;
    return this.httpClient.post(this.gamesEndpoint, newGame, this.httpOptions);

  }

  constructor(private httpClient: HttpClient) { }

}
