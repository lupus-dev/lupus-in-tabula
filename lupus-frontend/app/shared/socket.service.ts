import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

import { SessionService } from '../shared/session.service';

@Injectable()
export class SocketService {

	constructor(private sessionService: SessionService) { }

	sockets = {};

	connect(service: string): Promise<any> {
		var promise = new Promise((resolve, reject) => {
			var socket = io.connect('', { path: '/api/' + service + '/socket.io' });
			socket.emit('authentication', { token: this.sessionService.session.token });

			socket.on('connect', () => console.log('Connected to ' + service + ' socket'));
			socket.on('disconnect', (err) => console.log('Disconnected from ' + service + ' socket:', err));

			socket.on('authenticated', () => {
				this.sockets[service] = socket;
				console.log('Authenticated on ' + service + ' socket');
				resolve(socket);
			});

			socket.on('unauthorized', (error) => {
				console.error('Authentication failed on ' + service + ' socket', error);
				reject(error);
			});
		});

		return promise;
	}

	disconnect(service: string) {
		if (!this.sockets[service]) return;
		this.sockets[service].disconnect();
		this.sockets[service] = null;
	}
}
