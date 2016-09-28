import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as io from 'socket.io-client';

import { SessionService } from '../shared/session.service';

@Injectable()
export class SocketService {

	constructor(private sessionService: SessionService) { }

	sockets = {};

	connect(service: string): Observable<any> {
		if (this.sockets[service]) return this.sockets[service];

		return this.sockets[service] = new Observable(observer => {
			var socket = io.connect('', { path: '/api/' + service + '/socket.io' });

			socket.on('connect', () => {
				console.log('Connected to ' + service + ' socket');
				socket.emit('authentication', { token: this.sessionService.session.token });
			});

			socket.on('disconnect', (err) => {
				console.log('Disconnected from ' + service + ' socket:', err)
				observer.error(err);
			});

			socket.on('authenticated', () => {
				console.log('Authenticated on ' + service + ' socket');
				observer.next(socket);
			});

			socket.on('unauthorized', (error) => {
				console.error('Authentication failed on ' + service + ' socket', error);
				observer.onError(error);
			});

			return function() {
				console.log('Socket ' + service + ' will be disposed');
				socket.disconnect();
			}
		});
	}
}
