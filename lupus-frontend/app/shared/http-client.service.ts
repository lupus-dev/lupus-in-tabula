import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class HttpClient {
	constructor(private http: Http) { }

	private token: string;

	private getHeaders() {
		let headers = new Headers();
		headers.append('Content-type', 'application/json');
		if (this.token)
			headers.append('Authorization', 'token ' + this.token);
		return headers;
	}

	setToken(token: string) {
		this.token = token;
	}

	get(url) {
		return this.http.get(url, { headers: this.getHeaders() });
	}

	post(url, data) {
		return this.http.post(url, JSON.stringify(data), { headers: this.getHeaders() });
	}

	put(url, data) {
		return this.http.put(url, JSON.stringify(data), { headers: this.getHeaders() });
	}

	delete(url) {
		return this.http.delete(url, { headers: this.getHeaders() });
	}
}