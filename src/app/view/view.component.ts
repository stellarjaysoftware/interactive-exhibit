import {Component, OnInit, OnDestroy} from '@angular/core';
import {Comment} from '../models/comment';
import {CommentsService} from '../services/comments.service';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  animationSubscription?: Subscription;
  numComments = 3;
  cycleDelay = 3; // seconds
  comments: Comment[] = [];
  error?: string;

  constructor(private commentsService: CommentsService) {
  }

  ngOnInit(): void {
    this.getCommentsAndAnimate();
  }

  ngOnDestroy(): void {
    this.animationSubscription?.unsubscribe();
  }

  getCommentsAndAnimate(isRetry: boolean = false): void {
    // load all the comments
    this.error = '';
    window.setTimeout(() => {
      this.commentsService.fetchComments().subscribe({
        complete: () => this.startCommentAnimation(),
        error: error => {
          this.error = 'Sorry, comments could not be loaded.';
        }
      });
    }, isRetry ? 500 : 0);
  }

  animateComments(): void {
    this.comments = this.commentsService.getCommentsToDisplay(this.numComments);
  }

  startCommentAnimation(): void {
    // change to comments to display
    this.animateComments(); // load initial set of comments
    this.animationSubscription = interval(this.cycleDelay * 1000)
      .subscribe(_ => this.animateComments());
  }

}
