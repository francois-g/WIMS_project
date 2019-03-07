import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
    Games = [
        {
            Id: 1,
            GameName: 'Fortnite',
            GameImg: 'FortniteImg',
        },
        {
            Id: 2,
            GameName: 'Lol',
            GameImg: 'LolImg',
        },
        {
            Id: 3,
            GameName: 'Apex',
            GameImg: 'ApexImg',
        },
        {
            Id: 4,
            GameName: 'Fifa',
            GameImg: 'FifaImg',
        },
    ];
    getGames() {
        return this.Games;
    }
    getById(Id: number) {
        return this.Games[Id].GameImg;
    }
}
