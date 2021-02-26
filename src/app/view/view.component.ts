import { Component, OnInit } from '@angular/core';
import {Comment} from '../models/comment';
import {CommentsService} from '../services/comments.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  comments: Comment[] = [];
  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void {
    this.commentsService.getComments().subscribe(comments => this.comments = comments);
  }

}
