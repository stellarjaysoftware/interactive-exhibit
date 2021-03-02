import {Injectable} from '@angular/core';
import {Comment} from '../models/comment';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {User} from '../models/user';
import {ApiPaths, ExhibitApiService} from './exhibit-api.service';
import {LoggerService} from './logger.service';

type LoginResponse = {
  user: User,
  token: string
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private api: ExhibitApiService, private logger: LoggerService) {
  }

  login(email?: string, password?: string): Observable<LoginResponse> {
    if (email && password) {
      return this.http.post<LoginResponse>(
        this.api.getUsersPath() + '/login',
        {email, password},
        this.api.getOptions())
        .pipe(
          tap((login: LoginResponse) => {
            this.log(`logged in user token=${login.token}`);
            this.api.authToken = login.token;
          }),
          catchError(error => {
            this.logger.log(error, true);
            if (error?.status && error.status === 400) {
              throw new Error('Login failed. Please try again');
            } else {
              throw error;
            }
          })
        );
    } else {
      return new Observable<LoginResponse>();
    }
  }

  logout(all: boolean = false): Observable<{}> {
    return this.http.post(
      this.api.getUsersPath() + (all ? '/logoutAll' : '/logout'),
      null,
      this.api.getOptions())
      .pipe(
        tap(() => {
          this.log('logged out user');
          this.api.authToken = undefined;
        }),
        catchError(error => {
          this.logger.log(error, true);
          throw new Error('Logout failed');
        })
      );
  }

  create = (email?: string, password?: string, name?: string): Observable<LoginResponse> => {
    if (!email || !password) {
      throw new Error('email and password required');
    }
    const body: { [k: string]: any } = {
      email,
      password,
      name
    };
    return this.http.post<LoginResponse>(
      this.api.getUsersPath(),
      body,
      this.api.getOptions())
      .pipe(
        tap((login: LoginResponse) => {
          this.log(`created and logged in user token=${login.token}`);
          this.api.authToken = login.token;
        }),
        catchError(error => {
          this.logger.log(error, true);
          if (error?.error?.Error === 'Email already in use.') {
            throw new Error(error?.error?.Error);
          } else if (error?.status && error.status === 400) {
            throw new Error('Create failed. Please try again');
          } else {
            throw error;
          }
        })
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // TODO: refactor to be sharable across services
  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a CommentService message with the MessageService */
  private log(message: string): void {
    // TODO: refactor to be sharable across services and should log to a logging service
    // console.log('~~~~ Interactive Exhibit CommentsService: ', message);
  }
}
