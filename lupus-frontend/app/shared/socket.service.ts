import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

import { SessionService } from '../shared/session.service';

@Injectable()
export class SocketService {

	constructor(private sessionService: SessionService) { }

	sockets = {};

	connect(service: string) {
		var promise = new Promise((resolve, reject) => {
			var socket = io.connect('', { path: '/api/' + service + '/socket.io' });
			socket.emit('authentication', { token: this.sessionService.session.token });

			socket.on('connect', () => console.log('Connected to ' + service + ' socket'));
			socket.on('disconnect', () => console.error('Disconnected from ' + service + ' socket'));

			socket.on('authenticated', () => {
				this.sockets[service] = socket;
				resolve(socket);
			});

			socket.on('unauthorized', (error) => {
				console.error(error);
				reject(error);
			});
		});

		return promise;
	}
}