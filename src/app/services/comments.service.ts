import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Comment} from '../models/comment';
import {ExhibitApiService} from './exhibit-api.service';
import {LoggerService} from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  comments: Comment[] = [];
  nextCommentIndex = 0;
  // TODO: make this environment sensitive
  private commentsUrl = 'http://localhost:3000/comments';  // URL to web api
  constructor(private http: HttpClient, private logger: LoggerService,
              private api: ExhibitApiService) {
  }

  add(comment: Comment): void {
    this.comments.push(comment);
  }

  getCommentsToDisplay(numComments: number): Comment[] {
    // get the first X comments
    let commentsToDisplay = this.comments.slice(this.nextCommentIndex, numComments + this.nextCommentIndex);
    const remainder = numComments - commentsToDisplay.length;
    if (remainder) { // pull from front
      commentsToDisplay = commentsToDisplay.concat(this.comments.slice(0, remainder));
    }
    if (this.nextCommentIndex === this.comments.length) {
      this.nextCommentIndex = 0;
    } else {
      this.nextCommentIndex++;
    }
    return commentsToDisplay.reverse();
  }

  fetchComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.api.getCommentsPath())
      .pipe(
        tap((comments: Comment[]) => {
          this.logger.log('fetched comments');
          this.comments = comments;
        }),
        catchError(error => {
          this.logger.log(error, true);
          throw error;
        })
      );
  }

  /** POST: add a new hero to the server */
  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.commentsUrl, comment, this.api.getOptions()).pipe(
      tap((newComment: Comment) => this.logger.log(`added comment w/ id=${newComment._id}`)),
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
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.logger.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
