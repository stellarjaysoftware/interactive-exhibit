import { Component, OnInit, Input} from '@angular/core';
import { Location } from '@angular/common';
import { Comment } from '../models/comment';
import {CommentsService} from '../services/comments.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @Input() exhibitName?: string;
  comment: Comment = new Comment(undefined);
  error?: string;
  constructor(private commentsService: CommentsService, private location: Location) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  validate(): boolean {
    const message = 'Please review your entries and retry.';
    if (!this.comment.text) {
      this.error = message;
      return false;
    } else {
      this.comment.text = this.comment.text.trim();
      if (!this.comment.text) {
        this.error = message;
        return false;
      } else {
        return true;
      }
    }
  }

  save(): void {
    if (this.validate()) {
      this.commentsService.addComment(this.comment)
        .subscribe(() => this.goBack());
    }
  }
}
