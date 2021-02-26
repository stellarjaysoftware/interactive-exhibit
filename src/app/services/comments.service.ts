import { Injectable } from '@angular/core';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  comments: Comment[] = [];
  constructor() { }

  add(comment: Comment): void {
    this.comments.push(comment);
  }

  getComments(): Comment[] {
    return this.comments;
  }
}
