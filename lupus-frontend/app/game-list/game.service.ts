import { Injectable } from '@angular/core';

import { HttpClient } from '../shared/http-client.service';

@Injectable()
export class GameService {

	constructor(private http: HttpClient) { }

	getAllGames() {
		return this.http.get('/api/history/games');
	}
}