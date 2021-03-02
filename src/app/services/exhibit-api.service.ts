import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';

export enum ApiPaths {
  users = '/users',
  comments = '/comments'
}

@Injectable({
  providedIn: 'root'
})
export class ExhibitApiService {
  authChanged = new Subject<boolean>();
  // tslint:disable-next-line:variable-name
  private _authToken?: string;

  constructor() {
  }

  get authToken(): string | undefined {
    return this._authToken;
  }

  set authToken(authToken: string | undefined) {
    this._authToken = authToken;
    this.authChanged.next(!!authToken);
  }

  private getBaseUrl(): string {
    // TODO: environment switcher
    return 'http://localhost:3000';
  }



  getCommentsPath(): string {
    return this.getBaseUrl() + ApiPaths.comments;
  }

  getUsersPath(): string {
    return this.getBaseUrl() + ApiPaths.users;
  }

  getOptions(): { headers: HttpHeaders } {
    return {
      headers: this.getHeaders()
    };
  }

  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (this.authToken) {
      headers = headers.append('Authorization', `Bearer ${this.authToken}`);
    }
    return headers;
  }
}
