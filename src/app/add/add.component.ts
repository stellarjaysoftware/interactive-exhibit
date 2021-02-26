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

  validate(): void {
    if (!this.comment.text) {
      this.error = 'Please review your entries and retry.';
    }
  }

  save(): void {
    if (this.comment && this.comment.text) {
      this.commentsService.add(this.comment);
    }
    this.goBack();
      // .subscribe(() => this.goBack());
  }
}
