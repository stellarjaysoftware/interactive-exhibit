import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  comments: Comment[] = [];
  // TODO: make this environment sensitive
  private commentsUrl = 'http://localhost:3000/comments';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  add(comment: Comment): void {
    this.comments.push(comment);
  }

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentsUrl)
      .pipe(
        tap(_ => this.log('fetched comments')),
        catchError(this.handleError<Comment[]>('getHeroes', []))
      );
  }

  /** POST: add a new hero to the server */
  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.commentsUrl, comment, this.httpOptions).pipe(
      tap((newComment: Comment) => this.log(`added comment w/ id=${newComment.id}`)),
      catchError(this.handleError<Comment>('addComment'))
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
