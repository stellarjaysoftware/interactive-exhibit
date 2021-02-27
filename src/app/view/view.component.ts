import { Component, OnInit, OnDestroy } from '@angular/core';
import {Comment} from '../models/comment';
import {CommentsService} from '../services/comments.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  commentInterval: number | undefined = undefined;
  numComments = 3;
  cycleDelay = 5; // seconds
  comments: Comment[] = [];
  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.getComments();
  }

  ngOnDestroy(): void {
    window.clearInterval(this.commentInterval);
  }

  async getComments(): Promise<void> {
    // load all the comments
    await this.commentsService.getComments();
    // change to comments to display
    this.animateComments();
    this.commentInterval = window.setInterval(this.animateComments, this.cycleDelay * 1000);
    // this.commentsService.getCommentsToDisplay(this.numComments, this.cycleDelay)
    //   .subscribe(comments => this.comments = comments);
  }

  animateComments = (): void => {
    const comments = this.commentsService.getCommentsToDisplay(this.numComments);
    console.log(comments);
    this.comments = comments;
  }
}
