import { Injectable } from '@angular/core';

import { HttpClient } from '../shared/http-client.service';
import { UserService } from '../user/user.service';

import { Game } from './game.model';
import { User } from '../user/user.model';

@Injectable()
export class GameService {

	constructor(private http: HttpClient,
				private userService: UserService) { }

	getAllGames() {
		return this.http.get('/api/history/games');
	}

	getGames(game_ids: string[]) {
		return this.http.get('/api/history/games/' + game_ids.join(','));
	}

	fillUsers(games: Game[]): Promise<Game[]> {
		return new Promise<Game[]>((resolve, reject) => {
			let user_ids = {};

			for (let game of games) {
				user_ids[game.owner_id] = 1;
				for (let member of game.members)
					if (typeof member === 'string')
						user_ids[member as string] = 1;
			}
			this.userService.getUsers(Object.keys(user_ids))
				.then(users => resolve(this.bindUsers(games, users)))
				.catch(error => reject(error));
		});
	}

	private bindUsers(games: Game[], users: Object): Game[] {
		let _games = [];

		for (let _game of games) {
			let game: Game = _game;
			game.owner = users[game.owner_id];
			for (let i in game.members) {
				let member = game.members[i];
				if (typeof member === 'string')
					game.members[i] = users[member] as User;
			}
			_games.push(game);
		}

		return _games;
	}
}